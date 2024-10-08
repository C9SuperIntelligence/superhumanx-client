import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import url from 'url'
import 'dotenv/config'
import keytar from 'keytar'
import os from 'os'
import { writable } from 'svelte/store'
import { EventEmitter } from 'events'

// @ts-ignore: TS fails to resovlve the import.meta type
const auth0Domain = import.meta.env.MAIN_VITE_AUTH0_DOMAIN
// @ts-ignore: TS fails to resovlve the import.meta type
const clientId = import.meta.env.MAIN_VITE_AUTH0_CLIENT_ID

const redirectUri = 'http://localhost/callback'

const keytarService = 'electron-openid-oauth'
const keytarAccount = os.userInfo().username

const auth = new EventEmitter()
const accessTokenStore = writable(null)
let profile = null
let refreshToken = null
const failCount = 0

function getProfile(): string | null {
  return profile
}

function getAuthenticationURL(): string {
  return (
    'https://' +
    auth0Domain +
    '/authorize?' +
    'scope=openid profile offline_access&' +
    'response_type=code&' +
    'client_id=' +
    clientId +
    '&' +
    'redirect_uri=' +
    redirectUri
  )
}

async function refreshTokens(): Promise<void> {
  const refreshToken = await keytar.getPassword(keytarService, keytarAccount)

  if (refreshToken) {
    const refreshOptions = {
      method: 'POST',
      url: `https://${auth0Domain}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      data: {
        grant_type: 'refresh_token',
        client_id: clientId,
        refresh_token: refreshToken
      }
    }

    try {
      const response = await axios(refreshOptions)

      accessTokenStore.set(response.data.access_token)
      profile = jwtDecode(response.data.id_token)
    } catch (error) {
      await logout()

      throw error
    }
  } else {
    throw new Error('No available refresh token.')
  }
}

async function loadTokens(callbackURL: string): Promise<void> {
  const urlParts = url.parse(callbackURL, true)
  const query = urlParts.query

  const exchangeOptions = {
    grant_type: 'authorization_code',
    client_id: clientId,
    code: query.code,
    redirect_uri: redirectUri
  }

  const options = {
    method: 'POST',
    url: `https://${auth0Domain}/oauth/token`,
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify(exchangeOptions)
  }

  try {
    const response = await axios(options)

    accessTokenStore.set(response.data.access_token)
    profile = jwtDecode(response.data.id_token)
    refreshToken = response.data.refresh_token

    if (refreshToken) {
      await keytar.setPassword(keytarService, keytarAccount, refreshToken)
    }
  } catch (error) {
    await logout()

    throw error
  }
}

async function logout(): Promise<void> {
  await keytar.deletePassword(keytarService, keytarAccount)
  accessTokenStore.set(null)
  profile = null
  refreshToken = null
}

function getLogOutUrl(): string {
  return `https://${auth0Domain}/v2/logout`
}

//async function validateToken(): Promise<boolean> {
//  try {
//    await axios({
//      method: 'POST',
//      url: 'https://api.c9superintelligence.com/users/validate',
//      headers: {
//        'content-type': 'application/json',
//        Authorization: `Bearer ${accessToken}`
//      }
//    })
//  } catch (error) {
//    failCount += 1
//    return false
//  }
//  return true
//}

auth.on('init', async () => {
  try {
    await refreshTokens()
    auth.emit('loggedIn')
  } catch (error) {
    auth.emit('loggedOut')
    console.error(error)
  }
})

export {
  auth,
  accessTokenStore,
  getAuthenticationURL,
  getLogOutUrl,
  getProfile,
  loadTokens,
  logout,
  refreshTokens,
  failCount
}
