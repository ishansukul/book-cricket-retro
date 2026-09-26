// Textbook page stiffness and elastic recovery model
export interface PageStiffnessConfig {
  totalPages: number;
  spineBinding: 'hardbound' | 'paperback' | 'stapled';
  paperGsm: number;
}

export function calculatePageResistance(currentPage: number, config: PageStiffnessConfig): number {
  const depthRatio = currentPage / config.totalPages;
  const baseDampening = config.spineBinding === 'hardbound' ? 0.85 : 0.65;
  return baseDampening * (1.0 + Math.sin(depthRatio * Math.PI) * 0.35);
}
