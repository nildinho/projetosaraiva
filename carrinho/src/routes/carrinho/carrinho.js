const express = require("express")
const router_carrinho = express.Router()
const data = require("../../database/config.js")

router_carrinho.get("/listar", (req, res) => {
    data.query("select foto.foto1,titulo.nometitulo,titulo.autor,carrinho.quantidade,preco.precoatual,titulo.idtitulo,carrinho.total from saraivalivrodb.fotos foto inner join saraivalivrodb.titulos titulo on foto.idfotos=titulo.idfoto inner join saraivacarrinhodb.carrinho carrinho on titulo.idtitulo=carrinho.idproduto inner join saraivalivrodb.precos preco on preco.idpreco = titulo.idpreco;",(error, dados)=> {
        if(error) {
           res.status(500).send({msg: "Erro ao carregar os dados"+error})
        }
            res.status(200).send({msg: "Ok", payload:dados})
    })
})

router_carrinho.get("/listar/:id", (req, res) => {
    data.query("select foto.foto1,titulo.nometitulo,titulo.autor,carrinho.quantidade,preco.precoatual,titulo.idtitulo,carrinho.total from saraivalivrodb.fotos foto inner join saraivalivrodb.titulos titulo on foto.idfotos=titulo.idfoto inner join saraivacarrinhodb.carrinho carrinho on titulo.idtitulo=carrinho.idproduto inner join saraivalivrodb.precos preco on preco.idpreco = titulo.idpreco where carrinho.idusuario=1;",req.params.id, (error, dados) => {
        if(error) {
            res.status(500).send({msg: "Erro ao carregar os dados"+error})
        }
            res.status(200).send({msg: "Ok", payload:dados})
    })
})

router_carrinho.post("/inserir", (req, res) => {
    const dados = req.body
    data.query("insert into carrinho set ?", [dados], (error, dados) => {
        if(error) {
            res.status(500).send({msg: "Erro ao colocar no carrinho"})
        } else {
            res.status(200).send({msg: "Ok", payload:dados})
        }
    })
})


module.exports = router_carrinho