console.log('werkt')

const apiURL = 'https://fdnd.directus.app/items/person/303'
const parentElement = document.querySelector('main')

console.log(parentElement.style)

parentElement.classList.add('loading')

fetchJson(apiURL).then(function (response){
    console.log(response.data)
    parentElement.innerHTML = `
    <article>
        <h2>${response.data.name}</h2>
        <p>${response.data.nickname}</p>
        <img src="${response.data.profilecard}" alt="cute cat">
    </article>
    `
    parentElement.classList.remove('loading')
})

async function fetchJson(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error)
}