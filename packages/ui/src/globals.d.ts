declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// Image assets
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

// Tauri global for runtime detection
interface Window {
  __TAURI__?: unknown;
}

// Environment variables
interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly VITE_ASSET_PREFIX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
