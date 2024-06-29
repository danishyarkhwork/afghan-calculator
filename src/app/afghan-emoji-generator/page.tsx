import EmojiGenerator from "@/components/Tools/EmojiGenerator";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Afghan Tax Calculator | Afghan Calculator",
    description: "This is Afghan Tax Calculator Page",
    // other metadata
};

const AfghanEmojiGeneratorPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Afghan Emoji Generator Tool"
                description="Discover a comprehensive suite of Afghan Calculator tools tailored for 
        every need."
            />
            <EmojiGenerator />
        </>
    );
};

export default AfghanEmojiGeneratorPage;
