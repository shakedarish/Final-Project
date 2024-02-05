"use strict"

const fs = require("fs")

let array = ["song.txt", "data.txt", "aapl.txt", "top-1m.csv"]
let ar = new Array(100).fill(array).flat() // fill 100 times, then flat (2-dimensional -> 1-dimensional array)
console.log(ar.length)

const syncTest = () => {
  const startTime = +new Date() // => Number(new Date()) or (new Date()).getTime()
  const files = []

  for (let i = 0; i < ar.length; i++) {
    files.push(fs.readFileSync(ar[i]))
  }

  console.log(`Sync version: ${+new Date() - startTime}`)
}

const asyncTest = () => {
  const startTime = +new Date()
  const files = []

  for (let i = 0; i < ar.length; i++) {
    fs.readFile(ar[i], (file) => files.push(file)) // fs.readFile(fileName,[config],callback)
  }

  console.log(`Async version: ${+new Date() - startTime}`)

}

syncTest()
asyncTest()
