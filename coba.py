import cv2
import mediapipe as mp
import time

# Inisialisasi mediapipe pose dan hands
mp_pose = mp.solutions.pose
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
hands = mp_hands.Hands(min_detection_confidence=0.5, min_tracking_confidence=0.5)

cap = cv2.VideoCapture(0)

countdown_start = None
countdown_time = 5  # Durasi countdown dalam detik

def is_hand_open(landmarks):
    tips = [4, 8, 12, 16, 20]  # Indeks landmark ujung jari (jempol, telunjuk, jari tengah, jari manis, kelingking)
    for tip in tips[1:]:
        if landmarks[tip].y > landmarks[tip - 2].y:  # Periksa apakah ujung jari lebih rendah dari sendi kedua
            return False
    return True

def is_full_body_visible(landmarks):
    # Landmark kunci untuk menentukan apakah badan penuh terlihat
    key_landmarks = [
        mp_pose.PoseLandmark.LEFT_SHOULDER,
        mp_pose.PoseLandmark.RIGHT_SHOULDER,
        mp_pose.PoseLandmark.LEFT_HIP,
        mp_pose.PoseLandmark.RIGHT_HIP,
    ]

    for landmark in key_landmarks:
        if landmarks[landmark.value].visibility < 0.5:
            return False
    return True

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print("Tidak dapat mengakses kamera.")
        break

    # Konversi frame ke RGB
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    
    # Deteksi tubuh
    pose_results = pose.process(image)
    
    # Konversi kembali ke BGR
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    
    body_detected = False
    hand_detected = False

    if pose_results.pose_landmarks:
        mp_drawing.draw_landmarks(image, pose_results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        if is_full_body_visible(pose_results.pose_landmarks.landmark):
            body_detected = True
        else:
            cv2.putText(image, 'Badan tidak terlihat', 
                        (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
            countdown_start = None  # Reset countdown jika badan tidak terlihat

    if body_detected:
        # Deteksi tangan
        hand_results = hands.process(image)
        if hand_results.multi_hand_landmarks:
            for hand_landmarks in hand_results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                
                if is_hand_open(hand_landmarks.landmark):
                    hand_detected = True
                    break
        
        if hand_detected:
            if countdown_start is None:
                countdown_start = time.time()
            else:
                countdown_start = time.time()  # Reset countdown jika tangan terdeteksi lagi

        if countdown_start:
            elapsed_time = time.time() - countdown_start
            remaining_time = countdown_time - int(elapsed_time)
            if remaining_time > 0:
                cv2.putText(image, f'Capturing in: {remaining_time}s', 
                            (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
            else:
                cv2.imwrite(f'captured_image_{int(time.time())}.png', frame)
                print('Image Captured')
                countdown_start = None  # Reset countdown setelah mengambil gambar

    cv2.imshow('Body and Hand Detection', image)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
