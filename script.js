/**
 * Chama função aleatorio() e guardando retorno no selectbox
 * - Reseta os itens para Começar ou Recomeçar a partida
 * - Ativa a Contagem Regressiva, qtd 3 min
 */
function comeca() {
    qtdRisco = []
    selectbox = aleatorio()
    var quantLetra = document.getElementById("quantLetra") 

    for (var x = 0;x < selectbox.length; x++) {
        qtdRisco.push(" __ ");
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

    //RESETA
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

/**
 * Escolhe o tema aleatoriamente, já colocando na tela
 * @returns {string} - A palavra a ser descorberta pelo player
 */
function aleatorio(){
    var numPalavra = 0

    var temas = [
        ["FRUTA","UVA", "GOIABA", "ABACAXI", "CAQUI", "MELAO", "PERA", "ABACATE", "TANGERINA", "LARANJA", "MAÇA", "BANANA", "MAMAO", "MORANGO", "COCO", "MANGA", "PESSEGO", "MARACUJA", "AÇAI", "FIGO", "MELANCIA", "KIWI", "PEQUI", "MEXERICA", "PISTACHE", "GROSELHA", "LICHIA"],
        ["OBJETO","ZIPER", "XADREZ", "SPRAY", "FREEZER", "AMPULHETA", "ANZOL", "CADEIRA", "GARRAFA", "PORTA", "CELULAR", "CANETA", "MICROFONE", "ESPELHO", "GELADEIRA", "CARTA", "BRINCO", "GAVETA", "TECLADO", "IMPRESSORA", "PANELA", "COLHER", "LAPISEIRA", "CAIXA", "TV"],
        ["ANIMAL","MARRECO", "ROUXINOL", "SANGUESSUGA", "PERCEVEJO", "PELICANO", "HAMSTER", "GIRAFA", "JACARE", "ONÇA", "RATO", "AGUIA", "GATO", "CACHORRO", "ELEFANTE", "BUFALO", "ZEBRA", "QUATI", "CAVALO", "TOURO", "OVELHA", "VACA", "BOI", "MACACO", "COBRA", "BODE", "BURRO"],
        ["COMIDA E BEBIDA","STROGONOFF", "MACARRAO", "CHURRASCO", "PIZZA", "SUSHI", "CAFE", "HAMBURGUER", "AGUA", "LIMONADA", "FEIJOADA", "CACHAÇA", "REFRIGERANTE", "VINHO", "CHAMPAGNE", "CUCUZ", "OMELETE", "BRIGADEIRO", "BOLO", "TOFU", "PANQUECA", "BACON", "ROCAMBOLE", "PASTEL"],
        ["PAÍS","EUA", "JAPÃO", "CHINA", "FRANÇA", "ESPANHA", "ITALIA", "MEXICO", "ALEMANHA", "BRASIL", "TURQUIA", "TAILANDIA", "QATAR", "JAMAICA", "AUTRALIA", "SUIÇA", "PARAGUAI", "ARGENTINA", "CANADA", "COLOMBIA", "BOLIVIA", "CROACIA"]
    ]
    var numTema = Math.floor(Math.random() * 4);
    numPalavra = Math.floor(Math.random() * temas[numTema].length + 1);
    var selectbox = temas[numTema][numPalavra]
    document.getElementById("tema").innerHTML = temas[numTema][0]
    return selectbox
}

/**
 * @param {number} duration - Qual a duração que a Contagem irá ter
 * @param {object} display  - Onde será exibido a contagem
 * Converte seg em min/seg em contagem regressiva
 * Se o tempo acabar (--timer < 0), mostra a tela de derrota
 * Se a var stopTemp for igual a 1, para o tempo (perdeu por vidas/ ganhou)
 */
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

/**
 * @param {string} sl - Saber se o usuario quer tema claro/escuro (sl = sol ou lua)
 * Muda o design da página, diante a escolha do usuario
 */
function lightDark(sl){
    if (sl == "sol"){
        document.body.style.backgroundColor = '#e3eeff';
        document.getElementById("nav").style.backgroundColor = '#a1c4fd'
        document.getElementById("comeca").style.backgroundColor = '#a1c4fd'
        document.querySelector(".nav-list").style.color = "black"
        document.querySelector("a").style.color = "black"
        document.querySelector(".jogo").style.color = "black"
    }
    if (sl == "lua"){
        document.body.style.backgroundColor = '#202020';
        document.getElementById("nav").style.backgroundColor = '#3a0202'
        document.getElementById("comeca").style.backgroundColor = '#3a0202'
        document.querySelector(".nav-list").style.color = "#fff"
        document.querySelector("a").style.color = "#fff"
        document.querySelector(".jogo").style.color = "#fff"
    }
}

/**
 * Aparece a tela de Derrota com o display
 * Desaparece o teclado com display
 * e adiciona o valor 1 na var stopTemp para Parar o tempo
 */
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

/**
 * Aparece a tela de Vitória com o display
 * Desaparece o teclado com display
 * e adiciona o valor 1 na var stopTemp para Parar o tempo
 */
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