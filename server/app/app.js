//const utils = require('./library/utils')
const {testFunc,testValue} = require('./library/utils')
const express = require('express')
const exp = express()
const port = 3000

const userNames = []

exp.get('/test/25', function (req, res) {    
    res.send('test-25')
})

exp.get('/test', function (req, res) {    
    res.send('test')
})

exp.get('/', function (req, res) {
    let a = req.query['name']
    //let s = utils.testFunc(a)
    let s = testFunc(a)
    res.send(s)
})
  
exp.get('/add', function (req, res) {
    if(req.query['name'])userNames.push(req.query['name'])
    res.send(JSON.stringify(userNames))
})

exp.get('/names', function (req, res) {  
    res.send(JSON.stringify(userNames))
})

exp.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}) 