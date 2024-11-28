import { BskyAgent } from '@atproto/api'

export const agent = new BskyAgent({
  service: 'https://bsky.social'
})

export const userAuthentication = async(auth) => {
  return await agent.login(auth)
}