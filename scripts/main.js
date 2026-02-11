/* MARK: Variabelen;
/*****************************************************************************
 * Variabelen declareren
 ****************************************************************************/
// ==============================
// Light dark mode (deze code gebruik ik omdat ik anders veel dubbele css code heb)
// ==============================

const lightRadio = document.querySelector('input[value="light"]')
const darkRadio = document.querySelector('input[value="dark"]')
//source: https://coreui.io/answers/how-to-detect-dark-mode-in-javascript/#:~:text=The%20most%20reliable%20solution%20is,Use%20window.
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

// ==============================
// API data opahalen
// ==============================
//source:  API data ophalen: code van Justus | ik snap deze code tot nu toe deels

//mezelf
const apiURL = 'https://fdnd.directus.app/items/person/303?fields=id,name,nickname,bio,avatar'
const parentElement = document.getElementById("schoolPasje")

//anderen random
const apiURL2 = 'https://fdnd.directus.app/items/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526&fields=id,name,nickname,bio,avatar'
const parentElement2 = document.getElementById("schoolPasjeAnderen")
let randomClassmate  
let arrayLength



//https://fdnd.directus.app/items/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526&fields=id,name,nickname,bio,avatar

// ==============================
// Boek annimatie
// ==============================
// source: https://www.youtube.com/watch?v=0kD6ff2J3BQ  
// references to dom elements
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");
const paper5 = document.querySelector("#p5");


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
// API data ophalen
// ==============================

parentElement.classList.add('loading')

fetchJson(apiURL).then(({data}) => {
    // data.custom = JSON.parse(data.custom)
    parseCard(data, parentElement)
    parentElement.classList.remove('loading')
})

document.addEventListener("keydown", function (event) {
  if (event.key === "r") {
    console.log("You pressed r!")
    parentElement.classList.add('loading')

    randomClassmate = Math.floor(Math.random() * 52)

    fetchJson2(apiURL2).then(({ data }) => {
        //data.custom = JSON.parse(data.custom)
        parseCard2(data[randomClassmate], parentElement)

        //arrayLength = data.length -1
        
        parentElement.classList.remove('loading')
      })
  }
});


//tweede persoon



// ==============================
// Boek annimatie
// ==============================
// event listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);



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
        <img src="${userData.avatar}">
        <div class="textContent">
          <h2>${userData.name}</h2>
          <p>${userData.nickname}</p>
          <p>${userData.bio}</p>
        </div>
    `
}

async function fetchJson(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error)
}

 
//   let arrayLength = data.length -1
//     console.log(arrayLength)
//     randomClassmate = getRandomInt(arrayLength)

//     console.log("random number:")
//     console.log(randomClassmate);

// // tweede ophalen
// function parseCard2(userData2, targetElement2) {
//   targetElement2.innerHTML = `   
//         <img src="${userData2.avatar}">
//         <div class="textContent">
//           <h2>${userData2[7].name}</h2>
//           <p>${userData2[7].nickname}</p>
//           <p>${userData2.bio}</p>
//         </div>
//     `
// }

function parseCard2(userData2, targetElement2) {
  targetElement2.innerHTML = `   
        <img src="${userData2.avatar}">
        <div class="textContent">
          <h2>${userData2.name}</h2>
          <p>${userData2.nickname}</p>
          <p>${userData2.bio}</p>
        </div>
    `
}


async function fetchJson2(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error)
}

// ==============================
// Boek annimatie
// ==============================
// bussiness logic
let currentLocation = 1;
let numOffPapers = 5;
let maxLocation = numOffPapers + 1;

// functions

function openBook() {
  book.style.transform = "translateX(50%)";
  prevBtn.style.transform = "translateX(-150%)";
  nextBtn.style.transform = "translateX(150%)";
  
}

function closeBook(isAtBeginning) {
  if(isAtBeginning){
    book.style.transform = "translateX(0%)";
  } else {
    book.style.transform = "translateX(100%)";
  }
  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
  if (currentLocation < maxLocation) {
    switch(currentLocation) {
    case 1 : 
      openBook();
      paper1.classList.add("flipped");
      paper1.style.zIndex = 1;
      break;
    case 2 :
      paper2.classList.add("flipped");
      paper2.style.zIndex = 2;
      break;
    case 3 :
      paper3.classList.add("flipped");
      paper3.style.zIndex = 3;
      break;
    case 4 :
      paper4.classList.add("flipped");
      paper4.style.zIndex = 4;
      break;
    case 5 :
      paper5.classList.add("flipped");
      paper5.style.zIndex = 5;
      closeBook(false);
      break;
    default:
      throw new Error("unknown state");
    }
    currentLocation ++;
  }
}

function goPrevPage() {
  if(currentLocation > 1) {
    switch(currentLocation) {
      case 2:
        closeBook(true);
        paper1.classList.remove("flipped");
        paper1.style.zIndex = 5;
        break;
      case 3:
        paper2.classList.remove("flipped");
        paper2.style.zIndex = 4;
        break;
      case 4:
        paper3.classList.remove("flipped");
        paper3.style.zIndex = 3;
        break;
      case 5:
        paper4.classList.remove("flipped");
        paper4.style.zIndex = 2;
        break;
      case 6:
        openBook();
        paper5.classList.remove("flipped");
        paper5.style.zIndex = 1;
        break;
      default:
        throw new Error("unkown state");
    }
    currentLocation --;
  }
}

