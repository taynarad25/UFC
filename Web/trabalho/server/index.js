const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const db = require('../db/db.js');

app.get('/tipo', async (request, response) => {
  const {} = request.query;
  const result = await db.selectTipo();
  return response.json(result);
})

app.get('/servicos', async (request, response) => {
  const {} = request.query;
  const result = await db.selectServicos();
  return response.json(result);
})

app.get('/informacoes', async (request, response) => {
  const {} = request.query;
  const result = await db.selectInformacoes();
  return response.json(result);
})

app.post('/tipo', async (request, response) => {
  const {nome} = request.body
  const novoTipo = {
    nome
  }
  await db.insertTipo(novoTipo)

  return response.status(201).json(novoTipo);
})

app.post('/servicos', async (request, response) => {
  const {idTipo, nome} = request.body
  const novoServico = {
    idTipo,
    nome
  }
  await db.insertServicos(novoServico)

  return response.status(201).json(novoServico);
})

app.post('/informacoes', async (request, response) => {
  const { idServico, nome, horario, endereco, telefone, instagram, whatsapp} = request.body
  const novoInformacoes = {
    idServico,
    nome,
    horario,
    endereco,
    telefone,
    instagram,
    whatsapp
  }
  await db.insertInformacoes(novoInformacoes)

  return response.status(201).json(novoInformacoes);
})

app.delete('/tipo/:id', async (request, response) => {
  const {id} = request.params;
  const result = await db.deleteTipo(id)
  return response.json(result)
})

app.delete('/servicos/:id', async (request, response) => {
  const {id} = request.params;
  const result = await db.deleteServicos(id)
  return response.json(result)
})

app.delete('/informacoes/:id', async (request, response) => {
  const {id} = request.params;
  const result = await db.deleteInformacoes(id)
  return response.json(result)
})

app.listen(8080,() =>{
  console.log("Servidor funcionando!!!")
})
