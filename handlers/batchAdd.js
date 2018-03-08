if (!global._babelPolyfill) {
  require('babel-polyfill')
}

import { Item } from '../models/item' // eslint-disable-line
import pe from 'parse-error' // eslint-disable-line
import uuid from 'uuid/v1' // eslint-disable-line

export const batchAdd = async ({ body }, context, callback) => {
  // *** Error handling support in promises
  const handleErr = (errData) => {
    console.error(' => ERROR:', errData.stack)
    callback(errData.stack, null)
  }

  const [err, items] = await to(Promise.all(addItems(body)))
  if (err) {
    handleErr(err)
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

const to = promise =>
  promise
    .then(data => [null, data])
    .catch(err => [pe(err)])

const addItems = data => {
  const itemsData = JSON.parse(data)
  if (itemsData.length && typeof itemsData.length !== 'string') {
    return itemsData.map(item => Item.create(item))
  } else {
    throw new Error('Type of items to add must be an array')
  }
}
