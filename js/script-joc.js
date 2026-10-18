//Canviar la pestanya
document.title = "Nom_Jugador (Guanyades)";

/* ==========================================================================
   Declaració de variables
   ========================================================================== */

//Botons
const botoTornar = document.querySelector("#btn-tornar");
const botoInstruccions = document.querySelector("#btn-instruccions");
const botoComencarPartida = document.querySelector("#btn-comencar");

//Idioma
const idioma = document.querySelector("#idioma");
const idiomaProva = "CA";

//Paraula a endevinar
const inputParaula = document.querySelector("#input-paraula");
let paraulaAEndevinar = "";

//Botó veure paraula
const botoVeureParaula = document.querySelector("#btn-veure-paraula");

//Titol principal
const titol = document.querySelector("#main-title");

//Imatge de globus
const imatgeGlobus = document.querySelector("#img-globus");

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

//Teclat lletres
const teclat = document.querySelector("#teclat-lletres");

const LLETRES_EN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const LLETRES_ESP = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const LLETRES_CA = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//Diàlegs d'error
const dialegError = document.querySelector("#dialeg-error");
const missatgeError = document.querySelector("#missatge-error");
const botoTancarDialeg = document.querySelector("#btn-tancar-error");

/* ==========================================================================
   Funcions
   ========================================================================== */

/* ---TORNAR--- */
//Tornar a la pàgina principal
const tornar = () => {
    const confirmacio = confirm("Estàs segur que vols deixar la partida?");

    if (confirmacio){
        location.assign("index.html");
    }
}

/* ---INSTRUCCIONS--- */
//Popup - Mostrar les instruccions del joc
const mostrarInstruccions = () => {
    window.open(
        "instruccions.html",
        "instruccions del joc",
        "popup,width=400,height=400,left=100,top=100"
    );
}

/* ---PARAULA A ENDEVINAR--- */
//Idioma de la paraula
const establirIdioma = () => {

}

establirIdioma();

//Mostrar paraula a endevinar
const mostrarParaula = () => {
    if (inputParaula.type === "password"){
        inputParaula.type = "text";
        botoVeureParaula.textContent = "🙈";
    }
    else{
        inputParaula.type = "password";
        botoVeureParaula.textContent = "👁️";
    }
}

/* --COMENÇAR PARTIDA-- */
//Començar partida
const comencarPartida = () => {
    const valorParaula = inputParaula.value.trim();
    const patroNum = /[0-9]/;

    if(valorParaula === ""){
        missatgeError.textContent = "Has d’afegir una paraula per poder començar a jugar";
        
        dialegError.showModal();

        return;
    }
    else{
        if (valorParaula.length>=4){
            if (patroNum.test(valorParaula)){
                missatgeError.textContent = "La paraula no pot contenir números";
                
                dialegError.showModal();

                return;
            }
        }
        else{
            missatgeError.textContent = "La paraula ha de contenir més de 3 caràcters";
            
            dialegError.showModal();

            return;
        }
    }

    //Si arribem fins aquí es que la paraula es correcte
    console.log("Paraula correcte");

    // Canviem el títol principal per tants '_' com de llarga sigui la paraula
    titol.textContent = "";
    for(let i=0; i<valorParaula.length; i++){
        titol.textContent += " _ "
    }

    //Dashabilitar botó i input
    paraulaAEndevinar = inputParaula.value;
    inputParaula.value = "";
    botoComencarPartida.disabled = true;
    inputParaula.disabled = true;
    inputParaula.placeholder="Deshabilitat";
}

//Tancar diàleg
const tancarDialeg = () => {
    dialegError.close();
}

//Verificar lletra
const verificarLletra = (event) => {
    const valorParaula = paraulaAEndevinar.toUpperCase();
    let paraulaOculta = titol.textContent;
    let cadenaNova = "";
    let contErrors = 0;
    let lletraEncertada = false;
            
    for(let i = 0; i<valorParaula.length; i++){
        let lletraParaula = valorParaula.charAt(i);
        const lletraTeclat = event.currentTarget.textContent;

        if(lletraParaula===lletraTeclat){
            for(let j=0; j<valorParaula.length; j++){

                if (valorParaula.charAt(j)===lletraTeclat){
                    cadenaNova += " " + lletraTeclat + " ";
                }
                else{
                    cadenaNova += " _ ";
                }

            }
            titol.textContent = cadenaNova;
            lletraEncertada = true;
        }
    }

    if(!lletraEncertada){
        imatgeGlobus.src = "img/img_globus/img_" + contErrors++ + ".png";
        event.currentTarget.disabled = true;
        return;
    }

    event.currentTarget.disabled = true;
}

//Teclat
const crearTeclat = () => {
    if(idiomaProva==="EN"){
        for(let i = 0; i<LLETRES_EN.length; i++){
            const lletra = document.createElement("button"); //creació de l'element botó
            lletra.textContent = LLETRES_EN[i].toUpperCase();
            lletra.id = "btn-" + LLETRES_EN[i];
            lletra.classList.add ("key-btn");
            lletra.setAttribute("aria-label", "Lletra " + LLETRES_EN[i]);
            lletra.addEventListener("click", verificarLletra);

            teclat.appendChild(lletra); //Afegim al contenidor del tecla
        }
    }
    else if(idiomaProva==="ESP"){
        for(let i = 0; i<LLETRES_ESP.length; i++){
            const lletra = document.createElement("button"); //creació de l'element botó
            lletra.textContent = LLETRES_ESP[i].toUpperCase();
            lletra.id = "btn-" + LLETRES_ESP[i];
            lletra.classList.add ("key-btn");
            lletra.setAttribute("aria-label", "Lletra " + LLETRES_ESP[i]);
            lletra.addEventListener("click", verificarLletra);

            teclat.appendChild(lletra); //Afegim al contenidor del tecla
        }
    }
    else if(idiomaProva==="CA"){
        for(let i = 0; i<LLETRES_CA.length; i++){
            const lletra = document.createElement("button"); //creació de l'element botó
            lletra.textContent = LLETRES_CA[i].toUpperCase();
            lletra.id = "btn-" + LLETRES_CA[i];
            lletra.classList.add ("key-btn");
            lletra.setAttribute("aria-label", "Lletra " + LLETRES_CA[i]);
            lletra.addEventListener("click", verificarLletra);

            teclat.appendChild(lletra); //Afegim al contenidor del tecla
        }
    }
    
    //Si arribem aquí, el teclat s'ha creat correctament
}

//Crida de la funció per crear el teclat;
crearTeclat();


/* ==========================================================================
   Events
   ========================================================================== */

// Tornar a la pàgina principal
botoTornar.addEventListener("click", tornar);

//Mostrar les instruccions del joc
botoInstruccions.addEventListener("click", mostrarInstruccions);

//Mostrar la paraula a endevinar
botoVeureParaula.addEventListener("click", mostrarParaula);

//Començar partida
botoComencarPartida.addEventListener("click", comencarPartida);
botoTancarDialeg.addEventListener("click", tancarDialeg);