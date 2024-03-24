const getPositionInArray = (index: number, arrayLength: number) => {
  if (index === 0) return "first";
  if (index === arrayLength - 1) return "last";
  return "middle";
};

export { getPositionInArray };
