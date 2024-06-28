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
        pageName="Afghan Tax Calculator Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <CalculatorForm />
    </>
  );
};

export default AfghanTaxCaclulatorPage;
