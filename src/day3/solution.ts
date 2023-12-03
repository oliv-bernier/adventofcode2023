import puzzleInput from './puzzleInput'

// --- Day 3: Gear Ratios ---
// https://adventofcode.com/2023/day/3

// ****************
// *** PART ONE ***
// ****************

const EXTRACT_NUMBERS_REGEX = /\d+/g
const EXTRACT_NON_DOT_OR_NUMBER_REGEX = /[^.\d\n]+/g
const SYMBOLS = [...new Set(puzzleInput.match(EXTRACT_NON_DOT_OR_NUMBER_REGEX))]

const isSymbol = (char: string) => SYMBOLS.includes(char)

const findSymbol = (line: string, startIndex: number, endIndex: number) =>
  line ? SYMBOLS.some((symbol) => line.substring(startIndex, endIndex).includes(symbol)) : false

const getPartNumbers = (engineSchematic: string[]): number[] => {
  const partNumbers: number[] = []

  engineSchematic.forEach((line, lineIndex) => {
    let match: RegExpExecArray | null

    while ((match = EXTRACT_NUMBERS_REGEX.exec(line)) !== null) {
      const currentNumber = match[0]

      const startIndex = match.index - 1
      const endIndex = startIndex + currentNumber.length

      const previousLine = engineSchematic[lineIndex - 1]
      const nextLine = engineSchematic[lineIndex + 1]

      const isSymbolAtLeft = isSymbol(line.charAt(startIndex))
      const isSymbolAtRight = isSymbol(line.charAt(endIndex + 1))
      const isSymbolAbove = findSymbol(previousLine, startIndex, endIndex + 2)
      const isSymbolBelow = findSymbol(nextLine, startIndex, endIndex + 2)

      if (isSymbolAtLeft || isSymbolAtRight || isSymbolAbove || isSymbolBelow) {
        partNumbers.push(parseInt(currentNumber, 10))
      }
    }
  })

  return partNumbers
}

const partNumbers = getPartNumbers(puzzleInput.split('\n'))

const partOneSolution = partNumbers.reduce((acc, partNumber) => acc + partNumber, 0)

console.log('Solution of Part one =>', partOneSolution)

// ****************
// *** PART TWO ***
// ****************
