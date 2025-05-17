const url = "http://localhost:3000/recipes";


const recipes = document.querySelector(".recipes");
const detailCard = document.querySelector(".modal");
const detailInner = document.querySelector(".modal-inner");
const closeModal = document.querySelector(".btn--close-modal");


fetch(url)
    .then(risposta => risposta.json())
    .then(rispostaObj => {
        console.log(rispostaObj);
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");
        rispostaObj.forEach(data => {
            cardContainer.append(createCard(data));            
        });
        recipes.append(cardContainer);
    })
    .catch(err => console.log(`Errore: ${err}`));



function createCard(data){
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

    btnDetails.addEventListener("click", (e)=>{
        console.log("Hai cliccato");
        console.log("Ciao sono qui: ", e.target.closest(".recipe"));
        detailInner.append(createDetailCard(data));
        detailCard.classList.remove("modal--hidden");
    });

    divRecipe.append(divContent, btnDetails);

    return divRecipe;
}

function createDetailCard(data){

    closeModal.addEventListener("click", (e)=>{
        let vecchio = document.querySelector(".modal-content")
        if(vecchio!==null){
            vecchio.remove();
        }
        detailCard.classList.add("modal--hidden");
    });

    const divContent = document.createElement("div");
    divContent.classList.add("modal-content");
    const imgModal = document.createElement("img");
    imgModal.classList.add("modal-image");
    imgModal.src = data.image;
    imgModal.alt = data.name;

    const divText = document.createElement("div");
    divText.classList.add("modal-text");

    const h2Title = document.createElement("h2");
    h2Title.classList.add("modal-title");
    h2Title.innerText = data.name;

    const h3Ingredienti = document.createElement("h3");
    h3Ingredienti.classList.add("modal-ingredienti", "modal-title-description");
    h3Ingredienti.innerText = "Ingredients:";
    const pIngredienti = document.createElement("p");
    pIngredienti.classList.add("modal-ingredienti", "modal-description");
    pIngredienti.innerText = data.ingredients.join(", "); // ingredients

    const h3Description = document.createElement("h3");
    h3Description.classList.add("modal-description", "modal-title-description");
    h3Description.innerText = "Description:";
    const pDescription = document.createElement("p");
    pDescription.classList.add("modal-description");
    pDescription.innerText = data.instructions.join(", ");


    divText.append(h2Title, h3Ingredienti,pIngredienti,h3Description,pDescription);
    divContent.append(imgModal, divText);

    return divContent;
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
  * 
  * 
  *  <div class="modal-text">
            <h2 class="modal-title"></h2>
            <p class="modal-price"></p>
            <h3 class="modal-title-description">Description:</h3>
            <p class="modal-description">
              
            </p>
            <button class="btn btn--add-to-cart">Add to cart</button>
    </div>
          

*******************************/