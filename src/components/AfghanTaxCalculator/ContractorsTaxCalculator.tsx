'use client';

import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'chart.js/auto';

const calculateContractorTax = (amount: number, isLicensed: boolean) => {
  let tax = 0;
  if (amount <= 500000) {
    tax = 0;
  } else if (isLicensed) {
    tax = amount * 0.02;
  } else {
    tax = amount * 0.07;
  }
  return tax;
};

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseFormattedNumber = (formattedNumber: string) => {
  return parseFloat(formattedNumber.replace(/,/g, ''));
};

const ContractorsTaxCalculator = () => {
  const [amount, setAmount] = useState<string>('0');
  const [licensedTax, setLicensedTax] = useState<string>('0');
  const [nonLicensedTax, setNonLicensedTax] = useState<string>('0');
  const toolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parsedAmount = parseFormattedNumber(amount);
    const licensedTax = calculateContractorTax(parsedAmount, true);
    const nonLicensedTax = calculateContractorTax(parsedAmount, false);
    setLicensedTax(formatNumberWithCommas(licensedTax));
    setNonLicensedTax(formatNumberWithCommas(nonLicensedTax));
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumberWithCommas(parseFloat(value));
    setAmount(formattedValue);
  };

  const exportToCSV = () => {
    const parsedAmount = parseFormattedNumber(amount);
    const parsedLicensedTax = parseFormattedNumber(licensedTax);
    const parsedNonLicensedTax = parseFormattedNumber(nonLicensedTax);
    const csvData = `Annual Payments,Licensed Contractor Withholding Amount,Non-Licensed Contractor Withholding Amount\n${parsedAmount},${parsedLicensedTax},${parsedNonLicensedTax}`;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'contractor-tax-calculation.csv');
  };

  const exportToPDF = () => {
    const input = document.getElementById('results');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('contractor-tax-calculation.pdf');
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
    labels: ['Annual Payments', 'Licensed Contractor Withholding Amount', 'Non-Licensed Contractor Withholding Amount'],
    datasets: [
      {
        label: 'Contractor Tax Breakdown',
        data: [parseFormattedNumber(amount), parseFormattedNumber(licensedTax), parseFormattedNumber(nonLicensedTax)],
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
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Contractors Tax Calculator</h3>
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
                  How much do you pay your vendor/contractor? (Sum of all invoices for the fiscal year)
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
                Licensed Contractor Tax Withholding: <strong>{licensedTax} AFN</strong>
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-100">
                Non-Licensed Contractor Tax Withholding: <strong>{nonLicensedTax} AFN</strong>
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
              A Summary of Contract Withholding Tax
            </small>
            <table className="w-full bg-white dark:bg-gray-700 rounded shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2">Annual Payments to Contractors</th>
                  <th className="px-4 py-2">Withholding Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">0 to 500,000 AFN</td>
                  <td className="border px-4 py-2">0%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Over 500,000 AFN to a licensed contractor</td>
                  <td className="border px-4 py-2">2% flat</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Over 500,000 AFN to a non-licensed contractor</td>
                  <td className="border px-4 py-2">7% flat</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="border px-4 py-2 text-sm">
                    <strong>Payment Due Date:</strong><br />
                    10 days after the end of Solar Hijri month in which payment was made.
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

export default ContractorsTaxCalculator;
