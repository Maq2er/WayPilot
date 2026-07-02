/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.geojson?url' {
  const url: string
  export default url
}
