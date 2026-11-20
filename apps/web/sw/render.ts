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

/** Replace each placeholder, which must appear exactly once, by its value as a JS literal. */
function fill(template: string, file: string, values: Record<string, string>): string {
  let out = template;
  for (const [placeholder, value] of Object.entries(values)) {
    if (out.split(placeholder).length !== 2) {
      throw new Error(`${file} must contain ${placeholder} exactly once`);
    }
    if (!value) throw new Error(`No value for ${placeholder} in ${file}`);
    out = out.replace(placeholder, () => JSON.stringify(value));
  }
  return out;
}

export function renderServiceWorker(template: string, values: ServiceWorkerValues): string {
  return fill(template, 'sw.js', {
    [PLACEHOLDERS.buildId]: values.buildId,
    [PLACEHOLDERS.ortVersion]: values.ortVersion,
  });
}

/** Fill the registration script (register.js) that index.html inlines. */
export function renderRegistration(template: string, scriptUrl: string): string {
  return fill(template, 'register.js', { "'__KAYA_SW_URL__'": scriptUrl });
}
