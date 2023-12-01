import { FiMicOff, FiMic, FiSend, FiVolumeX } from "react-icons/fi"
import './styles.css'

import {
  useAudio,
  // useWebSocket
} from 'tryvoice'

import { useTranslation } from 'react-i18next'

interface ActinButtonProps {
  interaction: boolean
  interactionSend: boolean
  callbackExtraSend: () => void
  callbackExtraStart: () => void
  callbackExtraStop: () => void
}

export const ActionButtons: React.FC<ActinButtonProps> = ({ interaction, interactionSend, callbackExtraSend, callbackExtraStart, callbackExtraStop }) => {

  const { t } = useTranslation();

  // TO-DO
  // const { EMITtextSpeech } = useWebSocket()

  const {
    stopRecording,
    mediaRecorder,
    actionStop,
    actionStart,
    actionPause
  } = useAudio()


  const START = async () => {
    await actionStart()
    callbackExtraStart()
    console.log(`START`)
  }

  const STOP = async () => {
    await actionStop()
    callbackExtraStop()
  }

  const PAUSE = async () => {
    await actionPause()
  }

  const SEND = async () => {
    stopRecording(mediaRecorder)
    callbackExtraSend()
  }

  // TO-DO
  // const SEND_TEXT_SPEECH = async () => {
  //   await EMITtextSpeech({
  //     voice: 'pt-BR-Standard-B',
  //     text: null

  //   })
  // }


  return (
    <ul className="wrpp">

      {interaction ? (
        <li className="icon" onClick={STOP}>
          <span className="tooltip">{t('actionButtons.stop')}</span>
          <span>
            <FiMicOff />
          </span>
        </li>
      ) : (
        <li className="icon" onClick={START}>
          <span className="tooltip">{t('actionButtons.start')}</span>
          <span>
            <FiMic />
          </span>
        </li>

      )}

      <li className="icon" onClick={interactionSend ? SEND : PAUSE}>
        <span className="tooltip">{t(`actionButtons.${interactionSend ? 'send' : 'pause'}`)}</span>
        <span>
          {interactionSend ? <FiSend /> : <FiVolumeX />}
          <FiSend />
        </span>
      </li>


    </ul>
  )

}

