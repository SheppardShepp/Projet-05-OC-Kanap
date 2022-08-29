// ----------------------------------------------------------------------------
/* -----------------------RECUPERATION DE L'ID du produit------------------- */
// ----------------------------------------------------------------------------

/*----------------recuperation du lien du produit----------------*/
// const urlProduit = location.href;
// console.log(urlProduit);

// /*----------------recuperation de l'id du produit----------------*/
// const leidUrl = new URL(urlProduit).search;
// console.log(leidUrl);
// const leId = new URLSearchParams(leidUrl);
// console.log(leId);

//const minimisé un maximum
const idUrl = new URLSearchParams(new URL(location.href).search).get("id");




// ----------------------------------------------------------------------------
/* -----------------------------APPEL A L'API ------------------------------ */
// ----------------------------------------------------------------------------
fetch("http://localhost:3000/api/products/" + idUrl) //J'envoie une requete au serveur avec l'id et me renvoie une promesse
  .then((reponse) => reponse.json())
  .then((ficheProduit) => {
    detailProduit(ficheProduit);
  })
  .catch((error) => {
    // En cas de probleme
    alert("Error"); // j'ajoute un message d'erreur
  });



// ----------------------------DECLARATION DES CONSTENTE-------------------------
/* -----------------------j'integre les donnee dans le html------------------- */
// ------------------------------------------------------------------------------
const detailProduit = (ficheProduit) => {
  //selection de la div qui stock l'image
  let [divImg] = document.getElementsByClassName("item__img");
  //j'ajoute une image
  let imgCartProduit = document.createElement("img");
  imgCartProduit.setAttribute(
    "src",
    ficheProduit.imageUrl,
    "alt",
    ficheProduit.altTxt
  );
  divImg.appendChild(imgCartProduit);
  //j'ajoute le nom
  document.getElementById("title").innerText = ficheProduit.name;
  //j'ajoute le prix
  document.getElementById("price").innerText = ficheProduit.price;
  //j'ajoute la descritpion
  document.getElementById("description").innerText = ficheProduit.description;
  //j'ajoute l'option de couleur
  let tableaucolor = ficheProduit.colors;
  let selecteur = document.getElementById("colors");
  for (let i = 0; i < tableaucolor.length; i++) {
    let optioncolor = tableaucolor[i];

    let selectoption = document.createElement("option");
    selectoption.value = optioncolor;
    selectoption.innerHTML = optioncolor;

    selecteur.appendChild(selectoption);
  }
};


// ----------------------------------------------------------------------------
/* -----------------------CREATION DU LOCALSTORAGE------------------- */
// ----------------------------------------------------------------------------

//configuration de l'evenement au clic du bouton

const ajoutPanier = document.querySelector("addToCart")

ajoutPanier.addEventListener("click",function () {
  
})


let stockagePanier = localStorage;

localStorage.getItem('key', value)

