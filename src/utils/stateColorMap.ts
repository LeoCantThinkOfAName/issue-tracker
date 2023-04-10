export const stateColorMap = (state: string | undefined) => {
  if (state === "open") return "green";
  if (state === "closed") return "blackAlpha";
  return "gray";
};
