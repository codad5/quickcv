import { Ratelimit } from "@upstash/ratelimit";
import Redis from "./redis";

const RATE_LIMIT_COUNT = parseInt(process.env.QUICK_CV_RATE_LIMIT ?? "20");

export const ResumeGeneratorLimiter = new Ratelimit({
    redis: Redis,
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_COUNT, "15 m"),
    analytics: true,
    prefix: "ratelimit:resume-generator",
});



