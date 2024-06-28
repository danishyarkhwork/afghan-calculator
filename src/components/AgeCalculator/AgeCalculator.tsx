"use client";

import { useState } from "react";
import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  parse,
} from "date-fns";

const AgeCalculator = () => {
  const [dob, setDob] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<string | null>(null);

  const calculateAge = () => {
    const birthDate = parse(dob, "yyyy-MM-dd", new Date());
    const current = parse(currentDate, "yyyy-MM-dd", new Date());

    const years = differenceInYears(current, birthDate);
    const months = differenceInMonths(current, birthDate);
    const weeks = differenceInWeeks(current, birthDate);
    const days = differenceInDays(current, birthDate);
    const hours = differenceInHours(current, birthDate);
    const minutes = differenceInMinutes(current, birthDate);
    const seconds = differenceInSeconds(current, birthDate);

    const remainingMonths = months % 12;
    const remainingWeeks = weeks % 4;
    const remainingDays = days % 30;

    setResult(
      `Age: ${years} years ${remainingMonths} months ${remainingDays} days
or ${months} months ${remainingDays} days
or ${weeks} weeks ${remainingDays} days
or ${days} days
or ${hours} hours
or ${minutes} minutes
or ${seconds} seconds`
    );
  };

  return (
    <div className="flex justify-center my-5">
      <div className="panel p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Age Calculator
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Calculate Age At</label>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>
        <div className="text-center">
          <button
            onClick={calculateAge}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Calculate
          </button>
        </div>
        {result && (
          <div className="mt-6 text-center text-gray-800 dark:text-gray-200 whitespace-pre-line">
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
