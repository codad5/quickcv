import CreditUsage from "@/components/commons/CreditUsage";
import RememberMe from "@/components/commons/RememberMe";
import ResumeBuilder from "@/components/resume-builder/ResumeBuilder";
import { getIp } from "@/helpers/commons/server";
import { ResumeGeneratorLimiter } from "@/helpers/rate-limiter";




export default async function Home() {
    const MAX_CREDIT = parseInt(process.env.QUICK_CV_RATE_LIMIT ?? "20");
    const ip = getIp()
    let remains = 0; 
    try {
      remains = await ResumeGeneratorLimiter.getRemaining(`${ip}`)
    } catch (e) {
      console.log(`error`, e);
    }
    return (
      <div className="w-full h-max flex justify-center overflow-x-hidden flex-wrap md:py-10 md:px-2 gap-4">
          <ResumeBuilder  />
      </div>
    );
}
