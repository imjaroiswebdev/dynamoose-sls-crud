if (!global._babelPolyfill) {
  require('babel-polyfill')
}

import { Item } from '../models/item' // eslint-disable-line
import pe from 'parse-error' // eslint-disable-line

export const batchAdd = async (event, context, callback) => {
  // *** Soporte para captura de errores
  const to = promise =>
  promise
    .then(data => [null, data])
    .catch(err => [pe(err)])

  const handleErr = (errData) => {
    console.error(' => ERROR:', errData.stack)
    callback(errData.stack, null)
  }

  const mockList = [
    {
      id: "1",
      name: "Item 1"
    },
    {
      id: "2",
      name: "Item 2"
    },
    {
      id: "3",
      name: "Item 3"
    }
  ]

  const response = {
    statusCode: 200,
    body: JSON.stringify(mockList)
  }

  console.log(` => event:`, event)
  callback(null, response)
}
