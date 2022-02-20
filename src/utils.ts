
export function between(x: number, l: number, r: number) {
  return l <= x && x < r;
}


export function fileSizePretties(size: number): string {
  if (size === 0) {
    return "0 B";
  }

  let units = ["B", "KB", "MB", "G", "T", "PT"];
  let l = 1;
  let r = 1024;
  let rt = size;

  for (let i = 0; i < 6; i++) {
    if (between(size, l, r)) {
      return `${rt.toFixed(2)} ${units[i]}`;
    }
    l = r;
    r = r * 1024;
    rt /= 1024;
  }

  return `${rt.toFixed(2)} ${units[5]}`;
}
