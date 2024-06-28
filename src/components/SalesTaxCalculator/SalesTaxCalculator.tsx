"use client";

import { useState } from "react";

const SalesTaxCalculator = () => {
  const [beforeTax, setBeforeTax] = useState<number | string>("");
  const [taxRate, setTaxRate] = useState<number | string>("");
  const [afterTax, setAfterTax] = useState<number | string>("");

  const handleBeforeTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBeforeTax(value);
    calculateAfterTax(value, taxRate);
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaxRate(value);
    calculateAfterTax(beforeTax, value);
  };

  const calculateAfterTax = (beforeTax: number | string, taxRate: number | string) => {
    const beforeTaxNumber = parseFloat(beforeTax as string);
    const taxRateNumber = parseFloat(taxRate as string);
    if (!isNaN(beforeTaxNumber) && !isNaN(taxRateNumber)) {
      const afterTaxPrice = beforeTaxNumber + (beforeTaxNumber * taxRateNumber) / 100;
      setAfterTax(afterTaxPrice.toFixed(2));
    } else {
      setAfterTax("");
    }
  };

  const clearForm = () => {
    setBeforeTax("0");
    setTaxRate("0");
    setAfterTax("0");
  };

  return (
    <div className="flex justify-center my-3">
      <div className="panel p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Sales Tax Calculator
        </h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="text-right pr-4 text-gray-700 dark:text-gray-300">Before Tax Price</td>
              <td>
                <input
                  type="text"
                  name="beforetax"
                  id="beforetax"
                  value={beforeTax}
                  onChange={handleBeforeTaxChange}
                  className="p-2 border rounded-md w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </td>
            </tr>
            <tr>
              <td className="text-right pr-4 text-gray-700 dark:text-gray-300">Sales Tax Rate (%)</td>
              <td>
                <input
                  type="text"
                  name="taxrate"
                  value={taxRate}
                  onChange={handleTaxRateChange}
                  className="p-2 border rounded-md w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </td>
            </tr>
            <tr>
              <td className="text-right pr-4 text-gray-700 dark:text-gray-300">After Tax Price</td>
              <td>
                <input
                  type="text"
                  name="finalprice"
                  id="finalprice"
                  value={afterTax}
                  readOnly
                  className="p-2 border rounded-md w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-center pt-4">
                <button
                  onClick={clearForm}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Clear
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTaxCalculator;
