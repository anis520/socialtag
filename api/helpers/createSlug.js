export const CreateSlug = (title) => {
  // remove non-aplphanumeric characters and convert to lowercase

  const cleanedTitle = title.trim().replace(/^\w\s/gi, "").toLowerCase();

  // replace spaces  with hyphens
  const slug = cleanedTitle.replace(/\s+/g, "-");

  return slug;
};
