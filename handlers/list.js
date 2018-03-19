if (!global._babelPolyfill) {
  require('babel-polyfill')
}

import { Item } from '../models/item' // eslint-disable-line
import pe from 'parse-error' // eslint-disable-line
import uuid from 'uuid/v1' // eslint-disable-line

export const listAll = async ({ body }, context, callback) => {
  const [err, items] = await to(Item.scan().exec())

  if (err) {
    callback(null, handleErr(err))
  } else {
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    }

    console.log(` => Items retreived...
    ${items}`)
    callback(null, response)
  }
}

// *** Error handling support in promises
const to = promise =>
  promise
    .then(data => [null, data])
    .catch(err => [pe(err)])

const handleErr = (error, statusCode = 500) => {
  console.error(' => ERROR:', error.stack)

  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error })
  }
}
