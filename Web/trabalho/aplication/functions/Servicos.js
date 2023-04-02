const urlServicos = "http://localhost:8080/servicos";
function validarServicos(){
    const form = document.forms[0];
    const nome = form.querySelector('input[name="nome"]');
    if(nome.value != ""){
        addServicos();
    }
    else{
        alert("Preencha os campos obrigatórios")
    }
}

function getId(){
    const url = new URL(location.href);
    return url.searchParams.get("id")
}

function getServicos(id){
    axios.get(urlServicos)
    .then(response => {
        response.data.forEach((item) => {
            const { Id_Tipo, Id_Servicos, Nome } = item;
            if(id == Id_Tipo){
                const elementoHTML = `
                    <div class="item">
                        <button class="delete" name="delete" onClick="delServicos(${Id_Servicos})" ><img class="delete" src="../image/excluir.png"></button>
                        <button class="servicos" name ="getInformacoes" onClick="window.location.href = '../get/Informacoes.html?id=${Id_Servicos}'">${Nome}</button>
                    </div>
                `;
                document.getElementById("renderResults").innerHTML += elementoHTML;
            }
        });
        const elementoHTML = `
        <button id="adicionar" name ="addServico" onClick="window.location.href ='../add/Servicos.html?id=${getId()}'"><img src="../image/adicionar.png">Adiconar Novo</button>
        `
        document.getElementById("botao").innerHTML += elementoHTML;
    })
    .catch(error => console.error(error))
}

function addServicos(){
    const nome = document.querySelector("#nome").value;
    axios.post(urlServicos, {
        idTipo: getId(),
        nome: nome
    })
    .then(response => {
        console.log(response.data)
        alert("Serviço cadastrado com sucesso!")
        document.location.reload(true)
    })
    .catch(error => console.log(error))
}

function delServicos(id){
    axios.delete(urlServicos + "/" + id)
    .then(response => {
        console.log(response.data)
        alert("Serviço excluído com sucesso!")
        document.location.reload(true)
    })
    .catch(error => console.alert(error))
}