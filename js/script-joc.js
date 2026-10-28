/* ==========================================================================
   Declaració de variables
   ========================================================================== */

//Botons
const botoTornar = document.querySelector("#btn-tornar");
const botoInstruccions = document.querySelector("#btn-instruccions");
const botoComencarPartida = document.querySelector("#btn-comencar");

//Idioma
const idioma = document.querySelector("#idioma");
//const idiomaProva = "CA";

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

/* ---JUGADORS--- */

/* ---Tarjeta d'estadístiques del jugador1--- */
const nomJugador = document.querySelector("#nom-jugador");
const puntsActuals = document.querySelector("#punts-actuals");
const totalPartides = document.querySelector("#total-partides");
const partidesGuanyades = document.querySelector("#partides-guanyades");
const recordActual = document.querySelector("#record-partida");

/* ---Tarjeta d'estadístiques del jugador1--- */
const nomJugadorTarjeta2 = document.querySelector("#nom-jugador2");
const puntsActuals2 = document.querySelector("#punts-actuals2");
const totalPartides2 = document.querySelector("#total-partides2");
const partidesGuanyades2 = document.querySelector("#partides-guanyades2");
const recordActual2 = document.querySelector("#record-partida2");

/* ---VARIABLES DELS JUGADORS --- */

let contErrors = 0;

// Variables Jugador1
let punts = 0;
let partides = Number(localStorage.getItem("partides")) || 0;
let guanyades = Number(localStorage.getItem("guanyades")) || 0;
let ratxa = 0;

// Variables Jugador2
let punts2 = 0;
let partides2 = Number(localStorage.getItem("partides")) || 0;
let guanyades2 = Number(localStorage.getItem("guanyades")) || 0;
let ratxa2 = 0;

//Teclat lletres
const teclat = document.querySelector("#teclat-lletres");

const LLETRES_EN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const LLETRES_ESP = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const LLETRES_CA = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let teclatHabilitat = false;

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

if (dataRecord !== null) {
    dataRecord = new Date(dataRecord).toLocaleString();
}

const navegadorWeb = JSON.parse(sessionStorage.getItem("navegadorWeb"));
const idiomaProva = navegadorWeb.idioma;

const nomJugador1 = llegirCookie("jugador1");
const nomJugador2 = llegirCookie("jugador2");

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

//Ojecte jugador jugador1
const jugador1 = {
    nom: "",
    punts: 0,
    partides: 0,
    guanyades: 0,
    record: 0,
    dataRecord: ""
};

//Assignació d'atribut
jugador1.nom = nomJugador1;
jugador1.punts = punts;
jugador1.partides = partides;
jugador1.guanyades = guanyades;
jugador1.record = record;
jugador1.dataRecord = dataRecord;

//Ojecte jugador2
const jugador2 = {
    nom: "",
    punts: 0,
    partides: 0,
    guanyades: 0,
    record: 0,
    dataRecord: ""
};

//Assignació d'atribut
jugador2.nom = nomJugador2;
jugador2.punts = punts2;
jugador2.partides = partides2;
jugador2.guanyades = guanyades2;
jugador2.record = record;
jugador2.dataRecord = dataRecord;

const arrayJugadors = [jugador1];

if (jugador2.nom !== null && jugador2.nom.trim() !== "") {
    arrayJugadors.push(jugador2);


}

let torn = 0;

/* ==========================================================================
   Funcions
   ========================================================================== */
/*
console.log("Cookie:", document.cookie);
console.log("El nom del jugador1 és: " + nomJugador1);
console.log("El nom amb el record és: " + nomJugadorRecord);
console.log("El record es " + record);
console.log("La data del record es: " + dataRecord)
console.log(navegadorWeb);
console.log("Objecte jugador = ", jugador1);*/

//Canvi del fons de pantalla segons el navegador
document.body.classList.add(canviarClasseNavegador(navigator.userAgent));
navegadorWeb.color = canviarClasseNavegador(navigator.userAgent);

//Funció per actualitzat els atributs del jugador1
const actualitzarJugador1 = () => {
    jugador1.nom = nomJugador1;
    jugador1.punts = punts;
    jugador1.partides = partides;
    jugador1.guanyades = guanyades;
    jugador1.record = record;
    jugador1.dataRecord = dataRecord;
};

actualitzarJugador1();

//Funció per actualitzat els atributs del jugador2
const actualitzarJugador2 = () => {
    jugador2.nom = nomJugador1; //agafar no player2 per cookies
    jugador2.punts = punts2;
    jugador2.partides = partides2;
    jugador2.guanyades = guanyades2;
    jugador2.record = record;
    jugador2.dataRecord = dataRecord;
};

actualitzarJugador2();

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
    idioma.textContent = "Idioma (" + mostrarIdioma(idiomaProva) + ")";
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

/* ---TARGETA DELS JUGADORS--- */

const mostrarTargetaJugador1 = () => {
    nomJugador.textContent = nomJugador1;
    puntsActuals.textContent = punts;
    totalPartides.textContent = partides;

    if (partides===0){
        partidesGuanyades.textContent = guanyades + " - (0%)";
    }
    else{
        partidesGuanyades.textContent = guanyades + " - (" + (guanyades/partides)*100 + "%)";
    }

    if (record===0 || nomJugador1===null){
        recordActual.textContent = "Encara no establert"
    }
    else{
        recordActual.textContent = dataRecord + " - " + record; 
    }
}

