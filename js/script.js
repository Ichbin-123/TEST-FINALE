const url = "http://localhost:3000/recipes";


const recipes = document.querySelector(".recipes");
const detailCard = document.querySelector(".modal");
const detailInner = document.querySelector(".modal-inner");


fetch(url)
    .then(risposta => risposta.json())
    .then(rispostaObj => {
        console.log(rispostaObj);
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        rispostaObj.forEach(data => {
            cardContainer.append(creteCard(data));            
        });
        recipes.append(cardContainer);
    })
    .catch(err => console.log(`Errore: ${err}`));

function creteCard(data){
    const divRecipe = document.createElement("div");
    divRecipe.classList.add("recipe");
    const divContent = document.createElement("div");
    divContent.classList.add("content");
    const h2Cucina = document.createElement("h2");    
    h2Cucina.classList.add("cucina");
    h2Cucina.innerText = `Cucina - ${data.cuisine}`;
    const imgRecipe = document.createElement("img");
    imgRecipe.src = data.image;
    imgRecipe.alt = data.image;
    const h3Nome = document.createElement("h3");
    h3Nome.innerText = data.name;
    const arrayP =  new Array(3);
    for(let i=0; i<3; i++){
        const pn = document.createElement("p");
        arrayP[i] = pn;
    }
    arrayP[0].innerText = `Difficoltà: ${data.difficulty}`;
    arrayP[1].innerText = `Calorie per porzione: ${data.caloriesPerServing}`;
    arrayP[2].innerText = `Tempo di preparazione: ${data.prepTimeMinutes}`;

    divContent.append(h2Cucina, imgRecipe, h3Nome);
    for(let i=0; i<arrayP.length; i++){
        divContent.append(arrayP[i]);
    }

    const btnDetails = document.createElement("button");
    btnDetails.classList.add("btn", "button--product");
    btnDetails.innerText = "Details..."

    divRecipe.append(divContent, btnDetails);

    return divRecipe;
}

function createDetailCard(data){
    
}

/*****************************
CARD:
cuisine < Italian
image > url
name > "Classic Margherita Pizza"
difficulty > Easy
caloriesPerServing > 300
prepTimeMinutes > 20 "min"
<button> > Details

MODAL:
image > url
name > "Classic Margherita Pizza"
ingredients [] < Chicken etc
instructions [] < Season
*******************************/

 /*****************************

*******************************/