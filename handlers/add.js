if (!global._babelPolyfill) {
  require('babel-polyfill')
}

import { Item } from '../models/item' // eslint-disable-line
import pe from 'parse-error' // eslint-disable-line
import uuid from 'uuid/v1' // eslint-disable-line

export const addOne = async ({ body }, context, callback) => {
  const [err, item] = await to(addItem(body))

  if (err) {
    callback(null, handleErr(err))
  } else {
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }

    console.log(` => Item stored [${item.id}]`)
    callback(null, response)
  }
}

// Creates and saves one item based in the Item model
const addItem = data => {
  const itemData = JSON.parse(data)
  return Item.create({
    id: uuid(),
    ...itemData
  })
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
