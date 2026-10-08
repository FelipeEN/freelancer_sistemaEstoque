const express = require('express')
const cors = require('cors')
const app = express()

const estoqueRoute = require("./routes/estoque.route")

const pool = require('./database/database')
const { Connection } = require('mysql2')



app.use(cors())
app.use(express.json())

app.use('/estoque', estoqueRoute)


pool.getConnection().then((connection)=>{
    console.log("API conectada com o banco de dados")
}).catch((error)=>{
    console.log("Erro ao conectar com o bando de dados")
    console.log(error.message)
})

const PORT = process.env.PORT || 3333

app.listen(PORT, ()=>{
    console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`)
})