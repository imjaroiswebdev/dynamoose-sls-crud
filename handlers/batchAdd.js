if (!global._babelPolyfill) {
  require('babel-polyfill')
}

import { Item } from '../models/item' // eslint-disable-line
import pe from 'parse-error' // eslint-disable-line
import uuid from 'uuid/v1' // eslint-disable-line

export const batchAdd = async ({ body }, context, callback) => {
  const [err, items] = await to(Promise.all(addItems(body)))

  if (err) {
    callback(null, handleErr(err))
  } else {
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    }

    console.log(` => Items stored: ${items.length}`)
    callback(null, response)
  }
}

// Builds an array of promises for creating and saving the items
const addItems = data => {
  const itemsData = JSON.parse(data)
  if (itemsData.length && typeof itemsData !== 'string') {
    return itemsData.map(item => Item.create({
      id: uuid(),
      ...item
    }))
  } else {
    throw new Error('Type of items to add must be an array')
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
