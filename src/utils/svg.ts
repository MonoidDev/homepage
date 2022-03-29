export const getPointPath = (...points: (readonly number[])[]) =>
  points.map((p) => `${p[0]}, ${p[1]}`).join(', ');
