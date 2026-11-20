import { useEffect, useState } from 'react';
import { type AutoPick, pickConfig, probeEnvironment } from '@kaya/ai-engine';

/**
 * Run the environment probe once and expose what auto-config would choose.
 *
 * The config UI needs this *before* any model exists on disk, which is
 * exactly what `probeEnvironment()` is built for — it inspects the host and
 * the WebGPU adapter, never the model. That is what lets the model library
 * recommend a precision that matches the backend the engine will actually
 * land on, instead of a hardcoded guess.
 *
 * Returns `null` until the probe resolves; callers should treat that as
 * "no recommendation yet" rather than substituting a default of their own.
 */
export function useAutoPick(): AutoPick | null {
  const [autoPick, setAutoPick] = useState<AutoPick | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const probe = await probeEnvironment();
      if (!cancelled) setAutoPick(pickConfig(probe));
    };

    run().catch(() => {
      // A failed probe must not blank the model library; leaving autoPick at
      // null simply means no variant gets the "best for your setup" badge.
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return autoPick;
}
