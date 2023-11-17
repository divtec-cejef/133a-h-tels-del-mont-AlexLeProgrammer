/**
* @author      Steve Fallet <steve.fallet@divtec.ch>
* @version     1.0
* @since       2023-10-09
*
* http://usejsdoc.org/
*/

"use strict";

// Récupération des éléments
const txtError = document.querySelector("#message")

const form = document.querySelector("form");
const lisHotel = form.querySelector("#lis_hotel");
const txtNbrChambre = form.querySelector("#txt_nbrChambre");

const divReservation = document.querySelector("#reservation");
const nomHotelReservation = divReservation.querySelector("h2");
const nbrChambreReservation = divReservation.querySelector("#chambre_nombre");
const typeChambreReservation = divReservation.querySelector("#chambre_type");
const listeOptionsReservation = divReservation.querySelector("#options");
const imgReservation = divReservation.querySelector("img");

/**
 * Retourne le nom de l'hotel sélectionné par le visiteur
 * @returns {String} Nom de l'hotêl ou "0" si pas de sélection
 */
function getHotel() {
    return lisHotel.value;
}

/**
 * Retourne le nombre de chambres saisi par le visiteur
 * @returns {Number} Nombre de chambres ou NaN (Not A Number)
 */
function getNbChambre() {
    let nbrChambre = parseInt(txtNbrChambre.value);
    return isNaN(nbrChambre) ? NaN : nbrChambre;
}

/**
 * Retourne le type de chambre sélectionné ou ""
 * @returns {String} Type de chambre ou ""
 */
function getChambre() {
    let chambre = form.querySelector("input[name='opt_type_chambre']:checked");
    return chambre === null ? "" : chambre.value;
}

/**
 * Retourne les options choisies par le visiteur
 * @returns {Array} tableau des éléments checkbox cochés
 */
function getOptions() {
    return form.querySelectorAll("[name='chk_options[]']:checked");
}

/**
 * Valide la saisie utilisateur
 * Retourne un message d'erreur au format HTML "<ul><li>erreur 1</li>...</ul>"
 * ou chaine vide si tout est OK.
 *
 * @returns {String}    Chaine vide si pas d'erreur ou <ul> d'erreurs
 */
function valideSaisie() {
    let errors = "<ul> ";
    let errorFind = false;

    // Ajoute un message d'erreur si l'utilisateur n'a pas sélectionné d'hôtel
    if (getHotel() === "0") {
        errorFind = true;
        errors += "<li>Sélectionnez un hôtel !</li> ";
    }

    // Ajoute un message d'erreur si le nombre de chambre n'est pas entre 1 et 12
    if (isNaN(getNbChambre()) || getNbChambre() < 1 || getNbChambre() > 12) {
        errorFind = true;
        console.log("dswqd");
        errors += "<li>Saisissez un nombre de chambres entre 1 et 12 !</li> ";
    }

    // Ajoute un message d'erreur si l'utilisateur n'a pas séléctionné de type de chambre
    if (getChambre() === "") {
        errorFind = true;
        errors += "<li>Sélectionnez un type de chambre !</li> ";
    }

    if (errorFind) {
        errors += "</ul>";
        return errors;
    }

    return "";
}

/**
 * Affiche la confirmation de réservation
 */
function afficheConfirmation() {
    nomHotelReservation.innerText = getHotel();
    nbrChambreReservation.innerText = getNbChambre();
    typeChambreReservation.innerText = getChambre();

    imgReservation.src = `./images/${getHotel()}.jpg`;

    let options = getOptions();
    for (let option of options) {
        listeOptionsReservation.innerHTML += `<li>${option.value}</li>`;
    }
}

/**
 * Fonction appellé lors de l'envoi du formulaire
 * Test la saisie et affiche la confirmation ou le message d'erreur
 * @param event Objet représentant l'événement
 */
function reserver(event) {
    event.preventDefault();

    // Vide la div message
    txtError.innerHTML = "";

    // Affiche les erreurs si il y en a
    let errors = valideSaisie();
    if (errors === "") {
        afficheConfirmation();
        divReservation.style.display = "block";
    } else {
        txtError.style.display = "block";
        txtError.innerHTML = errors;
    }
}

/**
 * Fonction appellé lors de la réinitialisation du formulaire
 * Cache la div #message et la div #reservation
 * @param event Objet représentant l'événement
 */
function effacer(event) {
    txtError.style.display = "none";
    divReservation.style.display = "none";
}

// Ecoute l'envoie du formulaire
form.addEventListener("submit", reserver);

// Ecoute la réinitialisation du formulaire
form.addEventListener("reset", effacer);