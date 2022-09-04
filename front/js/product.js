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
    console.log(ficheProduit);
    stockagePanier(ficheProduit);
  });
// .catch((error) => {
//   // En cas de probleme
//   alert("Error"); // j'ajoute un message d'erreur
// });

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
/* --------------------------CREATION DU LOCALSTORAGE----------------------- */
// ----------------------------------------------------------------------------

//creation des variables qui me seront utiles
let boutonPanier = document.getElementById("addToCart");
let imageUrl = document.querySelector("item__img");

// //configuration de l'evenement au clic du bouton "ajouter au panier"
const stockagePanier = () => {
  boutonPanier.addEventListener("click", (event) => {
    let selectColors = document.getElementById("colors").value;
    let selectQuantity = document.getElementById("quantity").value;
    let selectPrix = document.getElementById("price").textContent * selectQuantity;
    
    // je prepare l'envoie d'un objet avec la variable "produit"
    let produits = {
    id: idUrl,
    image: imageUrl,
    name: title.textContent,
    price: selectPrix,
    color: selectColors,
    quantity: selectQuantity,
    };
    //je transforme l'objet "produits" en fichier .json avant de l'envoyer dans le localstorage
    let produitJson = JSON.stringify(produits);

    // ----------------------------------------------------------------------------
    /* -----------------------j'envoie dans le localstorage--------------------- */

    if (colors.value === "" || quantity.value <= 0 || quantity.value > 100 ) {
      alert("Choisissez une couleur ou une quantité d'article entre 1 et 100")
    } else {
      //j'envoie l'objet dans le localstorage
      localStorage.setItem("objet", produitJson);
      alert("Article(s) ajouté au panier avec succes")
    }

    if (produitJson) {

    } else {

    }
  });
};