const mostrarTargetaJugador2 = () => {
    nomJugador2.textContent = nomJugador2; 
    puntsActuals2.textContent = punts2;
    totalPartides2.textContent = partides2;
    partidesGuanyades2.textContent = guanyades2;

    if (record === 0) {
        recordActual2.textContent = "Encara no establert";
    } else {
        recordActual2.textContent = dataRecord + " - " + record;
    }
};

mostrarTargetaJugador1();
mostrarTargetaJugador2();

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
    // Inglés: lletres de la A a la Z
    const patroEN = /^[A-Za-z]+$/;

    // Español: lletres de la A a la Z y la ñ
    const patroES = /^[A-Za-zñÑ]+$/;

    // Català: lletres de la A a la Z i la ç 
    const patroCA = /^[A-Za-zçÇ]+$/;

    // Establir quin patró utilitzarem segons l'idioma del joc
    let patroIdioma;

    if (mostrarIdioma (idiomaProva) === "EN") {
        patroIdioma = patroEN;
    } else if (mostrarIdioma (idiomaProva) === "ES") {
        patroIdioma = patroES;
    } else if (mostrarIdioma (idiomaProva) === "CA") {
        patroIdioma = patroCA;
    }

    if(valorParaula === ""){
        titolError.textContent = "Error"
        missatgeError.textContent = "Has d’afegir una paraula per poder començar a jugar";
        
        reiniciarDialeg();

        dialegError.showModal();

        return;
    }
    else{
        if (valorParaula.length<4){
            titolError.textContent = "Error"
            missatgeError.textContent = "La paraula ha de contenir més de 3 caràcters";
            
            reiniciarDialeg();

            dialegError.showModal();

            return;
        }

        if (patroNum.test(valorParaula)){
            titolError.textContent = "Error"
            missatgeError.textContent = "La paraula no pot contenir números";
            
            reiniciarDialeg();

            dialegError.showModal();

            return;
        }

        if (!patroIdioma.test(valorParaula)) {
            titolError.textContent = "Error";

            if (mostrarIdioma (idiomaProva) === "EN") {
                missatgeError.textContent = "La paraula només pot contenir lletres vàlides de l'anglès";
            } else if (mostrarIdioma (idiomaProva) === "ES") {
                missatgeError.textContent = "La paraula només pot contenir lletres vàlides de l'espanyol (sense accents)";
            } else if (mostrarIdioma (idiomaProva) === "CA") {
                missatgeError.textContent = "La paraula només pot contenir lletres vàlides del català (sense accents)";
            }
            

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

    //Actualitzem la informació dels jugadors
    actualitzarJugador1();
    actualitzarJugador2();

    //Mostrem les tarjetes amb la informació actualitzada
    mostrarTargetaJugador1();
    mostrarTargetaJugador2();

    //Habilitem el teclat
    teclatHabilitat = true;
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
    missatgeError.textContent = "Has perdut!"
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

    //Guardem les estadístiques de partides i guanyades amb els nous valors
    guardarEstadistiques(partides, guanyades)

    //Tornem a habilita el input de la paraula i el botó començar
    botoComencarPartida.disabled = false;
    inputParaula.disabled = false;
    inputParaula.placeholder="Introduceix una paraula";

    //Actualitzem el títol / pestaña
    document.title = nomJugador1 + "(" + guanyades + ")";

    //Mostrem la tarjeta amb la informació actualitzada
    mostrarTargetaJugador1();
    
    //Actualitzem la informació del jugador1 i la guardem al localStorage
    actualitzarJugador1();

    //Reiniciem puntuació, ratxa i contErrors
    punts = 0;
    ratxa = 0;
    contErrors = 0;

    mostrarDialegGuanyar();

    //Deshabilitem el teclat
    teclatHabilitat = false;
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

    //Guardem les estadístiques de partides i guanyades amb els nous valors
    guardarEstadistiques(partides, guanyades)

    //Tornem a habilita el input de la paraula i el botó començar
    botoComencarPartida.disabled = false;
    inputParaula.disabled = false;
    inputParaula.placeholder="Introduceix una paraula";

    //Mostrem la tarjeta amb la informació actualitzada
    mostrarTargetaJugador1();

    //Actualitzem la informació del jugador1 i la guardem al localStorage
    actualitzarJugador1();

    //Reiniciem puntuació, ratxa i contErrors
    punts = 0;
    ratxa = 0;
    contErrors = 0;

    mostrarDialegPerdre();

    //Deshabilitem el teclat
    teclatHabilitat = false;
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

    if (teclatHabilitat){
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
            event.currentTarget.disabled = true;                    //Deshabilitem el botó de la lletra clickada
            event.currentTarget.classList.add("key-btn-desabled");  //Canviem la classe per assenyalar que el botó està deshabilitat

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
        event.currentTarget.disabled = true;                    //Deshabilitem el botó de la lletra clickada
        event.currentTarget.classList.add("key-btn-desabled");  //Canviem la classe per assenyalar que el botó està deshabilitat
        
        //Victoria
        //Si a la paraula oculta no hi ha '_' vol dir que ja s'ha encertat la paraula
        if (!paraulaOculta.includes("_")){
            guanyarPartida();
        }
    }
}

//Teclat
const crearTeclat = () => {
    if(idiomaProva.includes("EN")){
        console.log("ENtra");
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
    else if(idiomaProva.includes("ES")){
        console.log("teclat");
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
    else if(idiomaProva.includes("CA")){
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

function guardarEstadistiques(partides, guanyades) {
    localStorage.setItem("partides", partides);
    localStorage.setItem("guanyades", guanyades);
};

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