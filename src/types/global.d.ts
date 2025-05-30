interface FacebookPixel {
  (command: 'init', pixelId: string): void;
  (command: 'track', event: string, parameters?: Record<string, unknown>): void;
  (command: 'trackCustom', event: string, parameters?: Record<string, unknown>): void;
  push: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
  queue?: unknown[];
}

declare global {
  interface Window {
    fbq?: FacebookPixel;
    _fbq?: FacebookPixel;
  }
}

export {}; 