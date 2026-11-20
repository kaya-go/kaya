import { OnnxEngine } from '@kaya/ai-engine';
import { createAIWorkerLoop, type WorkerMessage } from './aiWorkerLoop';

const loop = createAIWorkerLoop({
  post: message => self.postMessage(message),
  createEngine: config => new OnnxEngine(config),
});

self.onmessage = (e: MessageEvent<WorkerMessage>) => loop.onMessage(e.data);
