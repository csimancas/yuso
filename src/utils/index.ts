export const randomColor = () => {
  const color = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${color}`;
};
