if (!global._babelPolyfill) {
  require('babel-polyfill')
}

import { Item } from '../models/item' // eslint-disable-line
import pe from 'parse-error' // eslint-disable-line

export const deleteOne = async ({ pathParameters: { id } }, context, callback) => {
  // *** Error handling support in promises
  const handleErr = (errData, statusCode = 500) => {
    console.error(' => ERROR:', errData.stack)
    const errorResponse = {
      error: errData.stack,
      statusCode
    }

    callback(errorResponse, null)
  }

  const [err, item] = await to(Item.delete({ id }))
  if (err) {
    handleErr(err)
  } else {
    const response = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'item deleted'
      })
    }

    console.log(` => Item [${item.id}] was deleted`)
    callback(null, response)
  }
}

const to = promise =>
  promise
    .then(data => [null, data])
    .catch(err => [pe(err)])
