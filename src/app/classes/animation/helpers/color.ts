export class Color {

  private static readonly COLORS = [
    '#292929', '#0b0b0b'
  ]

  public static random(): string {
    return Color.COLORS[Math.floor(Math.random() * (Color.COLORS.length))]
  }
}
