import { Link, Next13NProgress } from "nextjs13-progress";
import MobileNav from "./mobile-nav";

const navLinks = [
    {
        title: 'About',
        url: '/about'
    },
    {
        title: 'Contact',
        url: '/contact'
    }
]

export default function Header() {
    return (
      <header className="w-full md:px-10 px-3">
        <Next13NProgress color="#3DD973" height={5} />
        <nav className="flex items-center justify-between mb-16">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            QuickCV
          </h1>
          <div className="flex space-x-6">
            {navLinks.map((navLink, index) => (
              <Link
                key={index}
                href={navLink.url}
                className="text-gray-400 hover:text-white transition-colors grid place-items-center"
              >
                {navLink.title}
              </Link>
            ))}
            <Link
              href={"/resume-generator"}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>
    );
}