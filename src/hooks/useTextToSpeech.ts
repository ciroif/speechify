import { useState } from "react";

const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  const speak = (text: string) => {
    if (!window.speechSynthesis) {
      setError("Speech synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.onstart = () => setIsSpeaking(true);
    newUtterance.onend = () => setIsSpeaking(false);
    newUtterance.onerror = (event) =>
      setError(`Speech synthesis error: ${event}`);

    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return {
    utterance,
    isSpeaking,
    error,
    speak,
    pause,
    resume,
    stop,
  };
};

export default useTextToSpeech;
