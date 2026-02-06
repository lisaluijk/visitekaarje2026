
/*****************************************************************************
 * Variabelen declareren
 ****************************************************************************/


// ==============================
// API data opahalen
// ==============================
//source:  API data ophalen: code van Justus | ik snap deze code tot nu toe deels

const apiURL = 'https://fdnd.directus.app/items/person/303'
const parentElement = document.getElementById("schoolPasje")

// ==============================
// Light dark mode (deze code gebruik ik omdat ik anders veel dubbele css code heb)
// ==============================

const lightRadio = document.querySelector('input[value="light"]')
const darkRadio = document.querySelector('input[value="dark"]')
//source: https://coreui.io/answers/how-to-detect-dark-mode-in-javascript/#:~:text=The%20most%20reliable%20solution%20is,Use%20window.
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches



/********************************************************************************
 * Functies aanroepen
 ******************************************************************************************/

// ==============================
// Light dark mode 
// ==============================
// source: https://aileenrae.co.uk/blog/programatically-check-uncheck-checkbox-javascript/

if (isDarkMode) {
  darkRadio.checked = true
} else {
  lightRadio.checked = true
}

// ==============================
// API data opahalen
// ==============================

parentElement.classList.add('loading')

fetchJson(apiURL).then(({data}) => {
    data.custom = JSON.parse(data.custom)
    parseCard(data, parentElement)
    
    parentElement.classList.remove('loading')
})

/***************************************************************************************************************
 * Alle functies
 ******************************************************************************/

// ==============================
// API data opahalen
// ==============================

/*
@param{*} userData an object containing user information from 
*/

function parseCard(userData, targetElement) {
    targetElement.innerHTML = `
    <article>
        <h2>${userData.name}</h2>
        <p>${userData.nickname}</p>
        <img src="${userData.profilecard}" alt="cute cat">
        <table> 
            <tr>
                <td>Schoonmaat:</td><td></td>
            </tr>
        </table>
    </article>
    `
}

async function fetchJson(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error)
}