const botonStart  = document.getElementById('btn_start');
const wordContainer  = document.getElementById('containerPalabras');
const botonword  = document.getElementById('btn_word');
const usedLettersElement = document.getElementById('palabraUsada');
const startButton = document.querySelector('.nuevoJuego');
const rendirse = document.querySelector('.rendirse');
const addText = document.querySelector('.agregarPalabra');
const warningText = document.querySelector('.texto_advertencia');

const home = document.querySelector('.home');
const home_Game = document.querySelector('.home_Game');

const words = ['mario','castillo','bowser','princesa','luigi']


botonStart.addEventListener('click', () => {
    home.classList.add('oculto')
    home_Game.classList.remove('oculto')
})

rendirse.addEventListener('click', () => {
    home.classList.remove('oculto')
    home_Game.classList.add('oculto')
})


/*/--------------------------------- Alertas Personalizadas ---------------------------------------/*/
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    width: '30%',
    background: '#FEB139',
    color: '#00FFFF'
  })

const ToastWrong = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    width: '30%',
    background: '#d61c35',
    color: '#00FFFF'
})

const ganaContainer = Swal.mixin({
    position: 'center',
    width: '30%',
    background: '#FEB139',
    color: '#fff',
    icon: 'success',
    title: 'GANASTE',
    text: 'juegalo otra ronda mas',
    confirmButtonText: 'Jugar',
  })

const pierdeContainer = Swal.mixin({
    position: 'center',
    width: '30%',
    background: '#D61C4E',
    color: '#fff',
    icon: 'error',
    title: 'PERDISTE',
    text: 'Pruebalo otra vez',
    confirmButtonText: 'Jugar',
  })


function alertEfect(){
    Toast.fire({
        customClass: {
            popup: 'alerta',
            title: 'titulo_alerta',
            icon: 'icono_alerta'
        },
        icon: 'success',
        title: 'PALABRA AGREGADA CORRECTAMENTE',
      })
}

function alertEfectWrong(){
    ToastWrong.fire({
        customClass: {
            popup: 'alerta',
            title: 'titulo_alerta',
            icon: 'icono_alerta'
        },
        icon: 'error',
        title: 'LA PALABRA NO SE PUDO AGREGADA CORRECTAMENTE',
      })
}

function alertaGanaste(){
    ganaContainer.fire({
        customClass: {
        popup: 'alerta_Perdiste',
        title: 'titulo_perdiste',
        confirmButtonText: 'game_button'
    },
    })
}

function alertaPerdiste(){
    pierdeContainer.fire({
            customClass: {
            popup: 'alerta_Perdiste',
            title: 'titulo_perdiste',
            confirmButtonText: 'game_button'
        },
      })
}


/*/--------------------------------- Imagenes del juego ---------------------------------------/*/
const img_fallo_0 = document.querySelector('.img_fallo_0');
const img_fallo_1 = document.querySelector('.img_fallo_1');
const img_fallo_2 = document.querySelector('.img_fallo_2');
const img_fallo_3 = document.querySelector('.img_fallo_3');
const img_fallo_4 = document.querySelector('.img_fallo_4');
const img_fallo_5 = document.querySelector('.img_fallo_5');
const img_fallo_6 = document.querySelector('.img_fallo_6');
const ganaste = document.querySelector('.img_fallo_7');

var contador = 0;

function cambio(){
    if (contador == 0){
        botonword.classList.remove('transicion')
        botonword.classList.add('mover')
        addText.classList.remove('oculto')
        warningText.classList.remove('oculto')
        contador = 1
    }
    else{
        botonword.classList.remove('mover')
        botonword.classList.add('transicion')
        addText.classList.add('oculto')
        warningText.classList.add('oculto')
        añadirPalabra()

        contador = 0
    }
}

addText.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        console.log(e.target.value);
        cambio()
    }
})

function añadirPalabra(){
    let nuevoDato = document.querySelector('.agregarPalabra').value;
    if (nuevoDato == ""){
        alertEfectWrong()
    }
    else{
        words.push(nuevoDato)
        alertEfect()
    }
}

botonword.addEventListener('click', () => {
    cambio()
})

function remover_imagen(){
    ganaste.classList.add('oculto')
    img_fallo_1.classList.add('oculto')
    img_fallo_2.classList.add('oculto')
    img_fallo_3.classList.add('oculto')
    img_fallo_4.classList.add('oculto')
    img_fallo_5.classList.add('oculto')
    img_fallo_6.classList.add('oculto')
    img_fallo_0.classList.add('oculto')
}

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

const wrongLetter = () => {
    mistakes++;

    if(mistakes === 6) {
        badGame();
        img_fallo_5.classList.add('oculto')
        img_fallo_6.classList.remove('oculto')
    }
    else{
        fallos()
    }
}

const badGame = () => {
    document.removeEventListener('keydown', letterEvent);
    alertaPerdiste()
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    remover_imagen()
    ganaste.classList.remove('oculto')
    alertaGanaste()
}

function fallos(){
    if(mistakes === 0){
    }
    if(mistakes === 1){
        img_fallo_0.classList.add('oculto')
        img_fallo_1.classList.remove('oculto')
    }
    else if(mistakes === 2){
        img_fallo_1.classList.add('oculto')
        img_fallo_2.classList.remove('oculto')
    }
    else if(mistakes === 3){
        img_fallo_2.classList.add('oculto')
        img_fallo_3.classList.remove('oculto')
    }
    else if(mistakes === 4){
        img_fallo_3.classList.add('oculto')
        img_fallo_4.classList.remove('oculto')
    }
    else if(mistakes === 5){
        img_fallo_4.classList.add('oculto')
        img_fallo_5.classList.remove('oculto')
    }
}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGame();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const drawWords = () =>{
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        containerPalabras.appendChild(letterElement);
    });
}

const selectedRandomWord = () =>{
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
}

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    containerPalabras.innerHTML = '';
    usedLettersElement.innerHTML = '';
    selectedRandomWord();
    drawWords();
    remover_imagen()
    img_fallo_0.classList.remove('oculto')
    document.addEventListener('keydown', letterEvent);
}



startButton.addEventListener('click',startGame)
botonStart.addEventListener('click',startGame)