"use client";

import { useState, useEffect } from 'react';
import jalaali from 'jalaali-js';

const AfghanDateConverter = () => {
  const [gregorianDate, setGregorianDate] = useState({
    year: 2024,
    month: 6,
    day: 28,
  });

  const [shamsiDate, setShamsiDate] = useState({
    year: 1403,
    month: 3, // jalaali-js uses 0-based index for months
    day: 8,
  });

  const [gregorianResult, setGregorianResult] = useState('');
  const [shamsiResult, setShamsiResult] = useState('');

  const afghanMonths = ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'];
  const gregorianMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const afghanDaysOfWeek = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];

  const getDaysInMonth = (year: number, month: number, isGregorian: boolean) => {
    if (isGregorian) {
      return new Date(year, month + 1, 0).getDate();
    } else {
      return jalaali.jalaaliMonthLength(year, month);
    }
  };

  const handleGregorianChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGregorianDate((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleShamsiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShamsiDate((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const renderOptions = (start: number, end: number) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  useEffect(() => {
    const date = new Date(gregorianDate.year, gregorianDate.month, gregorianDate.day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const shamsiConvertedDate = jalaali.toJalaali(gregorianDate.year, gregorianDate.month + 1, gregorianDate.day);

    setGregorianResult(`${dayOfWeek} ${gregorianDate.day} ${gregorianMonths[gregorianDate.month]} ${gregorianDate.year}`);
    setShamsiResult(`${afghanDaysOfWeek[date.getDay()]} ${shamsiConvertedDate.jd} ${afghanMonths[shamsiConvertedDate.jm - 1]} ${shamsiConvertedDate.jy}`);
  }, [gregorianDate]);

  useEffect(() => {
    const gregorianConvertedDate = jalaali.toGregorian(shamsiDate.year, shamsiDate.month + 1, shamsiDate.day);
    const gregorianDate = new Date(gregorianConvertedDate.gy, gregorianConvertedDate.gm - 1, gregorianConvertedDate.gd);

    const dayOfWeek = daysOfWeek[gregorianDate.getDay()];
    setGregorianResult(`${dayOfWeek} ${gregorianConvertedDate.gd} ${gregorianMonths[gregorianConvertedDate.gm - 1]} ${gregorianConvertedDate.gy}`);
    setShamsiResult(`${afghanDaysOfWeek[gregorianDate.getDay()]} ${shamsiDate.day} ${afghanMonths[shamsiDate.month]} ${shamsiDate.year}`);
  }, [shamsiDate]);

  return (
    <div className="container mx-auto bg-white shadow-md mt-12 text-center">
      <div className="flex justify-around">
        <div className="w-1/2 p-4">
          <label className="block font-semibold mb-2" htmlFor="gregorian-year">انتخاب سال به میلادی</label>
          <label className="block font-semibold mb-2" htmlFor="gregorian-year">Select Gregorian date</label>
          <select className="w-full p-2 mb-4" name="year" value={gregorianDate.year} onChange={handleGregorianChange}>
            {renderOptions(1916, 2116)}
          </select>
          <select className="w-full p-2 mb-4" name="month" value={gregorianDate.month} onChange={handleGregorianChange}>
            {gregorianMonths.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select className="w-full p-2 mb-4" name="day" value={gregorianDate.day} onChange={handleGregorianChange}>
            {renderOptions(1, getDaysInMonth(gregorianDate.year, gregorianDate.month, true))}
          </select>
          <div className="mt-4 font-semibold">نتیجه به شمسی</div>
          <div className="bg-gray-100 p-4 mt-2 text-red-600">{shamsiResult}</div>
        </div>
        <div className="w-1/2 p-4">
          <label className="block font-semibold mb-2" htmlFor="shamsi-year">انتخاب سال به شمسی</label>
          <label className="block font-semibold mb-2" htmlFor="shamsi-year">Select Shamsi date</label>
          <select className="w-full p-2 mb-4" name="year" value={shamsiDate.year} onChange={handleShamsiChange}>
            {renderOptions(1295, 1497)}
          </select>
          <select className="w-full p-2 mb-4" name="month" value={shamsiDate.month} onChange={handleShamsiChange}>
            {afghanMonths.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select className="w-full p-2 mb-4" name="day" value={shamsiDate.day} onChange={handleShamsiChange}>
            {renderOptions(1, getDaysInMonth(shamsiDate.year, shamsiDate.month, false))}
          </select>
          <div className="mt-4 font-semibold">نتیجه به میلادی</div>
          <div className="bg-gray-100 p-4 mt-2 text-red-600">{gregorianResult}</div>
        </div>
      </div>
    </div>
  );
};

export default AfghanDateConverter;
