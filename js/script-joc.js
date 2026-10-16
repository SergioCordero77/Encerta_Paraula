//Canviar la pestanya
document.title = "Nom_Jugador (Guanyades)";

/* ==========================================================================
   Declaració de variables
   ========================================================================== */

//Botons
const botoTornar = document.querySelector("#btn-tornar");
const botoInstruccions = document.querySelector("#btn-instruccions");

//Paraula a endevinar
const inputParaula = document.querySelector("#btn-instruccions");

//Botó veure paraula
const botoVeureParaula = document.querySelector("#btn-veure-paraula");

/* ---Tarjeta d'estadístiques del jugador--- */
const nomJugador = document.querySelector("#nom-jugador");
const puntsActuals = document.querySelector("#punts-actuals");
const totalPartides = document.querySelector("#total-partides");
const partidesGuanyades = document.querySelector("#partides_guanyades");
const recordActual = document.querySelector("#record-partida");

//variables de partida
let punts = 0;
let partides = 0;
let guanyades = 0;
let record = 0;

//Lletres
const LLETRES_EN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const LLETRES_ESP = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const LLETRES_CA = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


/* ==========================================================================
   Funcions
   ========================================================================== */

//Tornar a la pàgina principal
const tornar = () => {
    const confirmacio = confirm("Estàs segur que vols deixar la partida?");

    if (confirmacio){
        location.assign("index.html");
    }
}

//Popup - Mostrar les instruccions del joc
const mostrarInstruccions = () => {
    window.open(
    "instruccions.html",
    "instruccions del joc",
    "popup,width=400,height=400,left=100,top=100"
);
}

/* ==========================================================================
   Events
   ========================================================================== */

// Tornar a la pàgina principal
botoTornar.addEventListener("click", tornar);
botoInstruccions.addEventListener("click", mostrarInstruccions);