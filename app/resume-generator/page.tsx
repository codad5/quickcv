import CreditUsage from "@/components/commons/CreditUsage";
import RememberMe from "@/components/commons/RememberMe";
import ResumeBuilder from "@/components/resume-builder/ResumeBuilder";
import { getIp } from "@/helpers/commons/server";
import { ResumeGeneratorLimiter } from "@/helpers/rate-limiter";




export default async function Home() {
    const MAX_CREDIT = parseInt(process.env.QUICK_CV_RATE_LIMIT ?? "20");
    const ip = getIp()
    const remains = await ResumeGeneratorLimiter.getRemaining(`${ip}`)
    return (
      <div className="w-full h-max flex justify-center overflow-x-hidden flex-wrap py-10 md:px-2">
          <ResumeBuilder />
      </div>
    );
}
