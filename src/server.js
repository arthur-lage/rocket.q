const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true}))

app.use(express.static("public"))

app.use(routes)

app.listen(3000, () => console.log(`Rodando o servidor na porta 3000,
http://localhost:3000`))