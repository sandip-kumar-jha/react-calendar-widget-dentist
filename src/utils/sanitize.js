export const sanitize = (text) => {
  return text.replace(/<[^>]*>?/gm, "").trim();
};