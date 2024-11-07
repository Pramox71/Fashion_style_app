import { Link } from '@renderer/router'
import { Palette, XCircle } from 'lucide-react'
import hklogo from '@renderer/assets/hklogo.png'

const ipcRender = window.electron.ipcRenderer

const Dashboard = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <img src={hklogo} alt="" className="h-36 mb-8" />
      <div className="w-full flex items-center justify-center gap-x-4">
        <Link
          to={'/combinedview'}
          className="p-8 border shadow-md bg-white justify-center rounded-md w-40 text-center flex flex-col items-center hover:scale-110 transition-all"
        >
          <Palette className="w-14 h-14 mb-4" />
          <p className="font-semibold text-lg">Pilih Model</p>
        </Link>
        {/* <Link
          to={'/history'}
          className="p-8 border shadow-md  bg-white rounded-md w-40 text-center flex flex-col items-center hover:scale-110 transition-all"
        >
          <History className="w-14 h-14 mb-4" />
          <p className="font-semibold text-lg">History</p>
        </Link>
      </div>
      <div className="mt-4">
        <Link
          to={'/about'}
          className="p-8 border shadow-md  bg-white rounded-md w-40 text-center flex flex-col items-center hover:scale-110 transition-all"
        >
          <InfoIcon className="w-14 h-14 mb-4" />
          <p className="font-semibold text-lg">Tentang</p>
        </Link> */}
      </div>
      <div className="absolute right-2 top-2">
        <button
          onClick={async () => {
            await ipcRender.invoke('exit')
          }}
          className="hover:scale-110 text-red-500"
        >
          <XCircle className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}

export default Dashboard
