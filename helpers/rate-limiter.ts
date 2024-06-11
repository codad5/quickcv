import { Ratelimit } from "@upstash/ratelimit";
import Redis from "./redis";

export const ResumeGeneratorLimiter = new Ratelimit({
    redis: Redis,
    limiter: Ratelimit.slidingWindow(20, "15 m"),
    analytics: true,
    prefix: "ratelimit:resume-generator",
});