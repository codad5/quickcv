import { Ratelimit } from "@upstash/ratelimit";
import Redis from "./redis";
import { getIp } from "./commons/server";

const RATE_LIMIT_COUNT = parseInt(process.env.QUICK_CV_RATE_LIMIT ?? "20");

export const ResumeGeneratorLimiter = new Ratelimit({
    redis: Redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_COUNT, "60 m"),
    analytics: true,
    prefix: "ratelimit:resume-generator",
});


export async function getCredit() {
    const ip = getIp() ?? "localhost";
    const remains = await ResumeGeneratorLimiter.getRemaining(`${ip}`);
    return remains
}
