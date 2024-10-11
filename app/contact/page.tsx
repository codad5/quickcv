// app/contact/page.js
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Contact() {
  return (
    <main className="flex min-h-[200svh] sm:min-h-screen justify-center items-start px-4 py-2 gap-4 pb-4">
      <section className="flex flex-col justify-center items-start max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-4">
          If you have any questions or would like to get in touch, feel free to
          reach out through the following channels:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:aniezeofor.mic@gmail.com"
              className="text-green-500 hover:underline"
            >
              aniezeofor.mic@gmail.com
            </a>
          </li>
          <li>
            <strong>Alternative Email:</strong>{" "}
            <a
              href="mailto:hi@codad5.me"
              className="text-green-500 hover:underline"
            >
              hi@codad5.me
            </a>
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a
              href="https://codad5.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              codad5.me
            </a>
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/codad5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              github.com/codad5
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/your-linkedin-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              Your LinkedIn Profile
            </a>
          </li>
        </ul>
        <p>We look forward to hearing from you!</p>
      </section>
    </main>
  );
}
