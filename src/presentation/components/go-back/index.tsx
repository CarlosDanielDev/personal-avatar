import { FiArrowLeft } from "react-icons/fi";

export function GoBack() {
  return <div className="frameTop">
    <div>
      <a href={`${import.meta.env.VITE_SPEAKER_URL}`}>
        <FiArrowLeft />
      </a>
    </div>
  </div>
}
