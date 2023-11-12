export function random(min: number, max: number) : number {
  return Math.round(Math.random() * (max - min) + min)
}

export function random250() : number {
  return random(0, 255)
}

export function randomColor() : string {
  return `rgb(${random250()},${random(0, 100)},${random(0, 120)})`
}

export function pick<T>(arr: T[]): T {
  return arr[random(0, arr.length - 1)]
}