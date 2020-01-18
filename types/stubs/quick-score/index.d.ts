declare module 'quick-score' {
  export interface QuickScoreStringResult<T> {
    item: T
    score: number
    matches: [number, number][]
  }

  type Item = { [key: string]: any }

  export interface QuickScoreResult<T extends Item> {
    item: T
    score: number
    scoreKey: keyof T
    scores: {
      [field in keyof T]: number
    }
    matches: {
      [field in keyof T]: [number, number][]
    }
  }

  type Scorer = (text: any, query: string) => number

  type Options = string[] | {
    keys?: Array<string | { name: string, scorer: Scorer }>
    scorer?: Scorer
    config?: any
    minimumScore?: number
  }

  export class QuickScore<T extends string | Item> {
    constructor(items: Array<T>, options: Options)

    search (query: string): T extends Item ? QuickScoreResult<T>[] : QuickScoreStringResult<T>[]
  }

  export function quickScore (text: string, query: string): number
}
