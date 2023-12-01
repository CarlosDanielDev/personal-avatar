
import { GoBack, VideoRecognizer } from "src/presentation/components";
import { useAudio } from 'tryvoice'


export const MakeInitSetup: React.FC = () => {
  const {
    audioLoader,
    micAudio,
    audioReceive,
  } = useAudio()

  return (
    <>
      <VideoRecognizer />
      <audio ref={micAudio} controls id="micAudio"></audio>
      <audio ref={audioReceive} id="audioReceive" controls></audio>
      <audio ref={audioLoader} id="audioLoader" controls></audio>
      <div className="wrapper" >
        <canvas id="c"></canvas>
      </div>
      <GoBack />
    </>
  );
}
