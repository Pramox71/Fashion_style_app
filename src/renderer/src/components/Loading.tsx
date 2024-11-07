import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="w-screen z-50 h-screen flex items-center justify-center bg-black/15 absolute top-0">
      <Loader2 className="w-14 h-14 animate-spin" />
    </div>
  )
}

export default Loading
