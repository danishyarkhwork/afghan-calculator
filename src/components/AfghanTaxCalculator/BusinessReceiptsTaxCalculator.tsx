'use client';

import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'chart.js/auto';

const calculateBusinessReceiptsTax = (amount: number, industry: string) => {
  let tax = 0;
  if (industry === 'Airlines, Telecommunications, & Superior Hospitality Industries') {
    tax = amount * 0.1;
  } else if (industry === 'Regular Hospitality Industries') {
    tax = amount * 0.05;
  } else {
    tax = amount * 0.04;
  }
  return tax;
};

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseFormattedNumber = (formattedNumber: string) => {
  return parseFloat(formattedNumber.replace(/,/g, ''));
};

const BusinessReceiptsTaxCalculator = () => {
  const [amount, setAmount] = useState<string>('40,000');
  const [airlinesTax, setAirlinesTax] = useState<string>('4,000');
  const [hospitalityTax, setHospitalityTax] = useState<string>('2,000');
  const [otherIndustriesTax, setOtherIndustriesTax] = useState<string>('1,600');
  const toolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parsedAmount = parseFormattedNumber(amount);
    const airlinesTax = calculateBusinessReceiptsTax(parsedAmount, 'Airlines, Telecommunications, & Superior Hospitality Industries');
    const hospitalityTax = calculateBusinessReceiptsTax(parsedAmount, 'Regular Hospitality Industries');
    const otherIndustriesTax = calculateBusinessReceiptsTax(parsedAmount, 'All other industries');
    setAirlinesTax(formatNumberWithCommas(airlinesTax));
    setHospitalityTax(formatNumberWithCommas(hospitalityTax));
    setOtherIndustriesTax(formatNumberWithCommas(otherIndustriesTax));
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumberWithCommas(parseFloat(value));
    setAmount(formattedValue);
  };

  const exportToCSV = () => {
    const parsedAmount = parseFormattedNumber(amount);
    const parsedAirlinesTax = parseFormattedNumber(airlinesTax);
    const parsedHospitalityTax = parseFormattedNumber(hospitalityTax);
    const parsedOtherIndustriesTax = parseFormattedNumber(otherIndustriesTax);
    const csvData = `Quarterly Receipts,Airlines, Telecommunications, & Superior Hospitality Industries Tax,Regular Hospitality Industries Tax,All Other Industries Tax\n${parsedAmount},${parsedAirlinesTax},${parsedHospitalityTax},${parsedOtherIndustriesTax}`;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'business-receipts-tax-calculation.csv');
  };

  const exportToPDF = () => {
    const input = document.getElementById('results');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('business-receipts-tax-calculation.pdf');
      });
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (toolRef.current) {
        toolRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const data = {
    labels: ['Quarterly Receipts', 'Airlines, Telecommunications, & Superior Hospitality Industries Tax', 'Regular Hospitality Industries Tax', 'All Other Industries Tax'],
    datasets: [
      {
        label: 'Business Receipts Tax Breakdown',
        data: [parseFormattedNumber(amount), parseFormattedNumber(airlinesTax), parseFormattedNumber(hospitalityTax), parseFormattedNumber(otherIndustriesTax)],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div ref={toolRef} className="container mx-auto my-10 p-5 dark:bg-gray-900 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Business Receipts Tax Calculator</h3>
        <button
          className="px-4 py-2 rounded bg-gray-800 text-white"
          onClick={toggleFullScreen}
        >
          Full Screen
        </button>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/4 px-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  What was the total receivable amount for this quarter?
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-gray-300"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </div>
            </form>
            <div id="results" className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <p className="text-lg text-gray-900 dark:text-gray-100">
                Airlines, Telecommunications, & Superior Hospitality Industries Tax Withholding: <strong>{airlinesTax} AFN</strong>
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-100">
                Regular Hospitality Industries Tax Withholding: <strong>{hospitalityTax} AFN</strong>
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-100">
                All Other Industries Tax Withholding: <strong>{otherIndustriesTax} AFN</strong>
              </p>
              <div className="flex mt-4">
                <button onClick={exportToCSV} className="bg-green-500 text-white py-2 px-4 rounded mr-2">Export to CSV</button>
                <button onClick={exportToPDF} className="bg-red-500 text-white py-2 px-4 rounded">Export to PDF</button>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Line data={data} />
          </div>
        </div>
        <div className="w-full lg:w-2/4 px-4">
          <div className="p-6 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <small className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              A Summary of Business Receipts Tax (BRT)
            </small>
            <table className="w-full bg-white dark:bg-gray-700 rounded shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2">Industries</th>
                  <th className="px-4 py-2">Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Airlines, Telecommunications, & Superior Hospitality Industries</td>
                  <td className="border px-4 py-2">10% flat</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Regular Hospitality Industries</td>
                  <td className="border px-4 py-2">5% flat</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">All other industries</td>
                  <td className="border px-4 py-2">4% flat</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="border px-4 py-2 text-sm">
                    <strong>Payment Due Date:</strong><br />
                    15 days after the end of the Solar Hijri quarter in which payment was received.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessReceiptsTaxCalculator;
