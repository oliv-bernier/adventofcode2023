import puzzleInput from './puzzleInput'

// --- Day 1: Trebuchet?! ---
// https://adventofcode.com/2023/day/1

// ****************
// *** PART ONE ***
// ****************

const getSum: (text: string[]) => number = (text) => {
  const sum = text.reduce((accumulatedSum, currentLine) => {
    const firstDigit = currentLine
      .split('')
      .map(Number)
      .find((value) => !isNaN(value))

    const lastDigit = currentLine
      .split('')
      .reverse()
      .map(Number)
      .find((value) => !isNaN(value))

    if (firstDigit && lastDigit) {
      return accumulatedSum + (firstDigit * 10 + lastDigit)
    }

    return accumulatedSum
  }, 0)

  return sum
}

const lines = puzzleInput.split('\n')

const solutionPartOne = getSum(lines)

console.log('Solution of Part One =>', solutionPartOne)

// ****************
// *** PART TWO ***
// ****************

const numerics: { [key: string]: string } = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

const numericsReversed: { [key: string]: string } = {
  eno: '1',
  owt: '2',
  eerht: '3',
  ruof: '4',
  evif: '5',
  xis: '6',
  neves: '7',
  thgie: '8',
  enin: '9',
}

const convertTextToNumericValue: (text: string, numericValues: { [key: string]: string }) => string = (
  text,
  numericValues
) => (numericValues.hasOwnProperty(text) ? numericValues[text] : '')

const getSumEnhanced: (text: string[]) => number = (text) => {
  const sum = text.reduce((accumulatedSum, currentLine) => {
    const currentLineCleaned = currentLine.replace(/(one|two|three|four|five|six|seven|eight|nine)/gi, (match) =>
      convertTextToNumericValue(match, numerics)
    )

    const reversedLineCleaned = currentLine
      .split('')
      .reverse()
      .join('')
      .replace(/(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/gi, (match) =>
        convertTextToNumericValue(match, numericsReversed)
      )

    const firstDigit = currentLineCleaned
      .split('')
      .map(Number)
      .find((value) => !isNaN(value))

    const lastDigit = reversedLineCleaned
      .split('')
      .map(Number)
      .find((value) => !isNaN(value))

    if (firstDigit && lastDigit) {
      return accumulatedSum + (firstDigit * 10 + lastDigit)
    }

    return accumulatedSum
  }, 0)

  return sum
}

const solutionPartTwo = getSumEnhanced(lines)

console.log('Solution of Part two =>', solutionPartTwo)
