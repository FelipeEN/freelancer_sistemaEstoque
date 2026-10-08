const express = require('express')

const {criarProduto} = require("../controller/estoque.controller")

const router = express.Router()

router.post("/estoque", criarProduto)


module.exports = router