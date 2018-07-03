declare var markdown

export class Markdown {

  public static toHTML(text: string): string {
    return markdown.toHTML(text)
  }
}
