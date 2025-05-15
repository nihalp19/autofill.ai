import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://complete-colt-35604.upstash.io',
  token: 'AYsUAAIjcDExNDAzMjE2M2ZkM2Q0YmM1ODQyYjg3ZDNjMzljNmQxNHAxMA',
})


export default redis