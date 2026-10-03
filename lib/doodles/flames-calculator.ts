// Vintage FLAMES back-bench compatibility calculator
export function calculateFlames(name1: string, name2: string): string {
  const categories = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];
  const totalLetters = (name1.length + name2.length) % categories.length;
  return categories[totalLetters] || 'Friends';
}
