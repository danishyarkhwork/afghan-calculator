import FreeTypingTool from "@/components/Tools/FreeTypingTool";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Afghan Free Typing Tool | Afghan Calculator",
    description: "This is Afghan Tax Calculator Page",
    // other metadata
};

const AfghanFreeTypingToolPage = () => {
    return (
        <>
            <Breadcrumb
                pageName="Afghan Free Typing Tool"
                description="Discover a comprehensive suite of Afghan Calculator tools tailored for 
        every need."
            />
            <FreeTypingTool />
        </>
    );
};

export default AfghanFreeTypingToolPage;
