import React, { useState } from "react";
import useTextToSpeech from "../hooks/useTextToSpeech";
import parseTextToSentences from "../utils/parseTextToSentences";

const TextToSpeech: React.FC = () => {
  const { isSpeaking, speak, pause, resume, stop } = useTextToSpeech();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const [sentences, setSentences] = useState<string[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [currentCommentIndex, setCurrentCommentIndex] = useState<number>(0);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1/comments"
      );

      const fetchedComments = await response.json();

      setComments(fetchedComments);
      setSentences(parseTextToSentences(fetchedComments[0].body));

      setLoading(false);
    } catch (error: unknown) {
      setError(`Error fetching content: ${error}`);
      setLoading(false);
    }
  };

  const loadNextComment = () => {
    if (isSpeaking) {
      stop();
    }

    const nextIndex = (currentCommentIndex + 1) % comments?.length;
    setCurrentCommentIndex(nextIndex);

    const parsedSentences = parseTextToSentences(comments[nextIndex].body);
    setSentences(parsedSentences);
  };

  const handleSpeak = (sentence: string) => {
    speak(sentence);
  };

  const handlePlayPause = () => {
    if (isSpeaking) {
      pause();
    } else {
      resume();
    }
  };

  const handleStop = () => {
    stop();
  };

  const sentencesLoaded = sentences?.length > 0;

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Text to Speech Demo</h1>
      <div className="btn-container">
        <button
          onClick={fetchContent}
          disabled={loading || comments?.length > 0}
          className="btn"
        >
          {loading ? "Loading Comments..." : "Load Comments"}
        </button>
        <button
          onClick={loadNextComment}
          disabled={comments?.length === 0}
          className="btn btn"
        >
          Load More Comments
        </button>
      </div>
      <div className="btn-container">
        <button
          onClick={handlePlayPause}
          disabled={!sentencesLoaded}
          className="btn"
        >
          Pause
        </button>
        <button
          onClick={handleStop}
          disabled={!sentencesLoaded}
          className="btn"
        >
          Stop
        </button>
      </div>
      {sentencesLoaded && (
        <ul style={{ marginTop: 60 }}>
          {sentences.map((sentence, index) => (
            <div key={index}>
              <p>{sentence}</p>
              <button
                onClick={() => handleSpeak(sentence)}
                className="btn"
                style={{ marginBottom: 20 }}
              >
                Speak Out Sentence
              </button>
            </div>
          ))}
        </ul>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TextToSpeech;
