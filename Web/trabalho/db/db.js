async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:123456@localhost:3306/DB_SERVICOS");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function selectTipo(){
    const conn = await connect();
    const [rows] = await conn.query('select * from  Tipo;');
    return rows;
}

async function selectServicos(){
    const conn = await connect();
    const [rows] = await conn.query('select * from  Servicos;');
    return rows;
}

async function selectInformacoes(){
    const conn = await connect();
    const [rows] = await conn.query('select * from  Informacoes;');
    return rows;
}

async function insertTipo(tipo){
    const conn = await connect();
    const sql = 'INSERT INTO TIPO(Nome) VALUE (?);';
    const values = [tipo.nome];
    return await conn.query(sql, values);
}

async function insertServicos(servico){
    const conn = await connect();
    const sql = 'INSERT INTO Servicos(Id_Tipo, Nome) VALUE (?, ?);';
    const values = [servico.idTipo, servico.nome]
    return await conn.query(sql, values);
}

async function insertInformacoes(informacoes){
    const conn = await connect();
    const sql = 'INSERT INTO Informacoes(Id_Servicos, Nome, Horario, Endereco, Telefone, Instagram, Whatsapp) VALUE (?, ?, ?, ?, ?, ?, ?);';
    const values = [informacoes.idServico, informacoes.nome, informacoes.horario, informacoes.endereco, informacoes.telefone, informacoes.instagram, informacoes.whatsapp]
    return await conn.query(sql, values);
}

async function deleteTipo(idTipo){
    const conn = await connect();
    const sql = 'DELETE FROM Tipo where Id_Tipo = (?)';
    return await conn.query(sql, [idTipo]);
}

async function deleteServicos(idServicos){
    const conn = await connect();
    const sql = 'DELETE FROM Servicos where Id_Servicos = (?)';
    return await conn.query(sql, [idServicos]);
}

async function deleteInformacoes(idInformacoes){
    const conn = await connect();
    const sql = 'DELETE FROM Informacoes where Id_Informacoes = (?)';
    return await conn.query(sql, [idInformacoes]);
}

module.exports = {selectTipo, selectServicos, selectInformacoes, insertTipo, insertServicos, insertInformacoes, deleteTipo, deleteServicos, deleteInformacoes}