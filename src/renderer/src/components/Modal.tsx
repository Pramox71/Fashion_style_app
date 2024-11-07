import { XCircle } from 'lucide-react'
import { PropsWithChildren } from 'react'

const Modal = ({
  open,
  setOpen,
  title,
  children
}: PropsWithChildren & { open: boolean; setOpen: (value: boolean) => void; title?: string }) => {
  if (!open) {
    return <></>
  }

  return (
    <div
      onClick={() => setOpen(!open)}
      className="absolute w-screen h-screen flex items-center justify-center bg-black/40 z-[100]"
    >
      <div className="w-2/6 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center px-6 py-5 mb-4">
          <p className="text-2xl font-semibold title">{title}</p>
          <button className="text-red-500 hover:scale-110" onClick={() => setOpen(!open)}>
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-2">{children}</div>
      </div>
    </div>
  )
}

export default Modal
