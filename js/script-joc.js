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
const bannerTitle = document.querySelector("#banner-main-title");
const titol = document.querySelector("#main-title");

//Imatge de globus
const imatgeGlobus = document.querySelector("#img-globus");

/* ---Tarjeta d'estadístiques del jugador--- */
const nomJugador = document.querySelector("#nom-jugador");
const puntsActuals = document.querySelector("#punts-actuals");
const totalPartides = document.querySelector("#total-partides");
const partidesGuanyades = document.querySelector("#partides-guanyades");
const recordActual = document.querySelector("#record-partida");

//variables de partida
let contErrors = 0;

let punts = 0;
let partides = 0;
let guanyades = 0;
let ratxa = 0;

//Teclat lletres
const teclat = document.querySelector("#teclat-lletres");

const LLETRES_EN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const LLETRES_ESP = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const LLETRES_CA = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//Diàlegs d'error
const dialegError = document.querySelector("#dialeg-error");
const titolError = document.querySelector("#titol-error");
const missatgeError = document.querySelector("#missatge-error");
const imatgeDialeg = document.querySelector('#img-dialog');
const botoTancarDialeg = document.querySelector("#btn-tancar-error");

/* ---RECUPERACIÓ D'INFORMACIÓ--- */
let nomJugadorRecord = localStorage.getItem("nomJugador1");
let record = Number(localStorage.getItem("record"));
let dataRecord = localStorage.getItem("dataRecord");

const navegadorWeb = JSON.parse(sessionStorage.getItem("navegadorWeb"));

const nomJugador1 = llegirCookie("jugador1");

function llegirCookie(nom) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [clau, valor] = cookie.split("=");
        if (clau === nom) {
            return decodeURIComponent(valor);
        }
    }
    return null;
}

//Títol de la pestanya
document.title = nomJugador1 + "(" + guanyades + ")";

/* ==========================================================================
   Funcions
   ========================================================================== */

console.log("Cookie:", document.cookie);
console.log("El nom del jugador1 és: " + nomJugador1);
console.log("El nom amb el record és: " + nomJugadorRecord);
console.log("El record es " + record);
console.log("La data del record es: " + dataRecord)
console.log(navegadorWeb);


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
    idioma.textContent = "Idioma (" + navegadorWeb.idioma + ")";
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

/* ---TARGETA DEL JUGADOR--- */

const mostrarTargetaJugador1 = () => {
    nomJugador.textContent = nomJugador1;
    puntsActuals.textContent = punts;
    totalPartides.textContent = partides;
    partidesGuanyades.textContent = guanyades;

    if (record===null){
        recordActual.textContent = "Encara no establert"
    }
    else{
        recordActual.textContent = dataRecord + " - " + record; 
    }
}

mostrarTargetaJugador1();

/* --------------------- */

/* ---COMENÇAR PARTIDA--- */
//Mostrar títol
const mostrarTitol = (titolAMostrar) =>{
    let titolNou = "";
    
    for(let i=0; i<titolAMostrar.length; i++){
        titolNou += " " + titolAMostrar.charAt(i) + " ";
    }

    titol.textContent = titolNou;
}

//Reiniciar diàleg
const reiniciarDialeg = () => {
    dialegError.classList.remove("dialeg-fi-partida")
    dialegError.classList.add("dialeg-error")
    
    //Treiem la imagte de guanyar o perdre
    imatgeDialeg.src = ""
    imatgeDialeg.alt = ""
    imatgeDialeg.classList.remove("img-dialog")
}

