import Link from 'next/link';
import SectionTitle from "../Common/SectionTitle";
import ourToolsSectionData from "./ourToolsSectionData";

const OurToolsSection = () => {
  return (
    <section
      id="toolsSection"
      className="bg-gray-light dark:bg-bg-color-dark py-10 md:py-16 lg:py-22"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Our Tools"
            paragraph="Explore our diverse range of calculator tools designed to help you solve various mathematical and technical problems with ease."
            center
          />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {ourToolsSectionData.map((tools) => (
            <div key={tools.id} className="w-full">
              <Link href={tools.link} passHref>
                <div className="block transform transition duration-300 hover:scale-105">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                    <div className="text-4xl mb-4">{tools.emoji}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{tools.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{tools.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurToolsSection;
