const photos: Record<string, string> = {
  'Dadonghai Beach': 'assets/photos/dadonghai.webp',
  'Yalong Bay Beach': 'assets/photos/yalong-bay.webp',
  'Luhuitou Scenic Area': 'assets/photos/luhuitou.webp',
  'Nanshan Cultural Tourism Zone': 'assets/photos/nanshan-guanyin.webp',
}

export function placePhoto(name: string): string | null {
  const path = photos[name]
  return path ? `${import.meta.env.BASE_URL}${path}` : null
}