//Començar partida
const comencarPartida = () => {
    const valorParaula = inputParaula.value.trim();
    const patroNum = /[0-9]/;

    if(valorParaula === ""){
        titolError.textContent = "Error"
        missatgeError.textContent = "Has d’afegir una paraula per poder començar a jugar";
        
        reiniciarDialeg();

        dialegError.showModal();

        return;
    }
    else{
        if (valorParaula.length>=4){
            if (patroNum.test(valorParaula)){
                titolError.textContent = "Error"
                missatgeError.textContent = "La paraula no pot contenir números";
                
                reiniciarDialeg();

                dialegError.showModal();

                return;
            }
        }
        else{
            titolError.textContent = "Error"
            missatgeError.textContent = "La paraula ha de contenir més de 3 caràcters";
            
            reiniciarDialeg();

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

    //Reiniciem la clase inicial
    bannerTitle.classList.add("banner-title");
    bannerTitle.classList.remove("banner-title-win");
    bannerTitle.classList.remove("banner-title-lose");

    //Reiniciem puntuació
    punts = 0;

    //Reiniciem punt de partida del globus
    imatgeGlobus.src = "img/img_globus/img_0.png";

    //Dashabilitar botó i input
    paraulaAEndevinar = inputParaula.value; //Guardem la paraula en una variable
    inputParaula.value = "";
    botoComencarPartida.disabled = true;
    inputParaula.disabled = true;
    inputParaula.placeholder="Deshabilitat";
    
    //Buidem el teclat antic
    buidarTeclat();

    //Creem el teclat nou amb tots els botons habilitat
    crearTeclat();

    //Mostrem la tarjeta amb la informació actualitzada
    mostrarTargetaJugador1();
}

/* --- DIALEG --- */

//Tancar diàleg
const tancarDialeg = () => {
    dialegError.close();
}

//Diàleg quan guanyes la partida
const mostrarDialegGuanyar = () =>{
    dialegError.classList.add("dialeg-fi-partida")
    titolError.textContent = "Felicitats"
    missatgeError.textContent = "Has guanyat";
    //imatge del dialeg
    imatgeDialeg.src = "img/gif_guanyar_perdre/guanyar.gif"
    imatgeDialeg.alt = "GIF animat de guanya"
    imatgeDialeg.classList.add("img-dialog")

    dialegError.showModal();
}

//Diàleg quan perds la partida
const mostrarDialegPerdre = () =>{
    dialegError.classList.add("dialeg-fi-partida")
    titolError.textContent = "Oh no!"
    missatgeError.textContent = "Has perdut";
    //imatge del dialeg
    imatgeDialeg.src = "img/gif_guanyar_perdre/perdre.gif"
    imatgeDialeg.alt = "GIF animat de perdre"
    imatgeDialeg.classList.add("img-dialog")
            
    dialegError.showModal();
}

/* ---LÒGICA DE GUANYA I PERDRE--- */

//Guanyar la partida 
const guanyarPartida = () => {
    if(punts>record){
        record=punts;
        dataRecord= new Date();

        /* ---Guardem informació al LOCALSTORAGE--- */
        localStorage.setItem("nomJugador1", nomJugador1);
        localStorage.setItem("record", record);
        localStorage.setItem("dataRecord", dataRecord);
    }
    
    partides++;
    guanyades++;
    bannerTitle.classList.add("banner-title-win");

    //Tornem a habilita el input de la paraula i el botó començar
    botoComencarPartida.disabled = false;
    inputParaula.disabled = false;
    inputParaula.placeholder="Introduceix una paraula";

    //Actualitzem el títol / pestaña
    document.title = nomJugador1 + "(" + guanyades + ")";

    //Mostrem la tarjeta amb la informació actualitzada
    mostrarTargetaJugador1();

    //Reiniciem puntuació, ratxa i contErrors
    punts = 0;
    ratxa = 0;
    contErrors = 0;

    mostrarDialegGuanyar();
}

//Perdre la partida
const perdrePartida = () => {
    if(punts>record){
        record=punts;
        dataRecord= new Date();
        
        /* ---Guardem informació al LOCALSTORAGE--- */
        localStorage.setItem("nomJugador1", nomJugador1);
        localStorage.setItem("record", record);
        localStorage.setItem("dataRecord", dataRecord);
    }
    
    partides++;
    bannerTitle.classList.add("banner-title-lose");

    //Tornem a habilita el input de la paraula i el botó començar
    botoComencarPartida.disabled = false;
    inputParaula.disabled = false;
    inputParaula.placeholder="Introduceix una paraula";

    //Mostrem la tarjeta amb la informació actualitzada
    mostrarTargetaJugador1();

    //Reiniciem puntuació, ratxa i contErrors
    punts = 0;
    ratxa = 0;
    contErrors = 0;

    mostrarDialegPerdre();
}

/* --------------------- */

/* ---LÓGICA DE PUNTS--- */
const puntsPerLletraEncertada = (vegades) => {
    ratxa++;                     //Augmentem +1 la ratxa cada vegada que s'encerta una lletra

    punts += vegades*ratxa;
}

const puntsPerLletraFallada = () => {
    ratxa = 0;                  //Reiniciem la ratxa
    
    if(punts>0){
        punts--;
    }
}

/* --------------------- */

//Verificar lletra
const verificarLletra = (event) => {
    const valorParaula = paraulaAEndevinar.toUpperCase(); // Passem la paraula a majúscula per poder comparar amb les lletres majúscules
    let cadenaNova = "";                                  // Construim el nou String
    let lletraEncertada = false;                          // Controlar si s'encerta la lletra
    const lletraTeclat = event.currentTarget.textContent; // Lletra del botó        
    let vegadesTrobada = 0;                               // Comptador per saber quantes vegades s'ha trobat una lletra

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

            vegadesTrobada++;

            lletraEncertada = true;
        }
        else{
            cadenaNova += "_";
        }
    }
    
    // Si no s'ha encertat la lletra
    if(!lletraEncertada){
        puntsPerLletraFallada();

        console.log(punts);

        // Actualitzem les imatges
        imatgeGlobus.src = "img/img_globus/img_" + ++contErrors + ".png";
        event.currentTarget.disabled = true;    //Deshabilitem el botó de la lletra clickada
        
        //Derrota
        // Si el comptador arriva a 9, es perd la partida
        if (contErrors===9){
            perdrePartida();
        }

        //Mostrem la tarjeta amb la informació actualitzada
        mostrarTargetaJugador1();

        return;
    }
    else{
        puntsPerLletraEncertada(vegadesTrobada);
        console.log(punts); 

        //Mostrem la tarjeta amb la informació actualitzada
        mostrarTargetaJugador1();
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
        guanyarPartida();
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
            
            lletra.disabled = false; //habilitem els botons

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

            lletra.disabled = false; //habilitem els botons

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

            lletra.disabled = false; //habilitem els botons

            teclat.appendChild(lletra); //Afegim al contenidor del tecla
        }
    }
    
    //Si arribem aquí, el teclat s'ha creat correctament
}

//Crida de la funció per crear el teclat;
crearTeclat();

const buidarTeclat = () => {
    teclat.replaceChildren();
}

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