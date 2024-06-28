'use client';

import React from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import SalaryTaxCalculator from "@/components/AfghanTaxCalculator/SalaryTaxCalculator";
import RentalTaxCalculator from "@/components/AfghanTaxCalculator/RentalTaxCalculator";
import ContractorsTaxCalculator from "@/components/AfghanTaxCalculator/ContractorsTaxCalculator";
import BusinessReceiptsTaxCalculator from "@/components/AfghanTaxCalculator/BusinessReceiptsTaxCalculator";
import AnnualIncomeTaxCalculator from "@/components/AfghanTaxCalculator/AnnualIncomeTaxCalculator";
import 'react-tabs/style/react-tabs.css';
import '../../styles/custom.css'; // Custom CSS file for additional styling

const CalculatorForm = () => {
  return (
    <section className="py-4 md:py-5 lg:py-7">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center">
          <Tabs className="w-full">
            <TabList className="flex justify-center mb-4 border-b-2 border-gray-200 dark:border-gray-700">
              <Tab className="px-4 py-2 cursor-pointer text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" selectedClassName="border-b-4 border-blue-500 text-blue-500 dark:text-blue-400">
              💰 Salary Tax
              </Tab>
              <Tab className="px-4 py-2 cursor-pointer text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" selectedClassName="border-b-4 border-blue-500 text-blue-500 dark:text-blue-400">
              📅 Annual Income Tax
              </Tab>
              <Tab className="px-4 py-2 cursor-pointer text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" selectedClassName="border-b-4 border-blue-500 text-blue-500 dark:text-blue-400">
              🏢 Business Receipts Tax
              </Tab>
              <Tab className="px-4 py-2 cursor-pointer text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" selectedClassName="border-b-4 border-blue-500 text-blue-500 dark:text-blue-400">
              🏠 Rental Tax
              </Tab>
              <Tab className="px-4 py-2 cursor-pointer text-lg font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200" selectedClassName="border-b-4 border-blue-500 text-blue-500 dark:text-blue-400">
              🔧 Contractors Tax
              </Tab>
            </TabList>

            <TabPanel>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-200 transform">
                <SalaryTaxCalculator />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-200 transform">
                <AnnualIncomeTaxCalculator />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-200 transform">
                <BusinessReceiptsTaxCalculator />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-200 transform">
              <RentalTaxCalculator />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-200 transform">
              <ContractorsTaxCalculator />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CalculatorForm;
