
import ResumeBuilder from '../components/resume-builder/ResumeBuilder';



export default function Home() {

  // if path is not /resume-generator redirect to /resume-generator
  
  return (
    <main className="flex min-h-[200svh] sm:min-h-screen  justify-start sm:justify-center px-4 py-2 gap-4  pb-4 flex-col sm:flex-row">
      <ResumeBuilder />
    </main>
  );
}
