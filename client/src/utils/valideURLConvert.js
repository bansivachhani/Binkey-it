export const valideURLConvert = (name) => {
  try {
    return name?.toString().replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-") || "unknown";
  } catch {
    return "unknown";
  }
};
