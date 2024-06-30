"use client";

import React, { useState, useEffect, useRef } from 'react';
import { faker } from '@faker-js/faker';

const generateRandomWords = (num: number) => {
    return Array.from({ length: num }, () => faker.word.sample()).join(' ');
};

const AdvancedTypingTool: React.FC = () => {
    const [text, setText] = useState(generateRandomWords(200));
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [wpm, setWpm] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [typedWords, setTypedWords] = useState<string[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const textRef = useRef<HTMLDivElement>(null);

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
            setTypedWords([...typedWords, value.trim()]);
            setInput('');
            highlightNextWord();
        } else {
            setInput(value);
        }
    };

    const highlightNextWord = () => {
        if (textRef.current) {
            const words = textRef.current.querySelectorAll('span');
            words.forEach((word, index) => {
                if (index === typedWords.length) {
                    word.classList.add('highlight');
                } else {
                    word.classList.remove('highlight');
                }
            });
        }
    };

    const calculateResults = () => {
        const wordsTyped = typedWords.length;
        setWpm(wordsTyped);
        const correctWords = typedWords.filter((word, index) => word === text.split(' ')[index]).length;
        setAccuracy((correctWords / wordsTyped) * 100);
    };

    return (
        <div className="p-4 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div id="words" className="text-lg font-semibold whitespace-pre-wrap" ref={textRef}>
                {text.split(' ').map((word, index) => (
                    <span key={index} wordnr={index} className={index === 0 ? 'highlight' : ''}>
                        {word}{' '}
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Start typing here..."
                disabled={timeLeft === 0}
                autoFocus
            />
            <div className="flex justify-between items-center">
                <div>Time Left: {timeLeft}s</div>
                {wpm !== null && <div>WPM: {wpm}</div>}
                {accuracy !== null && <div>Accuracy: {accuracy.toFixed(2)}%</div>}
            </div>
        </div>
    );
};

export default AdvancedTypingTool;
