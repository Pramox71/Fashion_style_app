import Modal from '@renderer/components/Modal'
import { Link } from '@renderer/router'
import { apiUrl } from '@renderer/utils/global'
import axios from 'axios'
import { ArrowLeftCircleIcon, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { createQuery } from 'react-query-kit'

const usePhoto = createQuery({
  queryKey: ['posts'],
  fetcher: async () => {
    const res = await axios.get(`${apiUrl}/photo`)

    return res.data.data
  }
})

const History = () => {
  const { data, isLoading } = usePhoto()
  const [openModal, setOpenModal] = useState(false)
  const [selectedLink, setSelectedLink] = useState('')

  useEffect(() => {
    if (!openModal) {
      setSelectedLink('')
    }
  }, [openModal])

  if (isLoading && !data) {
    return (
      <div className="w-screen h-screen bg-white overflow-hidden">
        <div className="w-full h-[10%] max-h-[10%] py-8 flex items-center justify-center shadow-lg bg-sky-400 text-white">
          <p className="text-4xl font font-semibold title">History Foto</p>
        </div>
        <div className="w-full max-h-[90%] px-8 py-8 flex items-center justify-center ">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen bg-white overflow-hidden">
      <Modal
        open={openModal}
        setOpen={(value) => {
          setOpenModal(value)
        }}
        title="Preview"
      >
        <div>
          <div className="max-h-[90%] h-[90%] w-full py-8 flex flex-col items-center px-4">
            <div className="py-8 px-8 flex flex-col items-center  justify-center max-w-[80%]">
              <div className="mb-10">
                <p className="title text-wrap font-semibold text-center text-3xl">
                  Scan your photo
                </p>
              </div>
              <QRCode value={selectedLink} />
              <div className="mt-10 mb-4">
                <p className="title text-wrap font-semibold text-center text-3xl">Download now!</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="w-full h-[10%] max-h-[10%] py-8 shadow-lg bg-sky-400 text-white relative">
        <div className="flex z-30 h-full items-center absolute top-0 py-4">
          <Link className="w-1/2 px-3" to={'/'}>
            <ArrowLeftCircleIcon className="w-8 h-8" />
          </Link>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-4xl font font-semibold title">History Foto</p>
        </div>
      </div>
      <div className="w-full max-h-[90%] grid grid-cols-3 px-8 py-8 overflow-y-auto">
        {data.data.map((e, index) => {
          return (
            <div
              key={`photo-${index}`}
              onClick={() => {
                setOpenModal(true)
                setSelectedLink(e.download_link)
              }}
              className="py-8 flex items-center justify-center hover:bg-black/10 rounded-lg"
            >
              <img src={e.photo_path} alt="#" className="w-[320px] h-[180px]" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default History
