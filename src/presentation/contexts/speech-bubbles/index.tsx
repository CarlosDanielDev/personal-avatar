import {
  createContext,
  useContext,
  useState,
  useRef,
} from 'react'

interface Bubble {
  from: string;
  msg: string;
}

interface SpeechBubblesContextProps {
  bubbles: Bubble[];
  addBubble: (bubble: Bubble) => void;
  clearBubbles: () => void;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  bubbleRecognitionTranscript: Bubble;
  setBubbleRecognitionTranscript: React.Dispatch<React.SetStateAction<Bubble>>;
}

export const SpeechBubblesContext = createContext<SpeechBubblesContextProps | null>(null);

interface SpeechBubblesProviderProps {
  children: React.ReactNode;
}

export const SpeechBubblesProvider: React.FC<SpeechBubblesProviderProps> = ({ children }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const [bubbleRecognitionTranscript, setBubbleRecognitionTranscript] = useState<Bubble>({
    from: '',
    msg: ''
  });

  const contentRef = useRef<HTMLDivElement | null>(null);

  const addBubble = (bubble: Bubble) => {
    setBubbles((current) => [...current, bubble]);
  };

  const clearBubbles = () => setBubbles([]);

  return (
    <SpeechBubblesContext.Provider
      value={{
        bubbles,
        addBubble,
        clearBubbles,
        contentRef,
        bubbleRecognitionTranscript,
        setBubbleRecognitionTranscript,
      }}
    >
      {children}
    </SpeechBubblesContext.Provider>
  );
};

export const useSpeechBubbles = () => {
  const context = useContext(SpeechBubblesContext);
  if (!context) {
    throw new Error('useSpeechBubbles must be used within a SpeechBubblesProvider');
  }
  return context;
};
