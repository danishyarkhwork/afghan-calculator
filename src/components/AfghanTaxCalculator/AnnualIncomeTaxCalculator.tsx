'use client';

import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'chart.js/auto';

const calculateAnnualIncomeTax = (income: number, entityType: string) => {
  let tax = 0;
  if (entityType === 'Legal Persons') {
    tax = income * 0.2;
  } else {
    if (income <= 60000) {
      tax = 0;
    } else if (income <= 150000) {
      tax = (income - 60000) * 0.02;
    } else if (income <= 1200000) {
      tax = 1800 + (income - 150000) * 0.1;
    } else {
      tax = 106800 + (income - 1200000) * 0.2;
    }
  }
  return tax;
};

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseFormattedNumber = (formattedNumber: string) => {
  return parseFloat(formattedNumber.replace(/,/g, ''));
};

const AnnualIncomeTaxCalculator = () => {
  const [income, setIncome] = useState<string>('29,300');
  const [legalPersonsTax, setLegalPersonsTax] = useState<string>('6,000');
  const [naturalPersonsTax, setNaturalPersonsTax] = useState<string>('0');
  const toolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parsedIncome = parseFormattedNumber(income);
    const legalPersonsTax = calculateAnnualIncomeTax(parsedIncome, 'Legal Persons');
    const naturalPersonsTax = calculateAnnualIncomeTax(parsedIncome, 'Natural Persons');
    setLegalPersonsTax(formatNumberWithCommas(legalPersonsTax));
    setNaturalPersonsTax(formatNumberWithCommas(naturalPersonsTax));
  }, [income]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumberWithCommas(parseFloat(value));
    setIncome(formattedValue);
  };

  const exportToCSV = () => {
    const parsedIncome = parseFormattedNumber(income);
    const parsedLegalPersonsTax = parseFormattedNumber(legalPersonsTax);
    const parsedNaturalPersonsTax = parseFormattedNumber(naturalPersonsTax);
    const csvData = `Annual Net Income,Legal Persons Tax,Natural Persons Tax\n${parsedIncome},${parsedLegalPersonsTax},${parsedNaturalPersonsTax}`;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'annual-income-tax-calculation.csv');
  };

  const exportToPDF = () => {
    const input = document.getElementById('results');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('annual-income-tax-calculation.pdf');
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
    labels: ['Annual Net Income', 'Legal Persons Tax', 'Natural Persons Tax'],
    datasets: [
      {
        label: 'Annual Income Tax Breakdown',
        data: [parseFormattedNumber(income), parseFormattedNumber(legalPersonsTax), parseFormattedNumber(naturalPersonsTax)],
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
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Annual Income Tax Calculator</h3>
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
                  What's the annual net income?
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-gray-300"
                  value={income}
                  onChange={handleIncomeChange}
                  required
                />
              </div>
            </form>
            <div id="results" className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <p className="text-lg text-gray-900 dark:text-gray-100">
                Legal Persons Tax Withholding: <strong>{legalPersonsTax} AFN</strong>
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-100">
                Natural Persons Tax Withholding: <strong>{naturalPersonsTax} AFN</strong>
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
              A Summary of Annual Income Tax
            </small>
            <table className="w-full bg-white dark:bg-gray-700 rounded shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2">Entity Type</th>
                  <th className="px-4 py-2">Net Income</th>
                  <th className="px-4 py-2">Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2" rowSpan={1}>Legal Persons:</td>
                  <td className="border px-4 py-2">Corporations, LLCs, & sole proprietors with a business name on their licences</td>
                  <td className="border px-4 py-2">Over 0 AFN</td>
                  <td className="border px-4 py-2">20% flat</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2" rowSpan={4}>Natural Persons:</td>
                  <td className="border px-4 py-2">Individuals, sole proprietors with no business name on their licences, & partners in a general partnership</td>
                  <td className="border px-4 py-2">0 to 60,000 AFN</td>
                  <td className="border px-4 py-2">0%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">60,000 AFN to 150,000 AFN</td>
                  <td className="border px-4 py-2">2% over 60,000 AFN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">150,000 AFN to 1,200,000 AFN</td>
                  <td className="border px-4 py-2">1,800 AFN + 10% over 150,000 AFN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Over 1,200,000 AFN</td>
                  <td className="border px-4 py-2">106,800 AFN + 20% over 1,200,000 AFN</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="border px-4 py-2 text-sm">
                    <strong>Payment Due Date:</strong><br />
                    Within 3 months of the end of the Afghan fiscal year.
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

export default AnnualIncomeTaxCalculator;
