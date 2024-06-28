import AfghanDateConverter from "@/components/AfghanDateConverter/AfghanDateConverter";
import Breadcrumb from "@/components/Common/Breadcrumb";
import 'select2/dist/css/select2.min.css';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afghan Tax Calculator | Afghan Calculator",
  description: "This is Afghan Tax Calculator Page",
  // other metadata
};

const AfghanDateConverterPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Afghan Date Converter"
        description="Discover a comprehensive suite of Afghan Calculator tools tailored for 
        every need."
      />
      <AfghanDateConverter />
    </>
  );
};

export default AfghanDateConverterPage;
