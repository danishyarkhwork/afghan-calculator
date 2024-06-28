import CalculatorForm from "@/components/AfghanTaxCalculator/CalculatorForm";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afghan Tax Calculator | Afghan Calculator",
  description: "This is Afghan Tax Calculator Page",
  // other metadata
};

const AfghanTaxCaclulatorPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Afghan Tax Calculators"
        description="Discover a comprehensive suite of Afghan Calculator tools tailored for 
        every need. Our Afghan Calculator collection includes the Salary Tax calculator for 
        accurate monthly deductions, the Annual Income Tax calculator to help you stay 
        compliant yearly, and the Business Receipts Tax calculator for business owners. 
        Additionally, explore our Rental Tax and Contractors Tax calculators to manage your
         property and contract-based earnings with ease."
      />
      <CalculatorForm />
    </>
  );
};

export default AfghanTaxCaclulatorPage;
