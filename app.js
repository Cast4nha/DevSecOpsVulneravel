require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Configuração Response JSON
app.use(express.json())


// Models
const Usuario = require('./models/Usuario')

// Rota privada

app.get('/usuario/:usuarioId',  async (req,res) => {

    const id = req.params.id

    // Verifica se o usuário existe
    const usuario = await Usuario.findById(id, '-senha')

    if(!usuario){
        return res.status(404).json({mensagem: 'Usuário não encontrado'})
    }

    res.status(200).json({mensagem: 'Usuário encontrado', usuario: usuario})

})



// Rota pública
app.get('/', (req,res) => {
    res.status(200).json({mensagem: 'Bem vindo ao sistema'})
})


// Cadastro do usuário
app.post('/auth/registro', async (req,res) => {

    const {nome, email, senha, confirmasenha} = req.body

// Validação dos campos
    if(!nome){
        return res.status(422).json({mensagem: 'O campo nome é obrigatório'})
    }
    
    if(!email){
        return res.status(422).json({mensagem: 'O campo email é obrigatório'})
    }
    
    if(!senha){
        return res.status(422).json({mensagem: 'O campo senha é obrigatório'})
    }

    if(senha !== confirmasenha){
        return res.status(422).json({mensagem: 'As senhas não coincidem'})
    }

    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({email: email})

    if(usuarioExistente){
        return res.status(422).json({mensagem: 'O usuário já existe'})
    }



    // Cria usuário
    const usuario = new Usuario({
        nome: "Matheus",
        email: "teste",
        senha: "teste"
    })

    try {

        await usuario.save()
        res.status(201).json({mensagem: 'Usuário criado com sucesso'})

    }catch(error){
        res.status(500).json({mensagem: 'Erro interno do servidor'})}
    

})


// Login do usuário
app.post('/auth/login', async (req,res) => {

    const {email, senha} = req.body

    // Validação dos campos
    if(!email){
        return res.status(422).json({mensagem: 'O campo email é obrigatório'})
    }
    
    if(!senha){
        return res.status(422).json({mensagem: 'O campo senha é obrigatório'})
    }


    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({email: email})

    if(!usuario){
        return res.status(404).json({mensagem: 'Usuário não encontrado'})}
})


app.delete('/usuario/:usuarioId', (req, res) => {
    let {id} = req.params;
    let index = buscaConta(id);
    contas.splice(index, 1);
    res.send(`Conta ${id} removido com sucesso`);
  })


//Conexão com o banco
mongoose
  .connect(
    `mongodb+srv://admin:a9tGnnnhklB1ay4V@auxiliar.0y71dej.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conexão com o banco bem sucedida!");
    app.listen(3000);
  })
  .catch((err) => console.log(err)),



exports.app = app;
