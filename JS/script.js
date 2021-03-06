// -------- Variáveis Globais --------
const QUIZZES = "";
let ID = "";
let quizzes = [], quizz = [];

meuStorage = localStorage;

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
            showFirstScreen();
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
            sendQuizzHTML(resposta);
        });
    }
    
    promisse.catch(function (erro){
        deuErro(erro);
    })
}
function postInfo(info){
    const requisition = axios.post(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes`, info)
}
function deuCerto(resposta){
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
    const userquizzes = document.querySelector(".my-quizzes ul");
    const quizzesList = document.querySelector(".all-quizzes ul");
    const titulo = element.title
    const imagem = element.image
    const id = element.id

    quizzesList.innerHTML = quizzesList.innerHTML + `<div data-identifier="quizz-card" id="${id}" onclick="goToQuizz(this)" class="quizz"> <img src="${imagem}" alt="qizz image"> <p>${titulo}</p> </div>`


    if(localStorage.length === 0){
        userquizzes.innerHTML = `<div data-identifier="create-quizz" class="create-quizz"><p>Você não criou nenhum quizz ainda</p> <div class="create-button" onclick="changeScreen('create')"> Criar quizz</div> </div>`
    }
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
            <article${i} class="article">
                <div class="h3-question">
                    <h3 style="background: ${questions[i].color};">${questions[i].title}</h3>
                </div>   
                <div class="answers-options">
                </div>
            </article>`
        
        
        for (let j = 0; j < questions[i].answers.length; j++) {
             

            let screenAnswers = document.querySelector(`article${i} .answers-options`);
            screenAnswers.innerHTML += `
            
                <div id ="${questions[i].answers[j].isCorrectAnswer}" onclick="correctAnswers(this)">
                    <img src="${arrayQuestions[j].image}">
                    <p>${arrayQuestions[j].text}</p>
                </div>
           `
            let idTrueOrFalse = document.querySelector(`article${i} .answers-options #id`)
            if (idTrueOrFalse == false) {

            }
            console.log(questions[i].answers[j].isCorrectAnswer)
        }
        console.log(arrayQuestions)
        
    }

}
function arraySort(){
    return Math.random()-0.5;
}

/*function correctAnswers(answersSelected) {

    document.querySelector("")
    quizz.questions.
}*/
//-------- CRIAÇÃO DO QUIZZ --------

let  quizzTitle,imgURL,questionNum, levelNum, screen = 1, questions = [], levels =[];

function showFirstScreen(){
    const localForm = document.querySelector("#screen-1 ul");
    const localButton = document.querySelector("#screen-1 main");

    const screenStructure = `
    <input type="text" id="titulo" placeholder="Título do seu quizz">
    <input type="text" id="imagem" placeholder="URL da imagem do seu quizz">
    <input type="text" id="qtd-perguntas" placeholder="Quantidade de perguntas do quizz">
    <input type="text" id="qtd-niveis" placeholder="Quantidade de níveis do quizz">`

    localForm.innerHTML = screenStructure;

    localButton.innerHTML += '<div onclick="checkValue()" class="button">Prosseguir pra criar perguntas</div>'
}

function saveQuizzInfo(){
    quizzTitle = document.querySelector("#screen-1 #titulo").value;
    imgURL = document.querySelector("#screen-1 #imagem").value;
    questionNum = parseInt(document.querySelector("#screen-1 #qtd-perguntas").value);
    levelNum = parseInt(document.querySelector("#screen-1 #qtd-niveis").value);
}

function checkValue(){
    saveQuizzInfo();

    const titleSize = quizzTitle.length;
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
        nextScreen();
        showQuestions();
    }
}

function nextScreen(){
    let screens = document.querySelector(`#screen-create #screen-${screen}`);

    screens.classList.add("hidden");

    screen++;

    screens = document.querySelector(`#screen-create #screen-${screen}`);

    screens.classList.remove("hidden");
}

function showQuestions(){
    const local = document.querySelector("#screen-create #screen-2 main");
    

    for(i=0; i<questionNum; i++){
        local.innerHTML += ` <section data-identifier="question"> <div id="closed" class=""> <p data-identifier="expand" onclick = "toggleSection(this.parentElement.parentElement)" >Pergunta ${i + 1}</p> <ion-icon data-identifier="expand" onclick = "toggleSection(this.parentElement.parentElement)" name="create-outline"></ion-icon></div>
            <div id="opened" class="hidden">
                <ul>
                    <input type="text" id="question-title" placeholder="Texto da pergunta">
                    <input type="text" id="question-color" placeholder="Cor de fundo da pergunta">
                </ul>
                <div id="answers">
                    <h3>Resposta correta</h3>
                    <ul>
                        <input type="text" class="answer-text correct" placeholder="Resposta correta">
                        <input type="text" class="answer-image" placeholder="URL da Imagem">
                    </ul>
                    <h3>Respostas incorretas</h3>
                    <ul>
                        <input type="text" class="answer-text" placeholder="Resposta Incorreta 1">
                        <input type="text" class="answer-image" placeholder="URL da Imagem 1">
                        <input type="text" class="answer-text" placeholder="Resposta Incorreta 2">
                        <input type="text" class="answer-image" placeholder="URL da Imagem 2">
                        <input type="text" class="answer-text" placeholder="Resposta Incorreta 3">
                        <input type="text" class="answer-image" placeholder="URL da Imagem 3">
                    </ul>
                </div>
            </div>
        </section>`
    }   

    local.innerHTML += `<div onclick="saveQuestions()" class="button"> Prosseguir pra criar níveis </div>`
}

