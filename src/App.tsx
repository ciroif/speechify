import SpeechToText from "./components/SpeechToText";
import TextToSpeech from "./components/TextToSpeech";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container text-center">
      <img
        src="/speechify-logo.png"
        alt="Speechify Logo"
        className="speechify-img"
      />
      <div className="row">
        <div className="col-md-6">
          <SpeechToText />
        </div>
        <div className="col-md-6">
          <TextToSpeech />
        </div>
      </div>
    </div>
  );
}

export default App;
