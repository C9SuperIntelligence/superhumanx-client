import { auth0Login } from 'electron-auth0-login'
import 'dotenv/config'

// Only import this directly into your main process
// For the rendering process, use electron.remote.require()

export default auth0Login({
  // Get these values from your Auth0 application console
  auth0: {
    audience: process.env.API_IDENTIFIER,
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    scopes: 'these will be custom to your application'
  }
})
