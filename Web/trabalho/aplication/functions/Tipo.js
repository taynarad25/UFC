const urlTipo = "http://localhost:8080/tipo";
function validarTipo(){
    const form = document.forms[0];
    const nome = form.querySelector('input[name="nome"]');
    if(nome.value != ""){
        addTipo();
    }
    else{
        alert("Preencha os campos obrigatórios")
    }
}

function getTipo(){
    axios.get(urlTipo)
    .then(response => {
        response.data.forEach((item) => {
            const { Id_Tipo, Nome } = item;
            const elementoHTML = `
                <div class="item">
                    <button class="delete" name="delete" onClick="delTipo(${Id_Tipo})" ><img class="delete" src="../image/excluir.png"></button>
                    <button class="tipo" name ="getServicos" onClick="window.location.href = '../get/Servicos.html?id=${Id_Tipo}'">${Nome}</button>
                </div>
            `;
            document.getElementById("renderResults").innerHTML += elementoHTML;
        });
    })
    .catch(error => console.error(error))
}

function addTipo(){
    const nome = document.querySelector("#nome").value;
    axios.post(urlTipo, {
        nome: nome
    })
    .then(response => {
        console.log(response.data)
        alert("Tipo cadastrado com sucesso!")
        document.location.reload(true)
    })
    .catch(error => console.log(error))
}

function delTipo(id){
    axios.delete(urlTipo + "/" + id)
    .then(response => {
        console.log(response.data)
        alert("Tipo excluído com sucesso!")
        document.location.reload(true)
    })
    .catch(error => console.alert(error))
}