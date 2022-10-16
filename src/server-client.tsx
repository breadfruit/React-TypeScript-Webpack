import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
// import clientMainfest from '../dist/manifest-client.json'

const clientMainfest = require('../build/manifest-client.json')


const server = express()

server.get('/', (req, res) => {

    const html = renderToString(<App />)
    const clientCss = clientMainfest['main.css']
    const clientBundle = clientMainfest['main.js']

    res.send(`
    <!DOCTYPE html>
    <html>
        <head>
          <title>React SSR Example</title>
          <link rel="stylesheet" href="${clientCss}"></link>
        </head>
        <body>
          <!-- 注入组件运行结果 -->
          <div id="app">${html}</div>
          <!-- 注入客户端代码产物路径 -->
          <!-- 实现 Hydrate 效果 -->
          <script src="${clientBundle}"></script>
        </body>
    </html>
    `)

})

server.use(express.static('../build'))
server.listen(3000, () => {
    console.log('server is ready: http://localhost:3000')
})