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
const spanJugador2 = document.querySelector("#player-2-div");

// Jugadors (input)
const inputJugador1 = document.querySelector("#player1");
let nomJugador1 = "";   //Per guardar el nom del jugador1
const inputJugador2 = document.querySelector("#player2");
let nomJugador2 = "";   //Per guardar el nom del jugador2

// Missatges d'error dels jugadors
const errorJugador1 = document.querySelector("#error-player1");
const errorJugador2 = document.querySelector("#error-player2");

// Puntuació més alta
const puntuacioAlta = document.querySelector("#high-score-value");
/* ---RECUPERACIÓ D'INFORMACIÓ DEL LOCALSTORAGE--- */
let nomJugadorRecord = localStorage.getItem("nomJugador1");
let record = localStorage.getItem("record");
let dataRecord = localStorage.getItem("dataRecord");

if (dataRecord !== null) {
    dataRecord = new Date(dataRecord).toLocaleString();
}

// Navegador
const navegador = document.querySelector("#browser-value");

// Idioma
const idioma = document.querySelector("#language-value");

// URL
const url = document.querySelector("#url-value");

// Botons
const botoComencar = document.querySelector("#start-game-button");
const botoEsborrar = document.querySelector("#clear-score-button");

// Objecte navegador
const navegadorWeb = {
    idioma: navigator.language,
    nom: ["Chrome", "Firefox", "Safari", "Edge", "Altres"],
    url: window.location.href,
    color: ""
};

/* ==========================================================================
   Funcions
   ========================================================================== */

console.log("El nom amb el record és: " + nomJugadorRecord);
console.log("El record es " + record);
console.log("La data del record es: " + dataRecord)

/* ---VALIDAR BOTONS--- */
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

/* ---VALIDAR INPUTS DELS JUGADORS--- */
const validarNomPlayer1 = () => {
    const valorNom = inputJugador1.value.trim();
    const patroNum = /^[A-Za-z0-9_]+$/;

    if (valorNom != ""){
        if (valorNom.length>=4 && valorNom.length<=14){
            if (patroNum.test(valorNom)){
                errorJugador1.textContent = "✔ Correcte";
                inputJugador1.classList.add("valid");
                inputJugador1.classList.remove("invalid");
                errorJugador1.classList.add("ok");

                nomJugador1 = valorNom; //Guardem el nom del jugador

                return true;
            }
            else{
                errorJugador1.textContent = "Només es poden introduir lletres sense accents, números i _";
                inputJugador1.classList.add("invalid");
                inputJugador1.classList.remove("valid");
                errorJugador1.classList.remove("ok");

                return false;
            }     
        }
        else if (valorNom.length<4){
            errorJugador1.textContent = "El nom ha de tenir més de 3 caràcters";
            inputJugador1.classList.add("invalid");
            inputJugador1.classList.remove("valid");
            errorJugador1.classList.remove("ok");

            return false;
        }
        else if (valorNom.length>14){
            errorJugador1.textContent = "El nom ha de tenir menys de 15 caràcters";
            inputJugador1.classList.add("invalid");
            inputJugador1.classList.remove("valid");
            errorJugador1.classList.remove("ok");

            return false;
        }
    }
    else{
        errorJugador1.textContent = "Has d'informar el nom d'un jugador";
        inputJugador1.classList.add("invalid");
        inputJugador1.classList.remove("valid");
        errorJugador1.classList.remove("ok");

        return false;
    }
}

const validarNomPlayer2 = () => {
    const valorNomPlayer2 = inputJugador2.value.trim();
    const valorNomPlayer1 = inputJugador1.value.trim();
    const patroNum = /^[A-Za-z0-9_]+$/;

    if (valorNomPlayer2 != ""){
        if (valorNomPlayer2.length>=4 && valorNomPlayer2.length<=14){
            if (patroNum.test(valorNomPlayer2)){
                
                if(valorNomPlayer2===valorNomPlayer1){
                    errorJugador2.textContent = "Els dos jugadors han de tenir noms diferents";
                    inputJugador2.classList.add("invalid");
                    inputJugador2.classList.remove("valid");
                    errorJugador2.classList.remove("ok");

                    return false;
                }

                errorJugador2.textContent = "✔ Correcte";
                inputJugador2.classList.add("valid");
                inputJugador2.classList.remove("invalid");
                errorJugador2.classList.add("ok");
                
                nomJugador2 = valorNomPlayer2; //Guardem el nom del jugador
                
                return true;
            }
            else{
                errorJugador2.textContent = "Només es poden introduir lletres sense accents, números i _";
                inputJugador2.classList.add("invalid");
                inputJugador2.classList.remove("valid");
                errorJugador2.classList.remove("ok");

                return false;
            }     
        }
        else if (valorNomPlayer2.length<4){
            errorJugador2.textContent = "El nom ha de tenir més de 3 caràcters";
            inputJugador2.classList.add("invalid");
            inputJugador2.classList.remove("valid");
            errorJugador2.classList.remove("ok");

            return false;
        }
        else if (valorNomPlayer2.length>14){
            errorJugador2.textContent = "El nom ha de tenir menys de 15 caràcters";
            inputJugador2.classList.add("invalid");
            inputJugador2.classList.remove("valid");
            errorJugador2.classList.remove("ok");

            return false;
        }
    }
    else{
        errorJugador2.textContent = "Has d'informar el nom d'un jugador";
        inputJugador2.classList.add("invalid");
        inputJugador2.classList.remove("valid");
        errorJugador2.classList.remove("ok");

        return false;
    }
}

