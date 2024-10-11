import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function About() {
  return (
    <main className="flex min-h-[200svh] sm:min-h-screen justify-center items-start px-4 py-2 gap-4 pb-4">
      <section className="flex flex-col justify-center items-start max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About QuickCv</h1>
        <p className="text-lg mb-6">
          QuickCv is your go-to solution for creating professional, ATS-friendly
          resumes quickly and easily. We believe that everyone deserves a chance
          to present their skills and experiences in the best possible way.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="mb-6">
          Our mission is to empower job seekers by providing an intuitive and
          accessible platform to build impressive resumes. We strive to reduce
          the stress associated with job applications, allowing users to focus
          on what matters most—landing their dream job!
        </p>
        <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside mb-6">
          <li>User-friendly interface</li>
          <li>AI-driven suggestions for content</li>
          <li>Responsive design for optimal viewing on any device</li>
          <li>Safe and secure data handling</li>
          <li>Commitment to continuous improvement based on user feedback</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
        <p>
          If you have any questions or feedback, feel free to contact us via our{" "}
          <a href="/contact" className="text-green-500 hover:underline">
            Contact Page
          </a>
          .
        </p>
      </section>
    </main>
  );
}
