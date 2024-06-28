import SalesTaxCalculator from "@/components/SalesTaxCalculator/SalesTaxCalculator";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afghan Tax Calculator | Afghan Calculator",
  description: "This is Afghan Tax Calculator Page",
  // other metadata
};

const SalesTaxCalculatorPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Sales Tax Calculator"
        description="The Sales Tax Calculator can compute any one of the following, given inputs for the remaining two: before-tax price, sale tax rate, and final, or after-tax price.        "
      />
      <SalesTaxCalculator />
    </>
  );
};

export default SalesTaxCalculatorPage;
