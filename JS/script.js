// -------- Variáveis Globais --------

let quizzes = [];


function changeScreen(screen){
    console.log(screen);
    const home = document.querySelector("#screen-home");
    const quizz = document.querySelector("#screen-quizz");
    const create = document.querySelector("#screen-create");

    home.classList.add("hidden");
    quizz.classList.add("hidden");
    create.classList.add("hidden");

    switch(screen){
        case "home":
            home.classList.remove("hidden");
            break;
        
        case "quizz":
            quizz.classList.remove("hidden");
            break;

        case "create":
            create.classList.remove("hidden");
            break;
    }
}

function getInfo(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promisse.then(function (resposta){
        deuCerto(resposta);
        salvaQuizzes(resposta);
    });
    promisse.catch(function (erro){
        deuErro(erro);
    })
}
function postInfo(){
    
}
function deuCerto(resposta){
    console.log("tudo certo");
}
function deuErro(erro){
    console.info("deu ruim" + erro.response.status);
}

function salvaQuizzes(resposta){
    quizzes = resposta.data;
}

// -------- MOSTRAR QUIZZES --------

function display(element){
    const quizzesList = document.querySelector(".all-quizzes ul");
    const titulo = element.title
    const imagem = element.image

    quizzesList.innerHTML = quizzesList.innerHTML + `<div onclick="changeScreen('quizz')" class="quizz"> <img src="${imagem}" alt="qizz image"> <p>${titulo}</p> </div>`
    
}

function displayOnScreen(){
    getInfo();
    quizzes.forEach(element => {
        display(element);
    });
}

//-------- LÓGICA DO QUIZZ --------

//-------- CRIAÇÃO DO QUIZZ --------

