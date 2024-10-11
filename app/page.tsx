import { Inter } from "next/font/google";
import { Link } from "nextjs13-progress";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-[200svh] sm:min-h-screen justify-start sm:justify-center px-4 py-2 gap-4 pb-4 flex-col sm:flex-row">
      <section className="flex flex-col justify-center items-start max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to QuickCv</h1>
        <p className="text-lg mb-6">
          QuickCv is a simple AI-powered CV builder designed to help you create
          an ATS-friendly resume in minutes. Whether you're a fresh graduate or
          a seasoned professional, our tool makes it easy to showcase your
          skills and experience.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Features:</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Create a resume in just a few clicks</li>
          <li>ATS-friendly design for better job application success</li>
          <li>Auto-save feature to keep your progress</li>
          <li>
            Multiple sections for personal information, education, work
            experience, and more
          </li>
          <li>Print and download options in PDF format</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Why Choose QuickCv?</h2>
        <p className="mb-6">
          Our user-friendly interface and AI assistance make resume building
          effortless, allowing you to focus on what truly matters - landing your
          dream job!
        </p>
        <Link
          href="/resume-generator"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Start Building Your Resume
        </Link>
      </section>
    </main>
  );
}
