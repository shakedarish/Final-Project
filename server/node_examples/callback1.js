'use strict'

const fs = require('fs')
let ar = ['song.txt','data.txt','aapl.txt','top-1m.csv']

fs.readFile(ar[0],'utf8', (e1,f0) => {
    console.log(ar[0],f0.length)
    fs.readFile(ar[1],'utf8', (e2, f1) => {
        console.log(ar[1],f1.length)
        fs.readFile(ar[3], 'utf8',(e3, f2) => {
            console.log(ar[3],f2.length)
            fs.readFile(ar[2],'utf8', (e4, f3) => {
                console.log(ar[2],f3.length)
                console.log('end of execution')
            })  
        }) 
    })  
}) 