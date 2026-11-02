// Demo images from Unsplash (replace with real CDN/API images later)
export const unsplash = (id: string, width = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
