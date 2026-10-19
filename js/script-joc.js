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
let paraulaAEndevinar = ""; //Guardarem la paraula de l'input abans de borrarlo
let paraulaOculta = "";     //Guardarem la paraula transformada en oculta '_ _ _ _'

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
let contErrors = 0;

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
//Mostrar títol
const mostrarTitol = (titolAMostrar) =>{
    let titolNou = "";
    
    for(let i=0; i<titolAMostrar.length; i++){
        titolNou += " " + titolAMostrar.charAt(i) + " ";
    }

    titol.textContent = titolNou;
}

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
    let titolAMostrar = "";

    for(let i=0; i<valorParaula.length; i++){
        titolAMostrar += "_"
    }

    paraulaOculta = titolAMostrar;  // Actualizem la paraula oculta

    mostrarTitol(titolAMostrar);    // Crida a la funció per mostrar bé el títol

    //Dashabilitar botó i input
    paraulaAEndevinar = inputParaula.value; //Guardem la paraula en una variable
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
    const valorParaula = paraulaAEndevinar.toUpperCase(); // Passem la paraula a majúscula per poder comparar amb les lletres majúscules
    let cadenaNova = "";                                  // Construim el nou String
    let lletraEncertada = false;                          // Controlar si s'encerta la lletra
    const lletraTeclat = event.currentTarget.textContent; // Lletra del botó        
    
    for(let i = 0; i<valorParaula.length; i++){
        let lletraParaula = valorParaula.charAt(i);             // Lletra de la paraula a endevinar    
        let lletraParaulaOculta = paraulaOculta.charAt(i);      // LLetra de la paraula oculta (inicialment només són '_')

        // Si en la paraula oculta ja hi ha una lletra, vol dir que és una
        // lletra que s'havia encertat previament i la concatenem
        if (lletraParaulaOculta != '_'){
            cadenaNova += lletraParaulaOculta;

            continue;
        }

        if(lletraParaula===lletraTeclat){
            cadenaNova += lletraTeclat;

            lletraEncertada = true;
        }
        else{
            cadenaNova += "_";
        }
    }
    
    // Si no s'ha encertat la lletra, actualitzem les imatges
    if(!lletraEncertada){
        imatgeGlobus.src = "img/img_globus/img_" + ++contErrors + ".png";
        event.currentTarget.disabled = true;    //Deshabilitem el botó de la lletra clickada
        
        //Derrota
        // Si el comptador arriva a 9, es perd la partida
        if (contErrors===9){
            partides++;
        }

        return;
    }
    
    // Actualizem la paraula oculta
    // Per exemple, la paraula es 'casa' i s'ha clickat la 'a'
    // Paraula oculta serà '_a_a'
    paraulaOculta = cadenaNova;

    console.log(paraulaOculta);

    mostrarTitol(cadenaNova);
    event.currentTarget.disabled = true;    //Deshabilitem el botó de la lletra clickada
    
    //Victoria
    //Si a la paraula oculta no hi ha '_' vol dir que ja s'ha encertat la paraula
    if (!paraulaOculta.includes("_")){
        partides++;
        partidesGuanyades++;
    }
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