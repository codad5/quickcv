import { Redis as UpstachRedis } from '@upstash/redis'

const Redis = new UpstachRedis({
  url: 'https://closing-marlin-43483.upstash.io',
  token: 'AanbAAIncDExNmQ2NTlhODIxNDU0MTFiOWYyZDhlODRlNGVmMGRhZnAxNDM0ODM',
})

export default Redis