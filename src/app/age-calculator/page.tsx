import AgeCalculator from "@/components/AgeCalculator/AgeCalculator";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator | Afghan Calculator",
  description: "This is Afghan Tax Calculator Page",
  // other metadata
};

const AgeCalculatorPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Age Calculator"
        description="Discover a comprehensive suite of Afghan Calculator tools tailored for 
        every need."
      />
      <AgeCalculator />
    </>
  );
};

export default AgeCalculatorPage;
