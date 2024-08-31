import useSpeechRecognition from "../hooks/useSpeechToText";

const TextToSpeech = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Speech To Text Demo</h1>
      {hasRecognitionSupport ? (
        <>
          <div className="btn-container">
            <button
              onClick={startListening}
              disabled={isListening}
              className="btn"
            >
              Start Listening
            </button>
            <button
              onClick={stopListening}
              className="btn"
              disabled={!isListening}
            >
              Stop Listening
            </button>
          </div>
          {isListening ? <div>Your browser is currently listening</div> : null}
          <div>{text}</div>
        </>
      ) : (
        <div>Your browser has no speech support recognition</div>
      )}
    </div>
  );
};

export default TextToSpeech;
