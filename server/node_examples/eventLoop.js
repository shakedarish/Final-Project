'use strict'

const fs = require('fs')

/* fs.readFile('song.txt', 'utf8', function(err, contents) {
    console.log(contents)
}) */

fs.readFile('song.txt', 'utf8', (err, contents) => {
    //if(err)console.log('error')
    setTimeout(()=>console.log(contents),5000)
})

console.log('after calling readFile')
console.log('**********************')