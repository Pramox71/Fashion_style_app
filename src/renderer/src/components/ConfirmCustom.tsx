import { HelpCircle } from 'lucide-react'

const ConfirmCustom = ({
  title,
  message,
  onClose,
  icon = <HelpCircle className="w-12 h-12 text-yellow-500" />,
  onConfirm
}: {
  title: string
  message: string
  icon?: JSX.Element
  onClose: () => void
  onConfirm: () => void
}) => {
  return (
    <div className="w-screen z-50 h-screen flex items-center justify-center bg-black/15 absolute top-0 overflow-hidden">
      <div className="w-[30%] rounded-md shadow-lg px-8 py-8  bg-white">
        <div className="flex mb-8">
          <div className="w-1/5 flex items-center">{icon}</div>
          <div>
            <p className="font-bold text-lg mb-3">{title}</p>
            <p className="">{message}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onConfirm}
            className="px-8 py-1.5 bg-sky-500 hover:bg-sky-500/40 text-white rounded-md"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-8 py-1.5 bg-red-500 hover:bg-red-500/40 text-white rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCustom
