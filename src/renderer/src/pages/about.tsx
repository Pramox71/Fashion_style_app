import { Link } from '@renderer/router'
import Logo from '../assets/MJS LOGO .png'
import { ArrowLeftCircleIcon } from 'lucide-react'

const About = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="h-screen w-3/5 flex flex-col items-center justify-center">
        <p className="mb-6 text-3xl font-bold">MJ Solution Indonesia</p>
        <img src={Logo} alt="" className="h-24 mb-6" />
        <p className="text-center">
          Kami adalah Distributor Perangkat Elektronik Perkantoran dan Perusahaan Konsultasi
          Transformasi Digital dan Pengembangan Perangkat Lunak yang menyediakan solusi teknik
          Terbaik untuk semua masalah anda selama perjalanan evolusi digital. Kami telah menjadi
          produsen dan mitra rekayasa perangkat lunak yang andal dan visioner untuk merek kelas
          Multinasional sejak tahun 2015.
        </p>
      </div>
      <Link to={'/'} className="absolute bottom-2 left-2">
        <ArrowLeftCircleIcon className="w-8 h-8" />
      </Link>
    </div>
  )
}

export default About
