// -------- Variáveis Globais --------
const QUIZZES = "";
let ID = "";
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
    else if(location == ID){
        promisse.then(function (resposta){
            deuCerto(resposta);
            salvaQuizz(resposta);
            // displayOnScreen();
            sendQuizzHTML(resposta);
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
    
    quizzes.forEach(element => {
        display(element);
    });
}

//-------- LÓGICA DO QUIZZ --------

function goToQuizz(takeId){
    const id = takeId.id
    ID = id;
    getInfo(ID);
    
    changeScreen("quizz");
}

function sendQuizzHTML (resposta) {
    quizz = resposta.data
    console.log(quizz)
    let main = document.querySelector("#screen-quizz main")
    main.innerHTML += `
    <div class="title-quizz">
        <img src="${quizz.image}" alt="">
        <h2>${quizz.title}</h2>
    </div>
    <section class="questions">
        <article>
            <h3>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</h3>
            <div class="answers-options">
                <div>
                    <img class="" src="img/Rectangle38.png" alt="">
                    <p>The boy who lived</p>
                </div>
                <div>
                    <img src="img/Rectangle38.png" alt="">
                    <p>The boy who lived</p>
                </div>
                <div>
                    <img src="img/Rectangle38.png" alt="">
                    <p>The boy who lived</p>
                </div>
                <div>
                    <img src="img/Rectangle38.png" alt="">
                    <p>The boy who lived</p>
                </div>
            </div>
        </article>
    </section>`
}



//-------- CRIAÇÃO DO QUIZZ --------

let  title,imgURL,questionNum, levelNum, screen = 1;

function getValue(screen){
    switch(screen){
        case "screen-1":
            title = document.querySelector("#screen-1 #titulo").value;
            imgURL = document.querySelector("#screen-1 #imagem").value;
            questionNum = parseInt(document.querySelector("#screen-1 #qtd-perguntas").value);
            levelNum = parseInt(document.querySelector("#screen-1 #qtd-niveis").value);
            break;

        case "screen-2":

        case "screen-3":

    }
    
}

function checkValue(){
    getValue();

    const titleSize = title.length;
    let titleStatus, questionStatus, levelSatus;

    if(titleSize >= 20 && titleSize <= 65){
        titleStatus = true;
    }
    else{
        if(titleSize < 20){
            alert("Titulo pequeno");

            titleStatus = false;
        }
        if(titleSize > 65){
            alert("Titulo muito grande");

            titleStatus = false;
        }
    }
    
    if(isNaN(questionNum)){
        alert("Quantidade de perguntas deve ser um número");

        questionStatus = false;
    }
    else{
        if(questionNum < 3){
            alert("Poucas Perguntas");

            questionStatus = false;
        }
        else{
            questionStatus = true;
        }
    }
    
    if(isNaN(levelNum)){
        alert("Quantidade de niveis deve ser um número");

        levelSatus = false;
    }
    else{
        if(levelNum < 2){
            alert("Poucos niveis");

            levelSatus = false;
        }
        else{
            levelSatus = true;
        }
    }

    if(titleStatus === true && questionStatus === true && levelSatus === true){
        console.log("tudo ok")
        nextScreen();
    }
}

function nextScreen(){
    const screens = document.querySelector(`#screen-create #screen-${screen}`);

    screens.classList.add("hidden");

    screen ++ 

    screens.classList.remove("hidden");
}