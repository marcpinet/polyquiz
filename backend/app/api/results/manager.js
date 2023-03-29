const { Result } = require('../../models')
const logger = require('../../utils/logger.js')

const buildResult = (resultId) => {
  const result = Result.getById(resultId)
  return { result }
}

/**
 * Function buildResultzes.
 * This function aggregates the questions and answers from the database to build entire resultzes.
 */
const buildResults = () => {
  const results = Result.get()
  return results.map((result) => buildResult(result.id))
}

module.exports = {
  buildResults
}
