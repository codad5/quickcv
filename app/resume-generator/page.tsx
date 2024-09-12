import ResumeBuilder from "@/components/resume-builder/ResumeBuilder";
import { getIp } from "@/helpers/commons/server";
import { ResumeGeneratorLimiter } from "@/helpers/rate-limiter";


async function CreditUsage({remains, max}:{remains:number, max:number}) {
    return (
      <div className="p-2 aspect-video">
        Credit Count : {remains}/{max}
      </div>
    );
}

export default async function Home() {
    const MAX_CREDIT = parseInt(process.env.QUICK_CV_RATE_LIMIT ?? "20");
    const ip = getIp()
    const remains = await ResumeGeneratorLimiter.getRemaining(`${ip}`)
    return (
      <main className="">
        <CreditUsage remains={remains} max={MAX_CREDIT} />
        <div className="flex min-h-[200svh] sm:min-h-screen  justify-start sm:justify-center px-4 py-2 gap-4  pb-4 flex-col sm:flex-row">
            <ResumeBuilder />
        </div>
      </main>
    );
}
