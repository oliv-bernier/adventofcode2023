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

const EXTRACT_ASTERISK_REGEX = /\*/g

const browseRightForNumber = (input: string, startIndex: number, lineIndex: number) => {
  const match = input.slice(startIndex).match(EXTRACT_NUMBERS_REGEX)
  return match ? match[0] : ''
}

const browseLeftForNumber = (input: string, startIndex: number) => {
  let endIndex = startIndex

  while (endIndex >= 0 && /\d/.test(input[endIndex])) {
    endIndex--
  }

  return input.slice(endIndex + 1, startIndex + 1)
}

const getWholeNumber = (input: string, startIndex: number, lineIndex: number): number => {
  const rightResult = browseRightForNumber(input, startIndex, lineIndex)
  const leftResult = browseLeftForNumber(input, startIndex)

  const number = leftResult + rightResult.slice(1)

  return parseInt(number, 10)
}

const extractNumbersStartIndex = (input: string, lineIndex: number) => {
  const indexes = []
  let match

  while ((match = EXTRACT_NUMBERS_REGEX.exec(input)) !== null) {
    indexes.push(match.index)
  }

  return indexes
}

const getGearRatios = (engineSchematic: string[]): number[] => {
  const gearRatios: number[] = []

  engineSchematic.forEach((line, lineIndex) => {
    let match: RegExpExecArray | null

    while ((match = EXTRACT_ASTERISK_REGEX.exec(line)) !== null) {
      const startIndex = match.index - 1
      const endIndex = match.index + 1

      const previousLine = engineSchematic[lineIndex - 1]
      const nextLine = engineSchematic[lineIndex + 1]

      const leftNumber = /\d+/.test(line[startIndex]) ? browseLeftForNumber(line, startIndex) : null
      const rightNumber = /\d+/.test(line[endIndex]) ? browseRightForNumber(line, match.index, lineIndex) : null

      const numbersAboveStartIndexes = previousLine
        ? extractNumbersStartIndex(previousLine.substring(startIndex, match.index + 2), lineIndex)
        : []
      const numbersBelowStartIndexes = nextLine
        ? extractNumbersStartIndex(nextLine.substring(startIndex, match.index + 2), lineIndex)
        : []

      const numbersAbove: number[] = []
      const numbersBelow: number[] = []

      numbersAboveStartIndexes.forEach((numbersAboveIndex) => {
        const numberAbove = getWholeNumber(previousLine, startIndex + numbersAboveIndex, lineIndex)

        numbersAbove.push(numberAbove)
      })

      numbersBelowStartIndexes.forEach((numbersBelowIndex) => {
        const numberBelow = getWholeNumber(nextLine, startIndex + numbersBelowIndex, lineIndex)

        numbersBelow.push(numberBelow)
      })

      const foundPartNumbers: number[] = []

      if (leftNumber) {
        foundPartNumbers.push(parseInt(leftNumber, 10))
      }

      if (rightNumber) {
        foundPartNumbers.push(parseInt(rightNumber, 10))
      }

      if (numbersAbove.length > 0) {
        foundPartNumbers.push(...numbersAbove)
      }

      if (numbersBelow.length > 0) {
        foundPartNumbers.push(...numbersBelow)
      }

      if (foundPartNumbers.length === 2) {
        const gearRatio = foundPartNumbers[0] * foundPartNumbers[1]

        gearRatios.push(gearRatio)
      }
    }
  })

  return gearRatios
}

const gearRatios = getGearRatios(puzzleInput.split('\n'))

const partTwoSolution = gearRatios.reduce((acc, gearRatio) => acc + gearRatio, 0)

console.log('Solution of Part two =>', partTwoSolution)
