// -------- Variáveis Globais --------
const QUIZZES = "";
let ID ;
let quizzes = [], quizz = [];

// function changeScreen(screen){
//     const telas = {
//       home: document.querySelector("#screen-home"),
//       quizz: document.querySelector("#screen-quizz"),
//       create: document.querySelector("#screen-create")
//     };
//     for(let tela in telas) {
//         telas[tela].classList.add("hidden");
//     }
//     telas[screen].classList.remove("hidden");
// }

getInfo(QUIZZES);

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

function getInfo(location){
    const promisse = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${location}`);

    if(location == QUIZZES){
        promisse.then(function (resposta){
            deuCerto(resposta);
            salvaQuizzes(resposta);
            displayOnScreen();
        });
    }
    if(location == ID){
        promisse.then(function (resposta){
            deuCerto(resposta);
            salvaQuizz(resposta);
            displayOnScreen();
        });
    }
    
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

function salvaQuizz(resposta){
    quizz = resposta.data;
}

// -------- MOSTRAR QUIZZES --------

function display(element){
    const quizzesList = document.querySelector(".all-quizzes ul");
    const titulo = element.title
    const imagem = element.image
    const id = element.id

    quizzesList.innerHTML = quizzesList.innerHTML + `<div id="${id}" onclick="goToQuizz(this)" class="quizz"> <img src="${imagem}" alt="qizz image"> <p>${titulo}</p> </div>`
    
}

function displayOnScreen(){
    getInfo();
    quizzes.forEach(element => {
        display(element);
    });
}

//-------- LÓGICA DO QUIZZ --------

function goToQuizz(elemento){
    const id = elemento.id;
    ID = id;

    getInfo(ID);
    changeScreen("quizz");
}

//-------- CRIAÇÃO DO QUIZZ --------

