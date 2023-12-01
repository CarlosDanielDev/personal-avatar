import { SpeechBubblesProvider } from 'src/presentation/contexts';
import { Router } from './router';
import {
  AudioProvider,
  WebSocketProvider,
} from "tryvoice"


export const Main: React.FC = () => {
  return (
    <SpeechBubblesProvider>
      <WebSocketProvider>
        <AudioProvider>
          <Router />
        </AudioProvider>
      </WebSocketProvider>
    </SpeechBubblesProvider>
  )
}
