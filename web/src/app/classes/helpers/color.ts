export class Color {

  private static readonly COLORS = [
    '#eee', '#fff'
  ]

  public static random(): string {
    return Color.COLORS[Math.floor(Math.random() * (Color.COLORS.length))]
  }
}
