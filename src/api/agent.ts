// Import the BskyAgent class from the '@atproto/api' package
import { BskyAgent } from '@atproto/api'

// Create a new instance of BskyAgent, configured to interact with the 'bsky.social' service
export const agent = new BskyAgent({
  service: 'https://bsky.social' // URL of the service the agent will interact with
})

// Define an asynchronous function 'userAuthentication' that accepts an 'auth' parameter
// This function logs in the user using the provided authentication credentials
export const userAuthentication = async(auth) => {
  // Perform the login using the agent and return the result
  return await agent.login(auth)
}
