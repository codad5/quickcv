import { Link, Next13NProgress } from "nextjs13-progress";

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
      <header className="w-full grid place-items-center px-10 py-8">
        <Next13NProgress color="#3DD973" height={5} />
        <div className="w-full bg-deep-blue-opacity rounded-full h-[100px] px-11">
          <div className="w-full h-full flex justify-between">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold">
                <Link href="/">QuickCv</Link>
              </h1>
            </div>
            <nav className="flex items-center">
              {navLinks.map((navLink, index) => (
                <Link
                  key={index}
                  href={navLink.url}
                  className="mx-4 text-2xl font-light underline"
                >
                  {navLink.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
    );
}