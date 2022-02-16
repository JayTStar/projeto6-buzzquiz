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
        
        case "quizz":
            quizz.classList.remove("hidden");

        case "create":
            create.classList.remove("hidden");
    }
}

function getInfo(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promisse.then(function (resposta){
        deuCerto(resposta);
        salvaQuizzes(resposta);
    });
    promisse.catch(function (){
        deuErro();
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

//-------- LÓGICA DO QUIZZ --------

//-------- CRIAÇÃO DO QUIZZ --------

