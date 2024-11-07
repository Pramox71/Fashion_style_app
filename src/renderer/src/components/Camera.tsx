import Webcam from 'react-webcam'
import { useCallback, useRef } from 'react'
import { useNavigate } from '@renderer/router'
import CountdownC from '@renderer/components/CountdownC'
import Countdown from 'react-countdown'

interface LocationState {
  photo: string;
}

const videoConstraints: MediaTrackConstraints = {
  aspectRatio: 3 / 4,
  facingMode: 'environment'
}

const Camera = ({
  deviceId,
  setImage,
  timer
}: {
  deviceId?: MediaDeviceInfo
  setImage: (image: string) => void
  timer: number
}) => {
  const navigate = useNavigate();
  const webcamRef = useRef(null)
  const countDownRef = useRef<Countdown>(null)

  const startCountdown = useCallback(() => {
    if (countDownRef.current) {
      const countdown = countDownRef.current
      countdown.getApi().start()
    }
  }, [countDownRef])

  const capture = useCallback(() => {
    if (webcamRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      console.log(webcamRef.current)
      // @ts-ignore getScreenshoot
      const imageSrc = webcamRef.current.getScreenshot()
      setImage(imageSrc)
      navigate('/photo/confirmphoto', {
        state: { photo: imageSrc } as LocationState
      });
    }
  }, [webcamRef, navigate, setImage])

  return (
    <div className="w-full h-[100%] relative bg-black flex flex-col items-center justify-center">
      <Webcam
        audio={false}
        height={'100%'}
        ref={webcamRef}
        screenshotFormat="image/webp"
        width={'100%'}
        mirrored={true}
        videoConstraints={{
          ...videoConstraints,
          deviceId: deviceId ? deviceId.deviceId : undefined
        }}
      />
      <Countdown
        ref={countDownRef}
        date={Date.now() + timer * 1000}
        renderer={CountdownC}
        autoStart={false}
        onComplete={async () => {
          capture()
        }}
      />
      <div className="absolute flex justify-center items-center z-50 bottom-0 h-[120px]">
        <button
          onClick={() => {
            if (timer == 0) {
              capture()
            } else {
              startCountdown()
            }
          }}
          className="border-8 text-white font-semibold border-gray-300 rounded-full p-4 hover:scale-110 transition-all h-[86px] w-[86px] hover:border-white"
        >
          {timer == 0 ? '' : timer}
        </button>
      </div>
    </div>
  )
}

export default Camera