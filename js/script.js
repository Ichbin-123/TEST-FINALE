const url = "http://localhost:3000/recipes";


const recipes = document.querySelector(".recipes");
const detailCard = document.querySelector(".modal");
const detailInner = document.querySelector(".modal-inner");
const closeModal = document.querySelector(".btn--close-modal");
const searchText = document.getElementById("searchText");
const btnSearch = document.getElementById("search");
const btnReset = document.getElementById("reset");

creaGUI(url);




function creaGUI(url){

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

}

btnReset.addEventListener("click", (e)=>{    
    resetGUI();
});

btnSearch.addEventListener("click", (e)=>{
    const ricettaTrovata = searchID();
    if(ricettaTrovata===null){
        alert("Ci dispiace la ricetta non esiste!");
    } else {
        resetGUI();
        recipes.append(createCard(ricettaTrovata));
    }
});

function resetGUI(){
    searchText.value ="";
    let cardContainerIf = document.querySelector(".card-container");
    if(cardContainerIf!==null){
        cardContainerIf.remove();
    }
    creaGUI(url);
}

function searchID(){
    const allCards = document.querySelectorAll("[data-ricetta]");
    const ricettaID = parseInt(searchText.value.trim());
    let min = 1;
    let max = 0;
    allCards.forEach(card => {
        let valore = parseInt(card.dataset.ricetta);
        if(valore>max) max=valore;
        if(valore<min) min=valore;
    });

    if(isNaN(ricettaID) || ricettaID === "" || ricettaID<min || ricettaID > max){
        alert(`Prego inserire un valore tra ${min} e ${max}`);
        searchText.value = "";
    }

    for(let i = 0; i<allCards.length; i++){
        if(ricettaID == parseInt(allCards[i].dataset.ricetta)){
            return restituisciOggettoCard(allCards[i].closest(".recipe"));
        }
    }

    return null;

}



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
        pn.id = `el-${i+1}`;
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

    const hiddenID = document.createElement("p");
    hiddenID.id = data.id;
    hiddenID.dataset.ricetta = data.id;
    hiddenID.hidden = true;

    divRecipe.append(hiddenID, divContent, btnDetails);

    return divRecipe;
}

function createDetailCard(data){

    closeModal.addEventListener("click", (e)=>{
        let cleanModal = document.querySelector(".modal-content")
        if(cleanModal!==null){
            cleanModal.remove();
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
    pIngredienti.id = "ingredienti";
    pIngredienti.classList.add("modal-ingredienti", "modal-description");
    pIngredienti.innerText = data.ingredients.join(", "); // ingredients

    const h3Description = document.createElement("h3");
    h3Description.classList.add("modal-description", "modal-title-description");
    h3Description.innerText = "Description:";
    const pDescription = document.createElement("p");
    pDescription.id = "description";
    pDescription.classList.add("modal-description");
    pDescription.innerText = data.instructions.join(", ");


    divText.append(h2Title, h3Ingredienti,pIngredienti,h3Description,pDescription);
    divContent.append(imgModal, divText);

    return divContent;
}

function restituisciOggettoCard(card){

    const oggettoCard = {

        cuisine : card.querySelector("h2.cucina").innerText,// card.cuisine,
        image : card.querySelector("img").src, //.image,
        name : card.querySelector("h3").innerText, //name,
        difficulty : card.querySelector("#el-1").innerText, //.difficulty,
        caloriesPerServing : card.querySelector("#el-2").innerText, //caloriesPerServing,
        prepTimeMinutes : card.querySelector("#el-3").innerText, //prepTimeMinutes,
        id : card.querySelector("p[data-ricetta]"),
        ingredients : card.querySelector("p#ingredienti").innerText.split(","),
        instructions : card.querySelector("p#desciption").innerText.split(","),
    }

    return oggettoCard;

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