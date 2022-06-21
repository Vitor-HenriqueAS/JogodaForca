function comeca() {
    qtdRisco = []
    selectbox = aleatorio()
    var quantLetra = document.getElementById("quantLetra") 

    for (var x = 0;x < selectbox.length; x++) {
        qtdRisco.push(" __ "); // ADICIONA NO VETOR
    }
    quantLetra.innerHTML = qtdRisco

    // DESABILITA BOTAO COMEÇA
    document.getElementById("comeca").style.display = "none"

    // HABILITA TECLA POR TECLA, E RESET A COR
    let teclado = document.querySelectorAll(".letras")
    for(var x = 0;x < 27;x++){
        teclado[x].style.backgroundColor = "white";
        teclado[x].disabled = false
    }
    // HABILITA O TECLADO
    key = document.querySelectorAll(".keyboard")
        for(var x = 0;x < 3;x++){
            key[x].style.display = "block"
        }
    // RESET NA VIDA
    vida = document.querySelectorAll(".vida")
    for(var x = 0;x < 6;x++){
        vida[x].style.display = 'inline';
    }

    vidas = 6
    resposta = qtdRisco
    win = ""
    stopTemp = 0

    // ESCONDE A DERROTA / VITORIA
    document.getElementById("defeatWin").style.display = "none"

    // ATIVA A CONTAGEM REGRESSIVA
    var duration = 60 * 3; // Converter para segundos
    display = document.querySelector('#timer'); // selecionando o timer
    tempo = startTimer(duration, display); // iniciando o timer
}

function aleatorio(){
    var numPalavra = 0

    const frutas = ["UVA", "GOIABA", "ABACAXI", "CAQUI", "MELAO", "PERA", "ABACATE", "TAGERINA", "LARANJA", "MAÇA", "BANANA", "MAMAO", "MORANGO", "COCO", "MANGA", "PESSEGO", "MARACUJA", "AÇAI", "FIGO", "MELANCIA", "KIWI", "PEQUI", "MEXERICA", "PISTACHE", "GROSELHA", "LICHIA"]
    const objetos = ["ZIPER", "XADREZ", "SPRAY", "FREEZER", "AMPULHETA", "ANZOL", "CADEIRA", "GARRAFA", "PORTA", "CELULAR", "CANETA", "MICROFONE", "ESPELHO", "GELADEIRA", "CARTA", "BRINCO", "GAVETA", "TECLADO", "IMPRESSORA", "PANELA", "COLHER", "LAPISEIRA", "CAIXA", "TV"]
    const animais = ["MARRECO", "ROUXINOL", "SANGUESSUGA", "PERCEVEJO", "PELICANO", "HAMSTER", "GIRAFA", "JACARE", "ONÇA", "RATO", "AGUIA", "GATO", "CACHORRO", "ELEFANTE", "BUFALO", "ZEBRA", "QUATI", "CAVALO", "TOURO", "OVELHA", "VACA", "BOI", "MACACO", "COBRA", "BODE", "BURRO"]
    const comidaBebida = ["STROGONOFF", "MACARRAO", "CHURRASCO", "PIZZA", "SUSHI", "CAFE", "HAMBURGUER", "AGUA", "LIMONADA", "FEIJOADA", "CACHAÇA", "REFRIGERANTE", "VINHO", "CHAMPAGNE", "CUCUZ", "OMELETE", "BRIGADEIRO", "BOLO", "TOFU", "PANQUECA", "BACON", "ROCAMBOLE", "PASTEL"]
    const pais = ["EUA", "JAPÃO", "CHINA", "FRANÇA", "ESPANHA", "ITALIA", "MEXICO", "ALEMANHA", "BRASIL", "TURQUIA", "TAILANDIA", "QATAR", "JAMAICA", "AUTRALIA", "SUIÇA", "PARAGUAI", "ARGENTINA", "CANADA", "COLOMBIA", "BOLIVIA", "CROACIA"]

    var numTema = Math.floor(Math.random() * 5 + 1);

    if (numTema == 1){
        numPalavra = Math.floor(Math.random() * frutas.length);
        selectbox = frutas[numPalavra]
        document.getElementById("tema").innerHTML = "FRUTA"
    }
    else if (numTema == 2){
        numPalavra = Math.floor(Math.random() * objetos.length);
        selectbox = objetos[numPalavra]
        document.getElementById("tema").innerHTML = "OBJETO"
    }
    else if (numTema == 3){
        numPalavra = Math.floor(Math.random() * animais.length);
        selectbox = animais[numPalavra]
        document.getElementById("tema").innerHTML = "ANIMAL"
    }
    else if (numTema == 4){
        numPalavra = Math.floor(Math.random() * animais.length);
        selectbox = comidaBebida[numPalavra]
        document.getElementById("tema").innerHTML = "COMIDA E BEBIDA"
    }
    else if (numTema == 5){
        numPalavra = Math.floor(Math.random() * animais.length);
        selectbox = pais[numPalavra]
        document.getElementById("tema").innerHTML = "PAÍS"
    }
    return selectbox
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    var x = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;

        if(stopTemp == 1){
            clearInterval(x);
        }

        if (--timer < 0) {
            clearInterval(x);
            tempo = timer
            perdeuJogo()
        }
    }, 1000);
}

