import { useEffect, useState } from "react";

let recognition: any = null;
if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechToText = () => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log("on result: ", event);
      setText(event?.results?.[0]?.[0]?.transcript);
      recognition.stop();
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechToText;
