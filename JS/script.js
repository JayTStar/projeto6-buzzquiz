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
    const questions = quizz.questions;
    quizz = resposta.data;
    console.log(quizz);

    let main = document.querySelector("#screen-quizz main .title-quizz")
    main.innerHTML += `
        <img src="${quizz.image}" alt="">
        <h2>${quizz.title}</h2>`

    for (let i = 0; i < questions.length; i++) {
        let screenQuestions = document.querySelector("#screen-quizz main .questions");
        let arrayQuestions = questions[i].answers
        arrayQuestions.sort(arraySort);
        
        screenQuestions.innerHTML +=`
            <article>
                <div class="h3-question">
                    <h3 style="background: ${questions[i].color};">${questions[i].title}</h3>
                </div>
                
            </article>`
        
        
        for (let j = 0; j < questions[i].answers.length; j++) {
             

            let screenAnswers = document.querySelector("article");
            screenAnswers.innerHTML += `
            <div class="answers-options">
                
                <div>
                    <img src="${arrayQuestions[j].image}">
                    <p>${arrayQuestions[j].text}</p>
                </div>
            </div>`
        }
    }

    // const answers = quizz.questions
    // for (let j = 0; j < answers.length; j++) {
    //     let screenAnswers = document.querySelector(`#screen-quizz main .${j} .${j}`);
    //     screenAnswers.innerHTML +=`
    //             <div>
    //                 <img src="${answers[j].answers.image}" alt="">
    //                 <p>${answers[j].answers.title}</p>
    //             </div>`
    // }

}
function arraySort(){
    return Math.random()-0.5;
}
//-------- CRIAÇÃO DO QUIZZ --------

let  title,imgURL,questionNum, levelNum, screen = 1, questions = [];

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
    getValue("screen-1");

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
        console.log("tudo ok");
        nextScreen();
        showQuestionsClosed();
    }
}

function nextScreen(){
    let screens = document.querySelector(`#screen-create #screen-${screen}`);

    screens.classList.add("hidden");

    screen++;

    screens = document.querySelector(`#screen-create #screen-${screen}`);

    screens.classList.remove("hidden");
}

function showQuestionsClosed(){
    const local = document.querySelector("#screen-create #screen-2 main");
    

    for(i=0; i<questionNum; i++){
        local.innerHTML += ` <section class="closed"> <p onclick = "toggleSection(this.parentElement)" >Pergunta ${i + 1}</p>  <ion-icon onclick = "toggleSection(this.parentElement)" name="create-outline"></ion-icon></section>`
    }   

    local.innerHTML += `<div class="button"> Prosseguir pra criar níveis </div>`
}

function openSection(section){
    let i = section.innerText;
    const structure = `
    <h3 onclick = "toggleSection(this.parentElement)" >${i}</h3>
    <ul>
        <input type="text" id="question-title">
        <input type="text" id="question-color">
    </ul>
    <div id="answers">
        <h3>Resposta correta</h3>
        <ul>
            <input type="text" class="answer-text">
            <input type="text" class="answer-image">
        </ul>
        <h3>Respostas incorretas</h3>
        <ul>
            <input type="text" class="answer-text">
            <input type="text" class="answer-image">
            <input type="text" class="answer-text">
            <input type="text" class="answer-image">
            <input type="text" class="answer-text">
            <input type="text" class="answer-image">
        </ul>
    </div>`

    section.classList.remove("closed");
    section.classList.add("opened");

    section.innerHTML = structure;
    
}

function closeSection(section){
    let i = section.querySelector("h3").innerText;

    section.classList.remove("opened");
    section.classList.add("closed");

    section.innerHTML = `<p>${i}</p>  <ion-icon onclick = "toggleSection(this.parentElement)" name="create-outline"></ion-icon>`;
}

function toggleSection(section){
    const status = section.classList.contains("opened");

    if(status === true){
        closeSection(section);
    }
    else{
        openSection(section);
    }

}

function saveQuestions(){
    let questionStatus = [];

    const questionsOnScreen = document.querySelectorAll("#screen-2 section");
    const questionsList = Array.prototype.slice.call(questionsOnScreen);

    console.log(questionsList);

    questionsList.forEach(function(element){
        const questionTitle = element.querySelector("#question-title").value;

        console.log(questionTitle)

        if(questionTitle.length < 20){
            alert(`${element.querySelector("h3").innerText} está pequena`);
            questionStatus.push(false)
        }
        else{
            questionStatus.push(true)
            questions.push(questionTitle);
        }

        questions.push(saveAnswers(element));
    })

    return(questionStatus);
}

function saveAnswers(element){
    let answers =[];

    const answersTitleOnScreen = element.getElementsByClassName("answer-text");
    const answersTitleList = Array.prototype.slice.call(answersTitleOnScreen);

    const answersImageOnScreen = element.getElementsByClassName("answer-image");
    const answersImageList = Array.prototype.slice.call(answersImageOnScreen);

    answersTitleList.forEach(function (answerElement){
        const position = answersTitleList.indexOf(answerElement);

        answers.push(answerElement.value)
        answers.push(answersImageList[position].value);
    })

    return answers;
}