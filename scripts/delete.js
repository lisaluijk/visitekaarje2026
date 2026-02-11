//source code API data ophalen: Justus ik snap deze code deels
// Declareer vairabelen
const apiURL = 'https://fdnd.directus.app/items/person/303'
const parentElement = document.querySelector('div:nth-of-type(2)')

// Zwengel het script aan...
startLoading(parentElement)

fetchJson(apiURL)
.then(({data}) => {

    parseCustomString(data.custom)
    parseCard(data, parentElement)
    stopLoading(parentElement)
})

// Alle gebruikte functies

/*
@param{*} userData an object containing user information from 
*/

//parse the passed string to JSON and return it
function parseCustomString(string) {
    return JSON.parse(string)
}

//write the passed html to the passed target element
function writeHTML (target, html) {
    target.innerHTML = html
}

// start loading
function startLoading(target) {
    target.classList.add('loading')
}

// stop loading
function stopLoading(target) {
    target.classList.remove('loading')
}

function parseCard(userData) {
    `
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