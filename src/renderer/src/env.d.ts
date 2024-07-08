/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_API_IDENTIFIER: string
  readonly MAIN_VITE_AUTH0_DOMAIN: string
  readonly MAIN_VITE_AUTH0_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
