
import ResumeBuilder from './clients/ResumeBuilder';



export default function Home() {
  return (
    <main className="flex min-h-[200svh] sm:min-h-screen  justify-start sm:justify-center px-4 py-2 gap-4  pb-4 flex-col sm:flex-row">
      <ResumeBuilder />
    </main>
  );
}
