import React, { useEffect } from 'react'
import { useSpeechBubbles } from 'src/presentation/contexts'
import './styles.css'

export const SpeechBubbles: React.FC = () => {
  const {
    bubbles,
    contentRef,
    bubbleRecognitionTranscript
  } = useSpeechBubbles()

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [bubbles, bubbleRecognitionTranscript, contentRef])

  return (
    <div className="imessage" ref={contentRef}>
      {bubbles.map((item: any, i: number) => (
        <p key={i} id='dialog' className={`box from-${item.from}`}>
          {item.msg}
        </p>
      ))}
      {bubbleRecognitionTranscript?.msg && (
        <p className='box from-bubbleRecognitionTranscript'>
          {bubbleRecognitionTranscript.msg}
        </p>
      )}
    </div>
  )
}

