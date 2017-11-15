'use strict'

const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.all('*', (req, res, next) => {
    const url = req.url.split('?')[0]
    const params = req.method === 'GET' ? req.query : req.body
    const filePath = path.join(process.cwd(), '/mock/', url + '.js')
    if (fs.existsSync(filePath)) {
        console.log('mockup数据：' + url)
        let response
        if (require.cache[require.resolve(filePath)]) {
            delete require.cache[require.resolve(filePath)]
        }
        response = require(filePath)(params)
        res.json(response)
    } else {
        res.json({ msg: 'can not find the mock file' })
    }
})

const uri = 'http://localhost:' + config.dev.mockPort
console.log('> Mock Server Listening at ' + uri + '\n')

let server = app.listen(config.dev.mockPort)

module.exports = {
    close: () => {
        server.close()
    }
}