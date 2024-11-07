import Camera from '@renderer/components/Camera'
import { Link, useNavigate } from '@renderer/router'
import { useCameraDevice, useImageData, useTimerData } from '@renderer/utils/global'
import { ArrowLeftCircleIcon, Settings } from 'lucide-react'
import { useEffect, useRef } from 'react'

const Photo = () => {
  const deviceId = useCameraDevice((state) => state.device)
  const imageData = useImageData((state) => state)
  const timer = useTimerData((state) => state.timer)

  const navigate = useNavigate()
  const windowSize = useRef([window.innerWidth, window.innerHeight])

  useEffect(() => {
    if (imageData.image !== '') {
      navigate('/photo')
    }
  }, [imageData.image])

  return (
    <div className="w-screen h-screen flex justify-center bg-black relative overflow-hidden">
      <div className="h-full w-full bg-white">
        <Camera deviceId={deviceId} setImage={imageData.set} timer={timer} />
      </div>
      <div className="flex z-30 items-center justify-between absolute bottom-0 w-full px-4 h-[15%] bg-black/30">
        <Link to={'/combinedview'} className="px-4 py-2 ">
          <ArrowLeftCircleIcon className="w-14 h-14 text-white hover:text-white/80" />
        </Link>
        <Link to={'/photo/setting'} className="px-6 py-1.5 ">
          <Settings className="w-14 h-14 text-white hover:text-white/80" />
        </Link>
      </div>  
    </div>
  )
}

export default Photo