// Puntuació més alta
const mostrarPuntuacio = () => {
    if (record === null){
        puntuacioAlta.textContent = "No hi ha cap record establert";
    }
    else{
        puntuacioAlta.textContent = nomJugadorRecord + " - " + record + " - " + dataRecord;
    }
}

// Mostrar la puntuació més alta
mostrarPuntuacio();

// Idioma joc
const mostrarIdioma = () => {
    idioma.textContent = navegadorWeb.idioma;
}

// Mostrar idioma
mostrarIdioma();

//Canvi del fons de pantalla segons el navegador
document.body.classList.add(canviarClasseNavegador(navigator.userAgent));
navegadorWeb.color = canviarClasseNavegador(navigator.userAgent);

// Informació del navegador
const mostrarInfoNavegador = () => {
    const arrayNoms = navegadorWeb.nom;
    const infoNav = navigator.userAgent;

    if (infoNav.includes("Firefox")){
        navegador.textContent = arrayNoms[1]; //Firefox
    }
    else if (infoNav.includes("Chrome") && infoNav.includes("Safari") && !infoNav.includes("Edg")){
        navegador.textContent = arrayNoms[0]; //Chrome
    }
    else if (infoNav.includes("Chrome") && infoNav.includes("Safari") && infoNav.includes("Edg")){
        navegador.textContent = arrayNoms[3]; //Edge
    }
    else if (infoNav.includes("Safari") && infoNav.includes("Chrome")){
        navegador.textContent = arrayNoms[2]; //Safari
    }
    else{
        navegador.textContent = arrayNoms[4]; //Altres
    }
}

// Mostrar informació del navegador
mostrarInfoNavegador();

console.log(navegadorWeb);

// URL
const mostrarUrl = () => {
    url.textContent = navegadorWeb.url;
}

// Mostrar URL
mostrarUrl();

// Començar partida
const comencarPartida = (event) => {
    event.preventDefault();

    const botoJugador1Ok = validarBotoPlayer1();
    const botoJugador2Ok = validarBotoPlayer2();
    const nomJugador1Ok = validarNomPlayer1();
    const nomJugador2Ok = validarNomPlayer2();

    if(!botoJugador1Ok && !botoJugador2Ok){
        botoJugador1.focus();
        return;
    }
    else if(botoJugador1Ok){
        if(!nomJugador1Ok){
            inputJugador1.focus();
            return;
        }
    }
    else if(botoJugador2Ok){
        if(!nomJugador1Ok){
            inputJugador1.focus();
            return;
        }
        else if(!nomJugador2Ok){
            inputJugador2.focus();
            return;
        }
    }

    /* ==========================================================================
   Guardar informació abans de començar el joc
   ========================================================================== */

    /* ---SESSIONSTORAGE--- */
    // Guardem l'objecte navegadorWeb amb la info del navegador
    sessionStorage.setItem("navegadorWeb", JSON.stringify(navegadorWeb));

    /* ---COOKIE--- */
    // Guardem el nom dels jugadors
    document.cookie = "jugador1=" + encodeURIComponent(nomJugador1);
    document.cookie = "jugador2=" + encodeURIComponent(nomJugador2);

    form.reset();

    window.location.assign("joc.html");
}


const esborrarPuntuacio = () => {
    const confirmacio = confirm("Estàs segur que vols esborrar la informació de la puntuació?");

    if (confirmacio){
        localStorage.removeItem("nomJugador1");
        localStorage.removeItem("record");
        localStorage.removeItem("dataRecord");

        record=null;
    }

    mostrarPuntuacio();
}

/* ==========================================================================
   Events
   ========================================================================== */

// Validacions de jugador
botoJugador1.addEventListener("change", validarBotoPlayer1);
botoJugador2.addEventListener("change", validarBotoPlayer2);

/* ---Validacions de l'input dels jugadors--- */
// Validació del jugador 1
inputJugador1.addEventListener("blur", validarNomPlayer1);
inputJugador1.addEventListener("change", validarNomPlayer1);

// Validació del jugador 2
inputJugador2.addEventListener("blur", validarNomPlayer2);
inputJugador2.addEventListener("change", validarNomPlayer2);

// Començar partida
form.addEventListener("submit", comencarPartida);

// Esborrar puntuació
botoEsborrar.addEventListener("click", esborrarPuntuacio);