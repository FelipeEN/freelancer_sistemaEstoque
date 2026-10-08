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
            || quantidade.trim() === "" 
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

module.exports= {
    criarProduto
}
