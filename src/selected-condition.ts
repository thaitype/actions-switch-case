import { stripIndent } from 'common-tags'

interface ISelection {
  conditions: string
  defaultString: string
  parseCondition: () => string
}

export default class Selection implements ISelection {
  private _regex = /true\s*=>\s*([\s\S]*?)(?=(true|false)\s*=>|$)/g
  private matchString: string | undefined
  constructor(
    public conditions: string,
    public defaultString: string
  ) {}

  private _extract(): void {
    const match = this._regex.exec(this.conditions)
    this.matchString = match?.[1]
  }

  private _validate(): void {
    this._extract()
    const match = this.matchString
    if (!this.defaultString) {
      throw new Error('No default string provided')
    }
  }

  public parseCondition(): string {
    this._validate()
    const returnValue = this.matchString || this.defaultString
    return stripIndent`${returnValue}`
  }
}
