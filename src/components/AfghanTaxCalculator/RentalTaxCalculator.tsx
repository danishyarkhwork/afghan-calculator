'use client';

import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'chart.js/auto';

const calculateRentalTax = (rent: number) => {
  let tax = 0;
  if (rent <= 10000) {
    tax = 0;
  } else if (rent <= 100000) {
    tax = rent * 0.1;
  } else {
    tax = rent * 0.15;
  }
  return tax;
};

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseFormattedNumber = (formattedNumber: string) => {
  return parseFloat(formattedNumber.replace(/,/g, ''));
};

const RentalTaxCalculator = () => {
  const [rent, setRent] = useState<string>('0');
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const toolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parsedRent = parseFormattedNumber(rent);
    setTaxAmount(calculateRentalTax(parsedRent));
  }, [rent]);

  const handleRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumberWithCommas(parseFloat(value));
    setRent(formattedValue);
  };

  const exportToCSV = () => {
    const parsedRent = parseFormattedNumber(rent);
    const csvData = `Monthly Rent,Withholding Amount\n${parsedRent},${taxAmount}`;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'rental-tax-calculation.csv');
  };

  const exportToPDF = () => {
    const input = document.getElementById('results');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('rental-tax-calculation.pdf');
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
    labels: ['Monthly Rent', 'Withholding Amount'],
    datasets: [
      {
        label: 'Rental Tax Breakdown',
        data: [parseFormattedNumber(rent), taxAmount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div ref={toolRef} className="container mx-auto my-10 p-5 dark:bg-gray-900 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Rental Tax Calculator</h3>
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
                  How much are you paying/collecting in rent?
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-gray-300"
                  value={rent}
                  onChange={handleRentChange}
                  required
                />
              </div>
            </form>
          </div>
          {taxAmount !== null && (
            <div id="results" className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg mb-6">
              <p className="text-lg text-gray-900 dark:text-gray-100 mb-2">
                Monthly Rent: <strong>{rent} AFN</strong>
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-100 mb-2">
                Withholding Amount: <strong>{formatNumberWithCommas(taxAmount)} AFN</strong>
              </p>
              <div className="flex mt-4">
                <button onClick={exportToCSV} className="bg-green-500 text-white py-2 px-4 rounded mr-2">Export to CSV</button>
                <button onClick={exportToPDF} className="bg-red-500 text-white py-2 px-4 rounded">Export to PDF</button>
              </div>
            </div>
          )}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Line data={data} />
          </div>
        </div>
        <div className="w-full lg:w-2/4 px-4">
          <div className="p-6 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <small className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              A Summary of Rental Withholding Tax
            </small>
            <table className="w-full bg-white dark:bg-gray-700 rounded shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2">Monthly Rent</th>
                  <th className="px-4 py-2">Withholding Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">0 to 10,000 AFN</td>
                  <td className="border px-4 py-2">0%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">10,000 AFN to 100,000 AFN</td>
                  <td className="border px-4 py-2">10% flat</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Over 100,000 AFN</td>
                  <td className="border px-4 py-2">15% flat</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="border px-4 py-2 text-sm">
                    <strong>Payment Due Date:</strong><br />
                    15 days after the end of Solar Hijri month in which payment was made.
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

export default RentalTaxCalculator;
