import { create } from 'zustand'

export const apiUrl = 'https://frame.ankcode.com/api'
// export const apiUrl = 'http://localhost:8000/api'

interface CameraDeviceState {
  device: MediaDeviceInfo | undefined
  set: (by?: MediaDeviceInfo) => void
}

export const useCameraDevice = create<CameraDeviceState>()((set) => ({
  device: undefined,
  set: (by) => set(() => ({ device: by }))
}))

interface TimerState {
  timer: number
  set: (image: number) => void
  reset: () => void
}

export const useTimerData = create<TimerState>()((set) => ({
  timer: 0,
  set: (by) => set(() => ({ timer: by })),
  reset: () => set(() => ({ timer: 0 }))
}))

interface ImageState {
  image: string
  set: (image: string) => void
  reset: () => void
}

export const useFrameData = create<ImageState>()((set) => ({
  image: '',
  set: (by) => set(() => ({ image: by })),
  reset: () => set(() => ({ image: '' }))
}))

export const useImageData = create<ImageState>()((set) => ({
  image: '',
  set: (by) => set(() => ({ image: by })),
  reset: () => set(() => ({ image: '' }))
}))

interface FrameImageState {
  image: {
    path: string
    download?: string
  }
  set: (image: { path: string; download?: string }) => void
  reset: () => void
}

export const useFrameImageData = create<FrameImageState>()((set) => ({
  image: {
    path: '',
    download: ''
  },
  set: (data) => set(() => ({ image: data })),
  reset: () =>
    set(() => ({
      image: {
        path: '',
        download: ''
      }
    }))
}))
