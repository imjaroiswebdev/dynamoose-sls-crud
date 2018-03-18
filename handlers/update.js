if (!global._babelPolyfill) {
  require('babel-polyfill')
}

import { Item } from '../models/item' // eslint-disable-line
import pe from 'parse-error' // eslint-disable-line

export const updateOne = async ({ body, pathParameters: { id } }, context, callback) => {
  // *** Error handling support in promises
  const handleErr = (errData, statusCode = 500) => {
    console.error(' => ERROR:', errData.stack)
    const errorResponse = {
      error: errData.stack,
      statusCode
    }

    callback(errorResponse, null)
  }

  const [err, item] = await to(updateItem(id, body))
  if (err) {
    handleErr(err)
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

const to = promise =>
  promise
    .then(data => [null, data])
    .catch(err => [pe(err)])

const updateItem = (id, data) => {
  const updateData = JSON.parse(data)

  return Item.update({ id }, { ...updateData })
}
