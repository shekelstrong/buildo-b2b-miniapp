/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INVESTIGATIONS_API?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
