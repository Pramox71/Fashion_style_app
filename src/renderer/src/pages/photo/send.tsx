import { Link, useNavigate } from '@renderer/router'
import { useFrameImageData } from '@renderer/utils/global'
import { ArrowLeftCircleIcon } from 'lucide-react'
import QRCode from 'react-qr-code'
import Logo from '@renderer/assets/LOGO KARINDO.png'
import Logo2 from '@renderer/assets/MJS LOGO .png'
import Logo3 from '@renderer/assets/LOGO IVENDO.png'

const Send = () => {
  const imageData = useFrameImageData((state) => state)
  const navigate = useNavigate()
  return (
    <div className="max-w-screen max-h-screen">
      <div className="flex h-screen">
        <div className="w-4/6 flex items-center justify-center relative">
          <img src={imageData.image.path} className="w-[720px] h-[405px]" alt="" />
        </div>
        <div className="w-2/6 border flex flex-col relative">
          <div className="max-h-[90%] h-[90%] w-full py-8 flex flex-col items-center px-4">
            <div className="py-8 px-8 shadow-lg rounded-lg flex flex-col items-center  justify-center max-w-[80%]">
              <div className="mb-10">
                <p className="title text-wrap font-semibold text-center text-3xl">
                  Scan your photo
                </p>
              </div>
              <QRCode value={imageData.image.download as string} />
              <div className="mt-10 mb-6">
                <p className="title text-wrap font-semibold text-center text-3xl">Download now!</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <img src={Logo} alt="" className="" />
                <img src={Logo2} alt="" className="" />
                <img src={Logo3} alt="" className="" />
              </div>
            </div>
          </div>
          <div className="w-full h-[10%]">
            <button
              onClick={() => {
                navigate('/')
                imageData.reset()
              }}
              className="title w-full h-full bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
      <div className="flex z-30 items-center absolute top-0 py-4 w-4/6">
        <Link
          className="w-1/2 px-3"
          to={'/photo'}
          onClick={() => {
            imageData.reset()
          }}
        >
          <ArrowLeftCircleIcon className="w-8 h-8" />
        </Link>
      </div>
    </div>
  )
}

export default Send
