"use client";

import React, { useState, useEffect, useRef } from 'react';

const easyWords = [
  'the', 'and', 'of', 'to', 'in', 'a', 'is', 'that', 'for', 'it',
  'was', 'as', 'with', 'on', 'be', 'by', 'this', 'at', 'have', 'or',
  'from', 'but', 'not', 'are', 'we', 'an', 'which', 'they', 'you',
  'one', 'all', 'were', 'can', 'there', 'their', 'what', 'so', 'up',
  'out', 'if', 'about', 'who', 'get', 'go', 'me', 'like', 'no', 'just',
  'him', 'now', 'my', 'her', 'make', 'than', 'our', 'us', 'then', 'these',
  'she', 'time', 'how', 'see', 'more', 'new', 'way', 'could', 'people',
  'well', 'other', 'first', 'into', 'do', 'its', 'would', 'been', 'two',
  'after', 'when', 'come', 'over', 'some', 'only', 'also', 'back', 'use',
  'because', 'even', 'most', 'give', 'any', 'day', 'through', 'man',
  'before', 'must', 'down', 'should', 'where', 'each', 'thing', 'same',
  'year', 'too', 'said'
];

const generateRandomWords = (num: number) => {
  return Array.from({ length: num }, () => easyWords[Math.floor(Math.random() * easyWords.length)]);
};

const AdvancedTypingTool: React.FC = () => {
  const [text, setText] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTime, setSelectedTime] = useState(60);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [history, setHistory] = useState<{ wpm: number, accuracy: number }[]>([]);
  const [leaderboard, setLeaderboard] = useState<{ wpm: number, accuracy: number }[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const wordsPerPage = 20; // 10 words per line, 2 lines

  useEffect(() => {
    setText(generateRandomWords(100)); // Generate 100 words for the test
  }, []);

  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      calculateResults();
      setIsTyping(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isTyping, timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTyping) setIsTyping(true);
    const value = e.target.value;

    if (value.endsWith(' ')) {
      const trimmedValue = value.trim();
      if (trimmedValue !== text[currentIndex]) {
        setErrors(errors + 1);
      } else {
        setCorrectWords(correctWords + 1);
      }
      setTypedWords([...typedWords, trimmedValue]);
      setInput('');
      setCurrentIndex(currentIndex + 1);
    } else {
      setInput(value);
    }
    highlightNextWord(value);
  };

  const highlightNextWord = (currentInput: string) => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('span');
      words.forEach((word, index) => {
        word.classList.remove('bg-gray-200', 'dark:bg-gray-600', 'text-green-500', 'text-red-500');
        if (index === currentIndex) {
          if (currentInput.trim() !== text[currentIndex].substring(0, currentInput.trim().length)) {
            word.classList.add('text-red-500');
          } else {
            word.classList.add('bg-gray-200', 'dark:bg-gray-600', 'px-1', 'rounded');
          }
        } else if (index < currentIndex) {
          if (typedWords[index] !== text[index]) {
            word.classList.add('text-red-500');
          } else {
            word.classList.add('text-green-500');
          }
        }
      });
    }
  };

  const calculateResults = () => {
    const correctWordsCount = typedWords.filter((word, index) => word === text[index]).length;
    const totalMinutes = (selectedTime - timeLeft) / 60;
    const wpm = Math.round(correctWordsCount / totalMinutes);
    const accuracy = ((correctWordsCount / typedWords.length) * 100).toFixed(2);
    setWpm(wpm);
    setAccuracy(parseFloat(accuracy));
    const result = { wpm, accuracy: parseFloat(accuracy) };
    setHistory([...history, result]);
    setLeaderboard([...leaderboard, result].sort((a, b) => b.wpm - a.wpm).slice(0, 10)); // Top 10 scores
  };

  const handleRestart = () => {
    setText(generateRandomWords(100)); // generate 100 words for longer text
    setInput('');
    setIsTyping(false);
    setTimeLeft(selectedTime);
    setWpm(null);
    setAccuracy(null);
    setTypedWords([]);
    setErrors(0);
    setCorrectWords(0);
    setCurrentIndex(0);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const time = parseInt(e.target.value);
    setSelectedTime(time);
    setTimeLeft(time);
  };

  useEffect(() => {
    highlightNextWord('');
  }, [typedWords, currentIndex]);

  return (
    <div className="p-4 max-w-3xl mx-auto my-5 bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <select value={selectedTime} onChange={handleTimeChange} className="p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white">
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
          <option value={120}>120 seconds</option>
        </select>
        <button onClick={handleRestart} className="p-2 bg-blue-500 text-white rounded">
          Restart
        </button>
      </div>
      {timeLeft === 0 ? (
        <div className="text-center">
          <div className="text-5xl font-bold text-green-500">{wpm} WPM</div>
          <div className="text-2xl">Keystrokes: <span className="text-green-500">{typedWords.join('').length + typedWords.length - 1}</span> | <span className="text-red-500">{errors}</span></div>
          <div className="text-2xl">Accuracy: {accuracy}%</div>
          <div className="text-2xl">Correct words: <span className="text-green-500">{correctWords}</span></div>
          <div className="text-2xl">Wrong words: <span className="text-red-500">{errors}</span></div>
        </div>
      ) : (
        <>
          <div id="words" className="text-4xl font-semibold whitespace-pre-wrap" ref={textRef}>
            {text.slice(0, currentIndex + wordsPerPage).map((word, index) => {
              const absoluteIndex = index;
              const wordClass = (typedWords[absoluteIndex] && typedWords[absoluteIndex] === text[absoluteIndex]) ? 'text-green-500' : (typedWords[absoluteIndex] ? 'text-red-500' : '');
              return (
                <span key={index} className={`${absoluteIndex === currentIndex ? 'bg-gray-200 dark:bg-gray-600 px-1 rounded' : wordClass}`}>
                  {word}{' '}
                </span>
              );
            })}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white text-4xl"
            placeholder="Start typing here..."
            disabled={timeLeft === 0}
            autoFocus
          />
          <div className="flex justify-between items-center text-gray-900 dark:text-gray-100">
            <div className="text-2xl">Time Left: {timeLeft}s</div>
            {wpm !== null && <div className="text-2xl">WPM: {wpm}</div>}
            {accuracy !== null && <div className="text-2xl">Accuracy: {accuracy}%</div>}
          </div>
        </>
      )}
      {history.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Typing History</h2>
          <ul className="list-disc list-inside">
            {history.map((entry, index) => (
              <li key={index}>WPM: {entry.wpm}, Accuracy: {entry.accuracy}%</li>
            ))}
          </ul>
        </div>
      )}
      {leaderboard.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Leaderboard</h2>
          <ul className="list-disc list-inside">
            {leaderboard.map((entry, index) => (
              <li key={index}>WPM: {entry.wpm}, Accuracy: {entry.accuracy}%</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdvancedTypingTool;
