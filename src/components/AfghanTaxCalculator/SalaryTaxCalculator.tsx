'use client';

import { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'chart.js/auto';

const calculateTaxFromGross = (salary: number) => {
  let tax = 0;
  if (salary <= 5000) {
    tax = 0;
  } else if (salary <= 12500) {
    tax = (salary - 5000) * 0.02;
  } else if (salary <= 100000) {
    tax = 150 + (salary - 12500) * 0.1;
  } else {
    tax = 8900 + (salary - 100000) * 0.2;
  }
  return tax;
};

const calculateGrossFromNet = (netSalary: number) => {
  let grossSalary = netSalary;
  let tax = calculateTaxFromGross(grossSalary);
  while (grossSalary - tax !== netSalary) {
    grossSalary = netSalary + tax;
    tax = calculateTaxFromGross(grossSalary);
  }
  return grossSalary;
};

const calculateGrossFromTax = (taxAmount: number) => {
  let grossSalary = 0;
  if (taxAmount <= 150) {
    grossSalary = 5000 + (taxAmount / 0.02);
  } else if (taxAmount <= 8900) {
    grossSalary = 12500 + ((taxAmount - 150) / 0.1);
  } else {
    grossSalary = 100000 + ((taxAmount - 8900) / 0.2);
  }
  return grossSalary;
};

const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parseFormattedNumber = (formattedNumber: string) => {
  return parseFloat(formattedNumber.replace(/,/g, ''));
};

const TaxCalculator = () => {
  const [grossSalary, setGrossSalary] = useState<string>('0');
  const [netSalary, setNetSalary] = useState<string>('0');
  const [taxAmount, setTaxAmount] = useState<string>('0');
  const [mode, setMode] = useState<string>('gross'); // gross, net, tax
  const toolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let parsedGrossSalary = parseFormattedNumber(grossSalary);
    let parsedNetSalary = parseFormattedNumber(netSalary);
    let parsedTaxAmount = parseFormattedNumber(taxAmount);

    if (mode === 'gross') {
      const tax = calculateTaxFromGross(parsedGrossSalary);
      setTaxAmount(formatNumberWithCommas(tax));
      setNetSalary(formatNumberWithCommas(parsedGrossSalary - tax));
    } else if (mode === 'net') {
      const gross = calculateGrossFromNet(parsedNetSalary);
      const tax = calculateTaxFromGross(gross);
      setGrossSalary(formatNumberWithCommas(gross));
      setTaxAmount(formatNumberWithCommas(tax));
    } else if (mode === 'tax') {
      const gross = calculateGrossFromTax(parsedTaxAmount);
      setGrossSalary(formatNumberWithCommas(gross));
      setNetSalary(formatNumberWithCommas(gross - parsedTaxAmount));
    }
  }, [grossSalary, netSalary, taxAmount, mode]);

  const handleGrossSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumberWithCommas(parseFloat(value));
    setGrossSalary(formattedValue);
  };

  const handleNetSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumberWithCommas(parseFloat(value));
    setNetSalary(formattedValue);
  };

  const handleTaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumberWithCommas(parseFloat(value));
    setTaxAmount(formattedValue);
  };

  const exportToCSV = () => {
    const parsedGrossSalary = parseFormattedNumber(grossSalary);
    const parsedTaxAmount = parseFormattedNumber(taxAmount);
    const parsedNetSalary = parseFormattedNumber(netSalary);
    const csvData = `Gross Salary,Tax Amount,Net Salary\n${parsedGrossSalary},${parsedTaxAmount},${parsedNetSalary}`;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'tax-calculation.csv');
  };

  const exportToPDF = () => {
    const input = document.getElementById('results');
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('tax-calculation.pdf');
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
    labels: ['Gross Salary', 'Net Salary', 'Tax Amount'],
    datasets: [
      {
        label: 'Salary Breakdown',
        data: [
          parseFormattedNumber(grossSalary),
          parseFormattedNumber(netSalary),
          parseFormattedNumber(taxAmount),
        ],
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
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Salary Tax Calculator</h3>
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
            <div className="flex mb-4">
              <button
                className={`px-4 py-2 mr-2 rounded ${mode === 'gross' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
                onClick={() => setMode('gross')}
              >
                Gross Salary
              </button>
              <button
                className={`px-4 py-2 mr-2 rounded ${mode === 'net' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
                onClick={() => setMode('net')}
              >
                Net Salary
              </button>
              <button
                className={`px-4 py-2 rounded ${mode === 'tax' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
                onClick={() => setMode('tax')}
              >
                Tax Amount
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {mode === 'gross' && (
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                    What is the total monthly salary (gross salary)?
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded dark:bg-gray-700 dark:text-gray-300"
                    value={grossSalary}
                    onChange={handleGrossSalaryChange}
                    required
                  />
                </div>
              )}
              {mode === 'net' && (
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                    What is the total monthly net salary?
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded dark:bg-gray-700 dark:text-gray-300"
                    value={netSalary}
                    onChange={handleNetSalaryChange}
                    required
                  />
                </div>
              )}
              {mode === 'tax' && (
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                    What is the total monthly tax amount?
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded dark:bg-gray-700 dark:text-gray-300"
                    value={taxAmount}
                    onChange={handleTaxAmountChange}
                    required
                  />
                </div>
              )}
            </form>
            {grossSalary !== null && taxAmount !== null && netSalary !== null && (
              <div id="results" className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="text-lg text-gray-900 dark:text-gray-100">
                  Gross Salary: <strong>{grossSalary} AFN</strong>
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-100">
                  Tax Amount: <strong>{taxAmount} AFN</strong>
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-100">
                  Net Salary: <strong>{netSalary} AFN</strong>
                </p>
                <div className="flex mt-4">
                  <button onClick={exportToCSV} className="bg-green-500 text-white py-2 px-4 rounded mr-2">Export to CSV</button>
                  <button onClick={exportToPDF} className="bg-red-500 text-white py-2 px-4 rounded">Export to PDF</button>
                </div>
              </div>
            )}
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <Line data={data} />
          </div>
        </div>
        <div className="w-full lg:w-2/4 px-4">
          <div className="p-6 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <small className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
              A Summary of Salary Withholding Tax
            </small>
            <table className="w-full bg-white dark:bg-gray-700 rounded shadow-md">
              <thead>
                <tr>
                  <th className="px-4 py-2">Monthly Salary</th>
                  <th className="px-4 py-2">Withholding Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">0 to 5,000 AFN</td>
                  <td className="border px-4 py-2">0%</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">5,000 AFN to 12,500 AFN</td>
                  <td className="border px-4 py-2">2% of amount over 5,000 AFN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">12,500 AFN to 100,000 AFN</td>
                  <td className="border px-4 py-2">150 AFN + 10% over 12,500 AFN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Over 100,000 AFN</td>
                  <td className="border px-4 py-2">8,900 AFN + 20% over 100,000 AFN</td>
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

export default TaxCalculator;
