"use client";

// EmojiGenerator component
import React, { useState } from 'react';

const EmojiGenerator: React.FC = () => {
    const [generatedEmoji, setGeneratedEmoji] = useState<string>('');

    const generateEmoji = () => {
        // Logic to generate emoji goes here
        const emojis = ['😀', '😎', '🚀', '🎉', '🌟']; // Example emojis
        const randomIndex = Math.floor(Math.random() * emojis.length);
        setGeneratedEmoji(emojis[randomIndex]);
    };

    return (
        <div className="flex justify-center my-5">
            <div className="panel p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold mb-2">Emoji Generator</h2>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
                    onClick={generateEmoji}
                >
                    Generate Emoji
                </button>
                <div className="text-5xl">{generatedEmoji}</div>
            </div>
        </div>
    );
};

export default EmojiGenerator;
