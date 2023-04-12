// utility function to issue counts to correspond color
export const issueCountColorMap = (counts: number) => {
  if (counts === 0) return "green.400";
  if (counts >= 10) return "red.500";
  if (counts >= 5) return "orange.400";
  if (counts >= 1) return "yellow.100";
};
