
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

// -------- MOSTRAR QUIZZES --------

//-------- LÓGICA DO QUIZZ --------

//-------- CRIAÇÃO DO QUIZZ --------

