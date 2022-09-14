// ------------------------------------------------------------------------------
// -------------------DECLARATION DES CONST et variable------------------------//
// ------------------------------------------------------------------------------

//recuperation du lien et de l'id
//    /*----------------recuperation de l'id du produit----------------*/
//    const urlProduit = location.href; //je recupere le lien du produit
//    const leidUrl = new URL(urlProduit).search; //je recherche l'id dans le lien
//    const leId = new URLSearchParams(leidUrl); //j'extrait l'id.

//const factorisé un maximum
const idUrl = new URLSearchParams(new URL(location.href).search).get("id"); 


//creation des variables qui me seront utiles
let boutonPanier = document.getElementById("addToCart");
let image = document.querySelector("item__img");
let imageURL = "";
let imageAlt = "";

//j'integre les donnee dans le html
const detailProduit = (tabPanier) => {
  //selection de la div qui stock l'image
  let [divImg] = document.getElementsByClassName("item__img");
  //j'ajoute une image
  let imgCartProduit = document.createElement("img");
  imgCartProduit.setAttribute(
    "src",
    tabPanier.imageUrl,
    "alt",
    tabPanier.altTxt
  );
  divImg.appendChild(imgCartProduit);
  //j'ajoute le nom
  document.getElementById("title").innerText = tabPanier.name;
  //j'ajoute le prix
  document.getElementById("price").innerText = tabPanier.price;
  //j'ajoute la descritpion
  document.getElementById("description").innerText = tabPanier.description;
  //j'ajoute l'option de couleur
  let tableaucolor = tabPanier.colors;
  let selecteur = document.getElementById("colors");
  for (let i = 0; i < tableaucolor.length; i++) {
    let optioncolor = tableaucolor[i];

    let selectoption = document.createElement("option");
    selectoption.value = optioncolor;
    selectoption.innerHTML = optioncolor;

    selecteur.appendChild(selectoption);
  }

  // ----------------------------------------------------------------------------
  /* --------------------------CREATION DU LOCALSTORAGE----------------------- */
  // ----------------------------------------------------------------------------

  //configuration de l'evenement au clic du bouton "ajouter au panier"
  boutonPanier.addEventListener("click", (event) => {
    let selectColors = document.getElementById("colors").value;
    let selectQuantity = document.getElementById("quantity").value;

    // je prepare l'envoie d'un objet avec la variable "produit"
    let produit = {
      id: idUrl,
      color: selectColors,
      quantity: selectQuantity,
    };

    /* -----------------------j'envoie dans le localstorage--------------------- */

    //-----je fais une condition pour verifier la saisie de l'utilisateur------
    if (colors.value === "" || quantity.value <= 0 || quantity.value > 100) {
      //si l'utilisateur fais une mauvaise saisie
      alert("Choisissez une couleur ou une quantité d'article entre 1 et 100"); //alors il aura une alerte pour corriger
    } else {
      //sinon j'enregistre dans le localstorage
      ajoutProduit(produit); //j'appel ma fonction qui ajoute la saisie dans le localstorage
      alert("Article(s) ajouté au panier avec succes"); //je fais une alerte a l'utilisateur pour confirmer l'ajout au panier (l'envoie au localstorage)
    }
  });
};

// je crée une fonction unique qui me permet de stocké le contenu dans un object
const getUniqueKey = (produit) => {
  return produit.id + "-" + produit.color; // cette variable me retourne l'ID et la coleur
};

//je crée une fonction pour gerer le stockage dans le localstorage
const ajoutProduit = (produit) => {
  const sousPanier = "commande";
  // Je prépare ma recupération de ma clé "commande" depuis le local storage

  const commande = JSON.parse(localStorage.getItem(sousPanier)) || {};
  // le localstorage retourne ma clé en type string que je transforme du format JSON au format Javascript
  // Si "panierBrut" était "null", alors j'ai un object vide en valeur par defaut

  const uniqueKey = getUniqueKey(produit);
  //j'appel ma fonction créer pour stocké l'id et la couleur

  let produitExistant = commande[uniqueKey];
  // J'essaie d'acceder à mon produit

  //je crée un condition pour vérifier si le produit existe
  if (produitExistant) {
    // si le produit existe avec l'id et la meme couleur
    const newQuantity =
      Number(produitExistant.quantity) + Number(produit.quantity); // j'incrémentant les quantité, j'utilise "number" pour transformer le string en nombre
    produitExistant.quantity = newQuantity.toString(); //puis je repase le nombre en string
    commande[uniqueKey] = produitExistant;
  } else {
    //sinon je rajoute un nouveau produit au localstorage
    commande[uniqueKey] = produit;
  }
  //Jemet un jour mon local storage
  localStorage.setItem(sousPanier, JSON.stringify(commande));
};

// ----------------------------------------------------------------------------
/* -----------------------------APPEL A L'API ------------------------------ */
// ----------------------------------------------------------------------------
fetch("http://localhost:3000/api/products/" + idUrl) //J'envoie une requete au serveur avec l'id et me renvoie une promesse
  .then((reponse) => reponse.json())
  .then((tabPanier) => {
    detailProduit(tabPanier);
  })
  .catch((error) => {
    // En cas de probleme
    alert("Error"); // j'ajoute un message d'erreur
  });
