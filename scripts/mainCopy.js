// Declareer vairabelen
const apiURL = 'https://fdnd.directus.app/items/person/303'
const parentElement = document.querySelector('div:nth-of-type(2)')

// Zwengel het script aan...
parentElement.classList.add('loading')

fetchJson(apiURL).then(({data}) => {
    data.custom = JSON.parse(data.custom)
    parseCard(data, parentElement)
    
    parentElement.classList.remove('loading')
})

// Alle gebruikte functies

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