function letra(letra, id) {
    var quantLetra = document.getElementById("quantLetra")
    var semErro = 0

    //SE AS VIDAS NÃO ACABAREM !
    if(!vidas < 1){

        for (x = 0; x < selectbox.length; x++){

            if (selectbox[x] == letra){
                qtdRisco.splice(x, 1, letra);
                resposta = qtdRisco
                semErro += 1 // se errou alguma vez fica 0
            }
            else{
                resposta = qtdRisco
            }
        }
        if(semErro < 1){ // ERRADO
            document.getElementById(id).style.backgroundColor = "red";
            document.getElementById(id).disabled = true
            coracao = "v"+ vidas
            vidas -= 1
            document.getElementById(coracao).style.display = 'none'
        }
        else{ //CERTO
            document.getElementById(id).style.backgroundColor = "green";
            document.getElementById(id).disabled = true

            var resposta1 = resposta.toString().replaceAll(",","")
            var resposta2 = resposta1.toString().replaceAll("__","")
            win = resposta2.toString().replaceAll(" ","")
        }
    
        if (selectbox == win){ // Ganhou o Jogo
            ganhouJogo()
        }
    
        //Mostra a palavra se formando
        quantLetra.innerHTML = resposta
    }

    //SE AS VIDAS ACABAREM !
    if (vidas < 1){
        perdeuJogo()
    }
}

function lightDark(sl){
    if (sl == "sol"){
        document.body.style.backgroundImage = 'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)';
        document.getElementById("nav").style.backgroundColor = '#a1c4fd'
        document.getElementById("comeca").style.backgroundColor = '#a1c4fd'
        document.querySelector(".nav-list").style.color = "black"
        document.querySelector("a").style.color = "black"
        document.querySelector(".jogo").style.color = "black"
    }
    if (sl == "lua"){
        document.body.style.backgroundImage = 'linear-gradient(to top, #434343 0%, black 100%)';
        document.getElementById("nav").style.backgroundColor = '#3a0202'
        document.getElementById("comeca").style.backgroundColor = '#3a0202'
        document.querySelector(".nav-list").style.color = "#fff"
        document.querySelector("a").style.color = "#fff"
        document.querySelector(".jogo").style.color = "#fff"
    }
}

function perdeuJogo(){
    document.getElementById("comeca").style.display = "inline"
    document.querySelector("#defeatWin h1").innerHTML = "GAME OVER !"
    document.querySelector("#defeatWin h1").style.color = "#F50F00"
    document.querySelector("#defeatWin h6").innerHTML = "A Palavra Certa era : "+ selectbox // Colocar palavra certa ao errar e acertar
    document.querySelector("#defeatWin h6").style.color = "#D90E00"
    document.getElementById("defeatWin").style.display = "inline"
    vidas = 6

    key = document.querySelectorAll(".keyboard")
    for(var x = 0;x < 3;x++){
        key[x].style.display = "none"
    }

    stopTemp = 1
}

function ganhouJogo(){
    document.getElementById("comeca").style.display = "inline"
    document.querySelectorAll("input.letras").disabled = true

    let teclado = document.querySelectorAll(".letras")
    for(var x = 0;x < 27;x++){
        teclado[x].disabled = true
    }
    win = ""

    document.querySelector("#defeatWin h1").innerHTML = "YOU WIN !"
    document.querySelector("#defeatWin h1").style.color = "#10F5AE"
    document.querySelector("#defeatWin h6").innerHTML = ""
    document.getElementById("defeatWin").style.display = "inline"
    vidas = 6

    key = document.querySelectorAll(".keyboard")
    for(var x = 0;x < 3;x++){
        key[x].style.display = "none"
    }

    stopTemp = 1
    vidas = 6   
}