function toggleSection(section){
    const openedDiv = section.querySelector("#opened");
    const closedDiv = section.querySelector("#closed");
    const status = openedDiv.classList.contains("hidden");

    if(status === true){
        openedDiv.classList.remove("hidden");
        closedDiv.classList.add("hidden");
    }
    else{
        openedDiv.classList.add("hidden");
        closedDiv.classList.remove("hidden");
    }
}

function saveQuestions(){
    questions = [];
    let status = [];

    const questionsOnScreen = document.querySelectorAll("#screen-2 section");
    const questionsList = Array.prototype.slice.call(questionsOnScreen);


    questionsList.forEach(function(element){

        const questionTitle = element.querySelector("#question-title").value;
        const questionColor = element.querySelector("#question-color").value;
        const numQuestion = element.querySelector("p").innerText;

        let answer = saveAnswers(element)

        const questionTitleSize = questionTitle.length;

        const questionStructure = `{ title: ${questionTitle}, color: ${questionColor}, answers: ${answer}}`

        if(questionTitleSize < 20){
            alert(numQuestion + "deve ter mais de 20 caractéres");
            questions = [];
            status.push(false);
        }
        else{
            questions.push(questionStructure);
            status.push(true);
        }
        console.log(answer.length);
        if(answer.length < 2){
            alert(numQuestion + "Deve ter pelo menos 2 respostas");
            status.push(false);
        }

    })

    const find = status.find(element => element === false);

    if(find === false){
        alert("Conserte a questão errada");
    }
    else{
        nextScreen();
        showLevels();
    }
    
}

function saveAnswers(element){
    let answers = [], status=[];

    const answersTitleOnScreen = element.getElementsByClassName("answer-text");
    const answersTitleList = Array.prototype.slice.call(answersTitleOnScreen);

    const answersImageOnScreen = element.getElementsByClassName("answer-image");
    const answersImageList = Array.prototype.slice.call(answersImageOnScreen);

    answersTitleList.forEach(function (answerElement){
        const position = answersTitleList.indexOf(answerElement);
        const isCorrectAnswer = answerElement.classList.contains("correct");

        const answerStructure = `{ text: ${answerElement.value}, image: ${answersImageList[position].value}, isCorrectAnswer: ${isCorrectAnswer} }`

        if(isCorrectAnswer === true){
            if(answerElement.value === ""){
                alert("Resposta correta não pode estar em branco")
            }
            else{
                status.push(true);
            }
        }
        else{
            if(answerElement.value != ""){
                status.push(true);
            }
            
        }

        console.log(status.length);

        console.log(answerStructure);

        answers.push(answerStructure);
    })

    return answers;
}

function showLevels(){
    const local = document.querySelector("#screen-create #screen-3 main");
    

    for(i=0; i<levelNum; i++){
        local.innerHTML += ` <section data-identifier="level"> <div id="closed" class=""> <p data-identifier="expand" onclick = "toggleSection(this.parentElement.parentElement)" >Nível ${i + 1}</p> <ion-icon data-identifier="expand" onclick = "toggleSection(this.parentElement.parentElement)" name="create-outline"></ion-icon></div>
            <div id="opened" class="hidden">
                <ul>
                    <input type="text" id="level-title" placeholder="Título do nível">
                    <input type="text" id="level-value" placeholder="% de acerto mínimo">
                    <input type="text" id="level-image" placeholder="URL da imagem do nível">
                    <input type="text" id="level-text" placeholder="Descrição do nível">
                </ul>
            </div>
        </section>`
    }   

    local.innerHTML += `<div onclick="saveLevels()" class="button"> Finalizar Quizz </div>`
}

function saveLevels(){
    const levelsOnScreen = document.querySelectorAll("#screen-3 section");
    const levelList = Array.prototype.slice.call(levelsOnScreen);

    let status = [];

    console.log(levelList)
    levelList.forEach(function(element){
        const levelStatus = checkLevels(element);

        if(levelStatus != undefined){
            status.push(levelStatus);
        }
    })

    console.log(status);

    if(status.length === 0){
        makeQuizz();
        nextScreen();
        showFinal();
    }
}

function checkLevels(element){
    const selectedLevel = element.querySelector("p").innerText
    const title = element.querySelector("#level-title").value
    const value = element.querySelector("#level-value").value
    const image = element.querySelector("#level-image").value
    const text = element.querySelector("#level-text").value

    const levelStructure = `{title: ${title}, image: ${image}, text: ${text}, minValue: ${value}}`

    let status = [];

    if(title.length < 10){
        alert(`Titulo do nível ${selectedLevel} deve ter pelo menos 10 caractéres`);
        status.push(false);
    }
    else{
        status.push(true);
    }

    if(parseInt(value) >= 0 && parseInt(value) <= 100){
        status.push(true);
    }
    else{
        alert(`O valor do nível ${selectedLevel} deve estar entre 0 e 100`);
        status.push(false);
    }

    if(text.length < 30){
        alert(`Descrição do nível ${selectedLevel} deve ter pelo menos 30 caractéres`);
        status.push(false);
    }
    else{
        status.push(true);
    }

    const find = status.find(element => element === false);

    if(find === undefined){
        levels.push(levelStructure);
    }

    return find;
}

function makeQuizz(){
    const quizzStructure = `{ title: ${quizzTitle} , image: ${imgURL}, questions: ${questions}, levels: ${levels} }`
    console.log(quizzStructure);

    postInfo(quizzStructure);
}

function showFinal(){
    const local = document.querySelector("#screen-4 main")

    local.innerHTML += `<div quizz> <img src="${imgURL}"> <p> ${quizzTitle} </p></div>
    <div onclick="playQuizz()" class="button"> Acessar quizz </div>
    <div> <p onclick="changeScreen('home')"> Voltar para home </p> </div>`
}

function playQuizz(){
    
}