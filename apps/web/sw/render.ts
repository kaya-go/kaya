/**
 * Fill the service worker template (sw.js) for one build.
 *
 * The build id gives each build's sw.js different bytes. A worker whose bytes
 * never change is never installed again, so its activate step, which deletes
 * the caches an older build left behind, would never run.
 */
export interface ServiceWorkerValues {
  /** Unique per build (git hash plus build date). */
  buildId: string;
  /** The onnxruntime-web version served under wasm/<version>/. */
  ortVersion: string;
}

const PLACEHOLDERS: Record<keyof ServiceWorkerValues, string> = {
  buildId: "'__KAYA_BUILD_ID__'",
  ortVersion: "'__KAYA_ORT_VERSION__'",
};

export function renderServiceWorker(template: string, values: ServiceWorkerValues): string {
  let out = template;
  for (const key of Object.keys(PLACEHOLDERS) as (keyof ServiceWorkerValues)[]) {
    const placeholder = PLACEHOLDERS[key];
    if (out.split(placeholder).length !== 2) {
      throw new Error(`sw.js must contain ${placeholder} exactly once`);
    }
    if (!values[key]) throw new Error(`No ${key} for sw.js`);
    out = out.replace(placeholder, JSON.stringify(values[key]));
  }
  return out;
}
