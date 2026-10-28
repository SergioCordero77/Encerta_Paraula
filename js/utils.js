// Canvi de classe segons el navegador
function canviarClasseNavegador (infoNav) {

    if (infoNav.includes("Firefox")){
        //Firefox
        return "firefox-color";
    }
    else if (infoNav.includes("Chrome") && infoNav.includes("Safari") && !infoNav.includes("Edg")){
        //Chrome
        return "chrome-color";
    }
    else if (infoNav.includes("Chrome") && infoNav.includes("Safari") && infoNav.includes("Edg")){
        //Edge
        return "edge-color";
    }
    else if (infoNav.includes("Safari") && infoNav.includes("Chrome")){
        //Safari
        return "safari-color";
    }
    else{
        //Altres
        return "altres-color";
    }
}

//Establir idioma del navegador
function mostrarIdioma (navegadorIdioma) {

    if (navegadorIdioma.includes("es")){
        return "ES";
    }
    else if (navegadorIdioma.includes("ca")){
        return "CA";
    }
    else if (navegadorIdioma.includes("en")){
        return "EN";
    }
}