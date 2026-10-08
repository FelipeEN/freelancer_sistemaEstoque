const express = require('express')

const {criarProduto,atulizarProduto,listarProdutos,deletar} = require("../controller/estoque.controller")

const router = express.Router()

router.post("/", criarProduto)
router.put("/:id", atulizarProduto)
router.get("/", listarProdutos)
router.delete("/:id",deletar )


module.exports = router