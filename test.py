import cv2
import mediapipe as mp
import time
import os
from subprocess import run

# Initialize Mediapipe
mp_hands = mp.solutions.hands
mp_pose = mp.solutions.pose
hands = mp_hands.Hands()
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

# Function to check if five fingers are open
def is_five_fingers_open(hand_landmarks):
    fingers = [False] * 5
    if hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y < hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_IP].y:
        fingers[0] = True
    for i in range(1, 5):
        if hand_landmarks.landmark[mp_hands.HandLandmark(i * 4)].y < hand_landmarks.landmark[mp_hands.HandLandmark(i * 4 - 2)].y:
            fingers[i] = True
    return all(fingers)

# Function to check if the body is visible up to the waist
def is_body_visible(pose_landmarks):
    if not pose_landmarks:
        return False
    required_landmarks = [
        mp_pose.PoseLandmark.NOSE, mp_pose.PoseLandmark.LEFT_SHOULDER,
        mp_pose.PoseLandmark.RIGHT_SHOULDER, mp_pose.PoseLandmark.LEFT_HIP, mp_pose.PoseLandmark.RIGHT_HIP
    ]
    for landmark in required_landmarks:
        if not pose_landmarks.landmark[landmark].visibility > 0.5:
            return False
    return True

cap = cv2.VideoCapture(0)
countdown_started = False
countdown_time = 5
start_time = 0
hand_detected = False

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to RGB
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    # Hand detection
    hand_results = hands.process(image)
    # Pose detection
    pose_results = pose.process(image)

    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # Draw pose and hand landmarks
    if hand_results.multi_hand_landmarks:
        for hand_landmarks in hand_results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            if is_five_fingers_open(hand_landmarks):
                hand_detected = True
                countdown_started = True
                start_time = time.time()  # Reset start time every time a hand is detected

    if pose_results.pose_landmarks:
        mp_drawing.draw_landmarks(image, pose_results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
        if hand_detected:
            if is_body_visible(pose_results.pose_landmarks):
                if countdown_started:
                    elapsed_time = time.time() - start_time
                    remaining_time = countdown_time - int(elapsed_time)
                    if remaining_time > 0:
                        cv2.putText(image, f'Capturing in {remaining_time}s', (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
                    else:
                        print('Image capture')
                        captured_image_path = 'captured_image.jpg'
                        cv2.imwrite(captured_image_path, frame)
                        countdown_started = False
                        hand_detected = False  # Reset after capture

                        # Run OOTDiffusion model
                        model_path = r"E:\Data_C\Documents\KULIAH\Codingan\Kerja\Gesture_capture\captured_image.jpg"
                        cloth_path = r"E:\Data_C\Documents\KULIAH\Codingan\Kerja\Gesture_capture\Uji_ganti.jpg"
                        run(["python", "OOTDiffusion/run/run_ootd.py", "--model_path", model_path, "--cloth_path", cloth_path, "--scale", "2.0", "--sample", "4"])

            else:
                cv2.putText(image, 'Body not detected', (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, cv2.LINE_AA)
                countdown_started = False
                hand_detected = False  # Reset if body is not visible

    cv2.imshow('Frame', image)

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
