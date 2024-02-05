"use strict"

const fs = require("fs").promises
let ar = ["song.txt", "data.txt", "top-1m.csv", "aapl.txt"]

const read = async (file) => {
  const data = await fs.readFile(file, "utf8")
  console.log(file, data.length)
}

for (let i = 0; i < ar.length; i++) read(ar[i])

const all = async () => {
  for (let i = 0; i < ar.length; i++) {
    await read(ar[i])
  }
}

const all1 = async ()=>{
    await all()
}
all1()
console.log("end")


fs.readFile(file1, "utf8",c1)
fs.readFile(file2, "utf8",c2)
fs.readFile(file3, "utf8",c3)

///// alternative /////
/* read(ar[0])
read(ar[1])
read(ar[2])
read(ar[3]) */
