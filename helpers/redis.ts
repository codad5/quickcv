import { Redis as UpstachRedis } from '@upstash/redis'

const Redis = new UpstachRedis({
  url: process.env.UPSTACH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_PASSWORD
})

export default Redis