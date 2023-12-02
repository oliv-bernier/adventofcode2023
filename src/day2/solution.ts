import puzzleInput from './puzzleInput'

// --- Day 2: Cube Conundrum ---
// https://adventofcode.com/2023/day/2

// ****************
// *** PART ONE ***
// ****************

const RED_CUBES_NUMBER = 12
const GREEN_CUBES_NUMBER = 13
const BLUE_CUBES_NUMBER = 14

const EXTRACT_RED_BATCH_REGEX = /(\d+)\s*red/gi
const EXTRACT_BLUE_BATCH_REGEX = /(\d+)\s*blue/gi
const EXTRACT_GREEN_BATCH_REGEX = /(\d+)\s*green/gi

const findCubesAllowed = (cubes?: number[], max?: number) =>
  cubes && max ? !cubes.find((cubeNumber) => cubeNumber > max) : false

const getAllowedGames = (games: string[]): number[] => {
  return games.reduce((accumulatedGames: number[], line) => {
    const gameNumber = parseInt(line.split(' ')[1], 10)

    const redBatches = line.match(EXTRACT_RED_BATCH_REGEX)
    const greenBatches = line.match(EXTRACT_GREEN_BATCH_REGEX)
    const blueBatches = line.match(EXTRACT_BLUE_BATCH_REGEX)

    const redCubesNumbers = redBatches?.map((batch) => parseInt(batch.split(' ')[0], 10))
    const greenCubesNumbers = greenBatches?.map((batch) => parseInt(batch.split(' ')[0], 10))
    const blueCubesNumbers = blueBatches?.map((batch) => parseInt(batch.split(' ')[0], 10))

    const isRedCubesAllowed = findCubesAllowed(redCubesNumbers, RED_CUBES_NUMBER)
    const isGreenCubesAllowed = findCubesAllowed(greenCubesNumbers, GREEN_CUBES_NUMBER)
    const isBlueCubesAllowed = findCubesAllowed(blueCubesNumbers, BLUE_CUBES_NUMBER)

    if (isRedCubesAllowed && isGreenCubesAllowed && isBlueCubesAllowed) {
      return [...accumulatedGames, gameNumber]
    }

    return accumulatedGames
  }, [])
}

const allowedGames = getAllowedGames(puzzleInput.split('\n'))

const partOneSolution = allowedGames.reduce((acc, currentGame) => acc + currentGame, 0)

console.log('Solution of Part one =>', partOneSolution)

// ****************
// *** PART TWO ***
// ****************

const getGamesPower = (games: string[]): number[] => {
  return games.map((game) => {
    const redBatches = game.match(EXTRACT_RED_BATCH_REGEX)
    const greenBatches = game.match(EXTRACT_GREEN_BATCH_REGEX)
    const blueBatches = game.match(EXTRACT_BLUE_BATCH_REGEX)

    const redCubesNumbers = redBatches?.map((batch) => parseInt(batch.split(' ')[0], 10))
    const greenCubesNumbers = greenBatches?.map((batch) => parseInt(batch.split(' ')[0], 10))
    const blueCubesNumbers = blueBatches?.map((batch) => parseInt(batch.split(' ')[0], 10))

    const redMinToPlay = Math.max(...(redCubesNumbers || []))
    const greenMinToPlay = Math.max(...(greenCubesNumbers || []))
    const blueMinToPlay = Math.max(...(blueCubesNumbers || []))

    const power = redMinToPlay * greenMinToPlay * blueMinToPlay

    return power
  }, [])
}

const powers = getGamesPower(puzzleInput.split('\n'))

const partTwoSolution = powers.reduce((acc, currentPower) => acc + currentPower, 0)

console.log('Solution of Part two =>', partTwoSolution)
