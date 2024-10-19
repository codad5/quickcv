import { HeroSectionProgressBarSection } from "@/components/commons/herosection";
import SamplePDF from "@/components/pdf/sample-pdf";
import { Inter } from "next/font/google";
import { Link } from "nextjs13-progress";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full h-max flex flex-col overflow-x-hidden flex-nowrap">
      <div className="hero-section w-full">
        <div className="first-block w-full text-center pt-2">
          <h2
            className="font-bold text-light-gray text-blue-h2 text-5xl md:text-8xl"
            style={{
              textShadow: "15px 15px 4px #031CA6",
            }}
          >
            Your Resume Sidekick!
          </h2>
          <div className="w-full grid place-items-center py-5">
            <Link
              href="/resume-generator"
              className="shadow-action-button bg-light-gray text-blue-dark rounded-[100px] py-3 px-16 inline-block text-xl md:text-5xl font-medium"
              style={{ boxShadow: "15px 15px 4px #031CA6" }}
            >
              Start Now
            </Link>
          </div>
        </div>
      </div>
      <div className="pdf-sample-section w-full relative pt-16 overflow-hidden flex-grow">
        <SamplePDF />
        <div className="hidden md:inline-block absolute top-16 right-16">
          <HeroSectionProgressBarSection />
        </div>
      </div>
    </div>
  );
}
