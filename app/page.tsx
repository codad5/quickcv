import { HeroSectionProgressBarSection } from "@/components/commons/herosection";
import SamplePDF from "@/components/pdf/sample-pdf";
import { Inter } from "next/font/google";
import { Link } from "nextjs13-progress";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full">
      <div className="hero-section w-full">
        <div className="first-block w-full text-center pt-2">
          <h2
            className="text-8xl font-bold text-light-gray text-blue-h2"
            style={{ textShadow: "15px 15px 4px #031CA6" }}
          >
            Your Resume Sidekick!
          </h2>
          <div className="w-full grid place-items-center py-5">
            <Link
              href="/resume-generator"
              className="shadow-action-button bg-light-gray text-blue-dark rounded-[100px]  py-3 px-16 inline-block text-5xl font-medium"
              style={{ boxShadow: "15px 15px 4px #031CA6" }}
            >
              Start Now
            </Link>
          </div>
        </div>
      </div>
      <div className="pdf-sample-section w-full relative pt-16 overflow-hidden">
        <SamplePDF />
        <div className="absolute top-16 right-20">
          <HeroSectionProgressBarSection />
        </div>
      </div>
    </div>
  );
}
