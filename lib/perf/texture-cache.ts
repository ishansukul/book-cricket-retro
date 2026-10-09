// Lightweight sprite and page canvas buffer caching
const canvasBuffer = new Map<number, HTMLCanvasElement>();

export function getCachedPageBuffer(pageNum: number): HTMLCanvasElement | null {
  return canvasBuffer.get(pageNum) || null;
}
