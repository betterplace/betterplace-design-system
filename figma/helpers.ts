export function rgbToHex(r: number, g: number, b: number) {
  const color = '#' + ((1 << 24) + ((r * 255) << 16) + ((g * 255) << 8) + b * 255).toString(16).slice(1)

  if (color.length > 7) {
    return color.slice(0, 7)
  }
  return color
}

export function slugify(str: string) {
  return str
  // .toLowerCase()
  // .replace(/[\W_]+/g, '-')
  // .replace(/-+/g, '-')
}
