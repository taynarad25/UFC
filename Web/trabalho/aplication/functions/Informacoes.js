const urlInformacoes = "http://localhost:8080/informacoes";
function validarInformacoes(){
    const form = document.forms[0];
    const nome = form.querySelector('input[name="nome"]');
    if(nome.value != ""){
        addInformacoes();
    }
    else{
        alert("Preencha os campos obrigatórios")
    }
}

function getId(){
    const url = new URL(location.href);
    return url.searchParams.get("id")
}
function getclick(id){
    axios.get(urlInformacoes)
    .then(response => {
        response.data.forEach((item) => {
            const { Id_Informacoes, Nome, Horario, Endereco, Telefone, Instagram, Whatsapp } = item;
            if(id == Id_Informacoes){
                const elementoHTML = `
                    <div id="separar"></div>
                        <p class="inf">${Nome}</p>
                    `
                    document.getElementById("renderResults").innerHTML += elementoHTML;
                if(Horario != null){
                    const elementoHTML = `
                        <p class="inf">${Horario}</p>
                    `
                    document.getElementById("renderResults").innerHTML += elementoHTML;
                }
                if(Endereco != null){
                    const elementoHTML = `
                        <p class="inf">${Endereco}</p>
                    `
                    document.getElementById("renderResults").innerHTML += elementoHTML;
                }
                if(Telefone != null){
                    const elementoHTML = `
                        <p class="inf">${Telefone}</p>
                    `
                    document.getElementById("renderResults").innerHTML += elementoHTML;
                }
                if(Instagram != null){
                    const elementoHTML = `
                        <p class="inf">${Instagram}</p>
                    `
                    document.getElementById("renderResults").innerHTML += elementoHTML;
                }
                if(Whatsapp != null){
                    const elementoHTML = `
                        <p class="inf">${Whatsapp}</p>
                    `
                    document.getElementById("renderResults").innerHTML += elementoHTML;
                }
            }
        });
    })
}

function getInformacoes(id){
    axios.get(urlInformacoes)
    .then(response => {
        response.data.forEach((item) => {
            const { Id_Servicos, Id_Informacoes, Nome } = item;
            if(id == Id_Servicos){
                const elementoHTML = `
                    <div class="item">
                        <button class="delete" name="delete" onClick="delInformacoes(${Id_Informacoes})"><img class="delete" src="../image/excluir.png"></button>
                        <button class="informacoes" name="informacoes" onClick="getclick(${Id_Informacoes})">${Nome}</button>
                    </div>
                `;
                document.getElementById("renderResults").innerHTML += elementoHTML;
            }
        });
        const elementoHTML = `
            <button id="adicionar" name ="addInformacoes" onClick="window.location.href ='../add/Informacoes.html?id=${getId()}'"><img src="../image/adicionar.png">Adiconar Novo</button>
        `
        document.getElementById("botao").innerHTML += elementoHTML;
    })
    .catch(error => console.error(error))
}

function addInformacoes(){
    const nome = document.querySelector("#nome").value;
    const horario = document.querySelector("#horario").value;
    const endereco = document.querySelector("#endereco").value;
    const telefone = document.querySelector("#telefone").value;
    const instagram = document.querySelector("#instagram").value;
    const whatsapp = document.querySelector("#whatsapp").value;
    axios.post(urlInformacoes, {
        idServico: getId(),
        nome: nome,
        horario: horario,
        endereco: endereco,
        telefone: telefone,
        instagram: instagram,
        whatsapp: whatsapp
    })
    .then(response => {
        console.log(response.data)
        alert("Informações do serviço cadastradas com sucesso!")
        document.location.reload(true)
    })
    .catch(error => console.log(error))
}

function delInformacoes(id){
    axios.delete(urlInformacoes + "/" + id)
    .then(response => {
        console.log(response.data)
        alert("Informações excluída com sucesso!")
        document.location.reload(true)
    })
    .catch(error => console.alert(error))
}