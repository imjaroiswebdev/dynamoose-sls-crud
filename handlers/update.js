if (!global._babelPolyfill) {
  require('babel-polyfill')
}

import { Item } from '../models/item' // eslint-disable-line
import pe from 'parse-error' // eslint-disable-line

export const updateOne = async ({ body, pathParameters: { id } }, context, callback) => {
  const [err, item] = await to(updateItem(id, body))

  if (err) {
    callback(null, handleErr(err))
  } else {
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }

    console.log(` => Item updated [${item.id}]`)
    callback(null, response)
  }
}

// Updates an item with the received data
const updateItem = (id, data) => {
  const updateData = JSON.parse(data)

  return Item.update({ id }, { ...updateData })
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
