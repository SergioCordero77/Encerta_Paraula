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

// Jugadors (input)
const inputJugador1 = document.querySelector("#player1");
const inputJugador2 = document.querySelector("#player2");

// Puntuació més alta
const puntuacioAlta = document.querySelector("#high-score-value");

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
   Events
   ========================================================================== */

// Validacions de jugador
botoJugador1.addEventListener("change", validarPlayer1);
botoJugador2.addEventListener("change", validarPlayer2);

/* ==========================================================================
   Funcions
   ========================================================================== */

const validarPlayer1 = () => {
    if (botoJugador1.checked){
        divJugador2.classList.add("hide-item");
        divJugador2.classList.remove("show-item");

        return true;
    }
    else{
        divJugador2.classList.add("show-item");
        divJugador2.classList.remove("hide-item");

        return false;
    }
}

const validarPlayer2 = () => {
    if (botoJugador1.checked){
        divJugador2.classList.add("show-item");
        divJugador2.classList.remove("hide-item");

        return true;
    }
    else{
        divJugador2.classList.add("hide-item");
        divJugador2.classList.remove("show-item");

        return false;
    }
}