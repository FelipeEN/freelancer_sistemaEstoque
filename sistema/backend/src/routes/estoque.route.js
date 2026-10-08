const express = require('express')

const {criarProduto} = require("../controller/estoque.controller")

const router = express.Router()

router.post("/", criarProduto)


module.exports = router