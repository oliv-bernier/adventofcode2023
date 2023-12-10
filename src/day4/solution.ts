import puzzleInput from './puzzleInput'

// --- Day 4: Scratchcards ---
// https://adventofcode.com/2023/day/4

// ****************
// *** PART ONE ***
// ****************

const EXTRACT_NUMBERS_REGEX = /\d+/g

interface Scratchcard {
  id: number
  winingNumbers: number[]
  obtainedNumbers: number[]
  copy?: boolean
}

const getScratchcards = (cardString: string[]): Scratchcard[] =>
  cardString.map((card, i) => {
    const prefix = 'Card '

    const cardNumber = parseInt(card.split(':')[0].slice(prefix.length).trim(), 10)

    const numbersStrings = card.split(':')[1].split('|')

    const winingNumbers = numbersStrings[0].match(EXTRACT_NUMBERS_REGEX)?.map(Number) || []
    const obtainedNumbers = numbersStrings[1].match(EXTRACT_NUMBERS_REGEX)?.map(Number) || []

    return {
      id: cardNumber,
      winingNumbers,
      obtainedNumbers,
    }
  })

const findWiningNumbers = (winingNumbers: number[], obtainedNumbers: number[]) =>
  winingNumbers.filter((number) => obtainedNumbers.includes(number))

const getPoints = (winingNumbers: number[]) => {
  if (!winingNumbers.length) {
    return 0
  }

  if (winingNumbers.length === 1) {
    return 1
  }

  winingNumbers.shift()

  return winingNumbers.reduce((acc) => acc * 2, 1)
}

const getCardsPoints = (cards: string[]) => {
  const scratchcards = getScratchcards(cards)

  const allWiningNumbers = scratchcards.map((scratchcard) =>
    findWiningNumbers(scratchcard.winingNumbers, scratchcard.obtainedNumbers)
  )

  const cardsPoints = allWiningNumbers.map((winingNumbers) => getPoints(winingNumbers))

  return cardsPoints
}

const cardsPoints = getCardsPoints(puzzleInput.split('\n'))

const partOneSolution = cardsPoints.reduce((acc, cardPoints) => acc + cardPoints, 0)

console.log('Solution of Part one =>', partOneSolution)

// ****************
// *** PART TWO ***
// ****************

const generateCopies = (scratchcards: Scratchcard[], cardsToCopy: Scratchcard[]) => {
  let copies: Scratchcard[] = []

  cardsToCopy.forEach((card) => {
    const copyWiningNumbers = findWiningNumbers(card.winingNumbers, card.obtainedNumbers)
    const foundCopies: Scratchcard[] = scratchcards.slice(card.id, card.id + copyWiningNumbers.length)

    copies.push(...foundCopies)
  })

  return copies
}

const getCardsPlusCopiesLength = (cards: string[]): number => {
  const scratchcards = getScratchcards(cards)

  const cardsPlusCopies = scratchcards.reduce((acc, scratchcard, index) => {
    const winingNumbers = findWiningNumbers(scratchcard.winingNumbers, scratchcard.obtainedNumbers)

    const cardsToCopy = scratchcards.slice(scratchcard.id, scratchcard.id + winingNumbers.length)

    acc += cardsToCopy.length

    let copies = generateCopies(scratchcards, cardsToCopy)

    while (copies.length > 0) {
      acc += copies.length
      copies = generateCopies(scratchcards, copies)
    }

    return acc
  }, scratchcards.length)

  return cardsPlusCopies
}

const totalScratchcards = getCardsPlusCopiesLength(puzzleInput.split('\n'))

console.log('Solution of Part two =>', totalScratchcards)
