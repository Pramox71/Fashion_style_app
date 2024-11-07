import ConfirmCustom from '@renderer/components/ConfirmCustom'
import { Link } from '@renderer/router'
import { useCameraDevice, useTimerData } from '@renderer/utils/global'
import { ArrowLeftCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import toast from 'react-hot-toast'

const toastSetting = () => {
  return toast.success('Berhasil mengubah kamera', {
    duration: 4000,
    position: 'top-center',

    // Styling
    style: {},
    className: 'bg-green-500 text-white',

    // Custom Icon
    icon: '👏'
  })
}

const SettingCamera = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const device = useCameraDevice((state) => state)
  const timer = useTimerData((state) => state)
  const [chooseDevice, setChooseDevice] = useState<string | undefined>(device.device?.deviceId)
  const [chooseTimer, setChooseTimer] = useState<number>(timer.timer)

  const options = {
    customUI: ({ onClose }) => {
      return (
        <ConfirmCustom
          onConfirm={() => {
            device.set(devices.find((f) => f.deviceId == chooseDevice))
            timer.set(chooseTimer)
            onClose()
            toastSetting()
          }}
          title="Apakah anda yakin?"
          message="Anda akan mengubah pengaturan kamera"
          onClose={() => {
            // @ts-ignore this from custom ui
            onClose()
          }}
        />
      )
    }
  }

  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput'))
    },
    [setDevices]
  )

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices)
  }, [handleDevices])

  return (
    <div className="h-full bg-white py-8 px-4">
      <Link to={'/photo'} className="flex gap-4 items-center mb-4">
        <ArrowLeftCircle className="w-8 h-8" />
        <p className="text-lg font-semibold">Kembali</p>
      </Link>
      <div className="flex flex-col gap-2">
        <div className="mb-4 w-1/4">
          <p className="mb-2">Pilih Camera</p>
          <select
            name="camera"
            id="camera"
            onChange={(e) => {
              setChooseDevice(e.currentTarget.value)
            }}
            value={chooseDevice}
            className="border rounded-sm py-1.5 px-2 w-full"
          >
            <option value={undefined}>Pilih Camera</option>
            {devices.map((media) => {
              return (
                <option key={media.deviceId} value={media.deviceId}>
                  {media.label}
                </option>
              )
            })}
          </select>
        </div>
        <div className="mb-4 w-1/4">
          <p className="mb-2">Pilih Timer</p>
          <select
            name="timer"
            id="timer"
            className="border rounded-sm py-1.5 px-2 w-full"
            onChange={(e) => {
              setChooseTimer(e.currentTarget.value as unknown as number)
            }}
            value={chooseTimer}
          >
            <option value={0}>Tidak ada timer</option>
            <option value={3}>3 detik</option>
            <option value={5}>5 detik</option>
            <option value={7}>7 detik</option>
          </select>
        </div>
        <button
          onClick={() => {
            confirmAlert(options)
          }}
          className="px-4 py-1.5 bg-blue-500 rounded-md text-white w-32"
        >
          Simpan
        </button>
      </div>
    </div>
  )
}

export default SettingCamera
