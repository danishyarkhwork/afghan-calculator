import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import OurToolsSection from "@/components/OurToolsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afghan Calculator",
  description: "This is Home Afghan Calculator",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <OurToolsSection />
      <Features />
      <Blog />
    </>
  );
}
