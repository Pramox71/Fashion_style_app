import { CountdownRenderProps } from 'react-countdown'

const CountdownC = (props: CountdownRenderProps) => {
  if (props.api.isStarted()) {
    if (props.seconds == 0) {
      return <></>
    }
    return (
      <div className="h-screen w-screen absolute z-[100] flex items-center justify-center bg-black/40">
        <p className="text-[75px] font-semibold text-gray-300">{props.seconds}</p>
      </div>
    )
  }

  return <></>
}

export default CountdownC
