import { HeroSectionProgressBarSection } from "@/components/commons/herosection";
import SamplePDF from "@/components/pdf/sample-pdf";
import { Inter } from "next/font/google";
import { Link } from "nextjs13-progress";
import {
  Send,
  User,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Globe,
  ChevronRight,
  ChevronLeft,
  Printer,
  Edit,
  Sparkles,
  Trash2,
  Plus,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  // Link,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import HeroSamplePdf from "@/components/commons/HeroSamplePdf";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold leading-tight">
              Your Resume{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Sidekick!
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Create professional resumes in minutes with our AI-powered
              builder. Stand out from the crowd and land your dream job.
            </p>
            <div className="flex space-x-4">
              <Link
                href={"/form"}
                className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center"
              >
              Start Now
              </Link>
                <Sparkles className="ml-2 h-5 w-5" />
              <button className="px-6 py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <HeroSamplePdf />
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="h-12 w-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-400">
              Smart suggestions and formatting to make your resume stand out.
            </p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Edit className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Editing</h3>
            <p className="text-gray-400">
              Intuitive interface for quick updates and real-time preview.
            </p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50">
            <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <Printer className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Export Ready</h3>
            <p className="text-gray-400">
              Download your resume in multiple formats or print directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
