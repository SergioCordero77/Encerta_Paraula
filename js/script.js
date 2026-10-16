/* ==========================================================================
   Declaració de variables
   ========================================================================== */

// Formulari
const form = document.querySelector("#game-form");

// Jugadors (botó radio)
const botoJugador1 = document.querySelector("#players-1");
const botoJugador2 = document.querySelector("#players-2");

// Jugadors (div)
const divJugador1 = document.querySelector("#player-1-row");
const divJugador2 = document.querySelector("#player-2-row");

// Span jugador 2
const spanJugador2 = document.querySelector("#player-2-span");

// Jugadors (input)
const inputJugador1 = document.querySelector("#player1");
const inputJugador2 = document.querySelector("#player2");

// Missatges d'error dels jugadors
const errorJugador1 = document.querySelector("#error-player1");
const errorJugador2 = document.querySelector("#error-player2");

// Puntuació més alta
const puntuacioAlta = document.querySelector("#high-score-value");
let puntuacioMesAlta = 0;
let jugadorMesPuntuacio = "";
let dataAsoliment = "";

// Navegador
const navegador = document.querySelector("#browser-value");

// Idioma
const idioma = document.querySelector("#language-value");

// URL
const url = document.querySelector("#url-value");

// Botons
const botoComencar = document.querySelector("#start-game-button");
const botoEsborrar = document.querySelector("#clear-score-button");

/* ==========================================================================
   Funcions
   ========================================================================== */

const validarBotoPlayer1 = () => {
    if (botoJugador1.checked){
        spanJugador2.classList.add("hide-item");
        spanJugador2.classList.remove("show-item");

        console.log("el botó 1 funciona");

        return true;
    }
    else{
        spanJugador2.classList.add("show-item");
        spanJugador2.classList.remove("hide-item");

        return false;
    }
}

const validarBotoPlayer2 = () => {
    if (botoJugador2.checked){
        spanJugador2.classList.add("show-item");
        spanJugador2.classList.remove("hide-item");

        console.log("el botó 2 funciona");

        return true;
    }
    else{
        spanJugador2.classList.add("hide-item");
        spanJugador2.classList.remove("show-item");

        return false;
    }
}

const validarNomPlayer1 = () => {
    const valorNom = inputJugador1.value;
    const patro = /[A-Za-zÀ-ÿ0-9_]{4,14}/;

    if (patro.test(valorNom)){
        errorJugador1.textContent = "Correcte";
        inputJugador1.classList.add("valid");
        inputJugador1.classList.remove("invalid");
        errorJugador1.classList.add("ok");

        return true;
    }
    else{
        errorJugador1.textContent = "Incorrecte";
        inputJugador1.classList.add("invalid");
        inputJugador1.classList.remove("valid");
        errorJugador1.classList.remove("ok");

        return false;
    }
}

const validarNomPlayer2 = () => {
    const valorNomPlayer2 = inputJugador1.value;
    const valorNomPlayer1 = inputJugador1.value;
    const patro = /[A-Za-zÀ-ÿ0-9_]{4,14}/;

    if (patro.test(valorNomPlayer2)){
        if (valorNomPlayer2===valorNomPlayer1){
            errorJugador2.textContent = "El nom no pot coincidir amb el nom del jugador 1";
            inputJugador2.classList.add("invalid");
            inputJugador2.classList.remove("valid");
            errorJugador2.classList.remove("ok");

            return false;
        }

        errorJugador2.textContent = "Correcte";
        inputJugador2.classList.add("valid");
        inputJugador2.classList.remove("invalid");
        errorJugador2.classList.add("ok");

        return true;
    }
    else{
        errorJugador2.textContent = "Incorrecte";
        inputJugador2.classList.add("invalid");
        inputJugador2.classList.remove("valid");
        errorJugador2.classList.remove("ok");

        return false;
    }
}

// Puntuació més alta
if (puntuacioMesAlta === 0){
    puntuacioAlta.textContent = "No hi ha puntuació actual";
}
else{
    puntuacioAlta.textContent = jugadorMesPuntuacio + " - " + puntuacioMesAlta + " - " + dataAsoliment;
}

// Idioma joc
idioma.textContent = navigator.languages;

// Informació del navegador
navegador.textContent = navigator.userAgent;

// URL
url.textContent = window.location.href;

/* ==========================================================================
   Events
   ========================================================================== */

// Validacions de jugador
botoJugador1.addEventListener("change", validarBotoPlayer1);
botoJugador2.addEventListener("change", validarBotoPlayer2);

/* ---Validacions de l'input dels jugadors--- */
// Validació del jugador 1
inputJugador1.addEventListener("blur", validarNomPlayer1);
inputJugador1.addEventListener("changer", validarNomPlayer1);

// Validació del jugador 2
inputJugador2.addEventListener("blur", validarNomPlayer2);
inputJugador2.addEventListener("changer", validarNomPlayer2);
