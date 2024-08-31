const parseTextToSentences = (text: string): string[] => {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => sentence.trim().length > 0);
};

export default parseTextToSentences;
