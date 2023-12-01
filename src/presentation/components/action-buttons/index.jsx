import { FiMicOff, FiMic, FiSend, FiVolumeX } from "react-icons/fi";
import './styles.css'

import {
  useAudio,
  useWebSocket
} from 'tryvoice'

import { useTranslation } from "react-i18next";


export const ActionButtons = ({ interaction, interactionSend, callbackExtraSend, callbackExtraStart, callbackExtraStop }) => {

  const { t } = useTranslation();
  const {

    EMITtextSpeech,

  } = useWebSocket()
  const {
    stopRecording,
    mediaRecorder,
    actionStop,
    actionStart,
    actionPause
  } = useAudio()


  const START = async () => {
    await actionStart();
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

  const SEND_TEXT_SPEECH = async () => {
    await EMITtextSpeech({
      voice: 'pt-BR-Standard-B',
      text: null

    })
  }



  return <ul className="wrpp">

    {interaction && <>

      <li className="icon" onClick={STOP}>
        <span className="tooltip">{t('actionButtons.stop')}</span>
        <span>
          <FiMicOff />
        </span>
      </li>

      {interactionSend ? <li className="icon" onClick={SEND}>
        <span className="tooltip">{t('actionButtons.send')}</span>
        <span>
          <FiSend />
        </span>
      </li> : <li className="icon" onClick={PAUSE}>
        <span className="tooltip">{t('actionButtons.pause')}</span>
        <span>
          <FiVolumeX />
        </span>
      </li>}

    </>}


    {!interaction && <li className="icon" onClick={START}>
      <span className="tooltip">{t('actionButtons.start')}</span>
      <span>
        <FiMic />
      </span>
    </li>}



  </ul>

}

export default ActionButtons;
