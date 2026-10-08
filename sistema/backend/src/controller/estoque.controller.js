const pool = require('../database/database')


async function criarProduto(req,res){
    try{
        const {nome,quantidade,topico} = req.body

        if(!nome || !quantidade || !topico){
            return res.status(400).json({
                mensagem: "Preencha todos os campos"
            })
        }

        if(
            nome.trim() === ""
            || quantidade === null||
            quantidade === undefined 
            || topico.trim() === ""){
            return res.status(400).json({
                mensagem : "Preencha todos os campos"
            })
        }

        const [resultado] = await pool.execute(`
            INSERT INTO estoque (nome_produto,quantidade_produto,topico)VALUES(?,?,?)    
            
            `,
            [nome,quantidade,topico]
        )

        res.status(200).json({
            id:resultado.insertId,
            nome,
            quantidade,
            topico

        })

    }catch(error){
        res.status(500).json({
            mensagem : "erro ao criar produto"
        })
    }
}

async function atulizarProduto(req,res){
    try{
        const{id}=req.params
        const {nome,quantidade,topico} =req.body


        if (!nome || !topico){
            return res.status(400).json({
                mensagem : "preencha os campos que queira atualizar"
            })
        }
        if(nome.trim() === "" ||
        quantidade === undefined ||
        quantidade ===null||
        topico.trim() === "" ){
            return res.status(400).json({
                mensagem :"preencha os campos que queira atualizar"
            })
        }

        const [resultado] = await pool.execute(`
                UPDATE estoque
                SET nome_produto = ?,quantidade_produto = ?, topico= ?
                WHERE id = ?
            ` , 
            [nome,quantidade,topico,id]
        )

        if(resultado.affectedRows === 0 ){
            res.status(400).json({
                mensagem : "Produto não encontrado!"
            })
        }

        res.status(200).json({
                mensagem : "Produto atualizado!",
                produto : {
                    id,
                    nome,
                    quantidade,
                    topico
                }
            })

    }catch(error){
        console.log(error)
        res.status(500).json({
            mensagem : "erro ao atualizar o produto"
        })
    }
}

async function listarProdutos (req,res){
    try{
        const [resultado] = await pool.execute(
            `
            SELECT
                id,
                nome_produto,
                quantidade_produto,
                topico
            FROM estoque
                `
        ) 

        if(resultado.length === 0 ){
            return res.status(404).json({
                mensagem : "Nenhum produto encontrado no banco de dados!"
            })
        }

        res.status(200).json({
            mensagem : "Produtos no estoque:",
            produtos : resultado
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            mensagem : "erro ao listar o produto"
        })
    }
}

async function deletar(req,res){
    try{
        const {id} = req.params

        const [resultado] = await pool.execute(`
            DELETE FROM estoque
            WHERE id = ?
            `,[id]
        )
         
        if(resultado.affectedRows === 0 ){
            return res.status(404).json({
                mensagem : "Produto não encontrado!"
            })
        }   


        res.status(200).json({
            mensagem : "Produto deletado",
   
        })
    }catch(error){
        console.log(error)

        res.status(500).json({
            mensagem : "erro ao deletar produto"
        })
    }
}
module.exports= {
    criarProduto,
    atulizarProduto,
    listarProdutos,
    deletar
}
