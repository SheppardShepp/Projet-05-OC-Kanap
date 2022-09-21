// ------------------------------------------------------------------------------
// ------------------- DECLARATION DES CONST ET VARIABLE --------------------------
// ------------------------------------------------------------------------------

//recuperation du lien
    //const urlProduit = location.href;
//recuperation de l'id
  //je recherche l'id dans le lien
    //const leidUrl = new URL(urlProduit).search;
  //j'extrait l'id.  
    //const leId = new URLSearchParams(leidUrl);

//const factorisé
const idUrl = new URLSearchParams(new URL(location.href).search).get("id"); 

//creation des variables qui me seront utiles
let boutonPanier = document.getElementById("addToCart");
let image = document.querySelector("item__img");
let imageURL = "";
let imageAlt = "";

// ----------------------------------------------------------------------------
// --------------------------- APPEL A L'API ----------------------------------
// ----------------------------------------------------------------------------

fetch("http://localhost:3000/api/products/" + idUrl)
//J'envoie une requete au serveur avec l'id et me renvoie une promesse
  .then((reponse) => reponse.json())
  .then((tabPanier) => {
    //j'appel ma fonction que m'affichera les details dans la page html
    detailProduit(tabPanier);
  })
  // En cas de probleme
  .catch((error) => {
    // j'ajoute un message d'erreur
    alert("Error"); 
  });

// ----------------------------------------------------------------------------
// ----------------------- CREATION DES FONCTIONS -----------------------------
// ----------------------------------------------------------------------------

const detailProduit = (tabPanier) => {
  //selection de la div qui stock l'image
  let [divImg] = document.getElementsByClassName("item__img");
  //j'ajoute une image
  let imgCartProduit = document.createElement("img");
  imgCartProduit.setAttribute("src", tabPanier.imageUrl, "alt", tabPanier.altTxt);
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

    //----------------------------------------------------------------------------
    //------ je fais une condition pour verifier la saisie de l'utilisateur ------
    //----------------------------------------------------------------------------
    //si l'utilisateur fais une mauvaise saisie
    if (colors.value === "" || quantity.value <= 0 || quantity.value > 100) {
       //alors il aura une alerte pour corriger
      alert("Choisissez une couleur ou une quantité d'article entre 1 et 100");
    } else {
      //sinon j'appel ma fonction qui enregistre dans le localstorage
      ajoutProduit(produit);
      //je fais une alerte a l'utilisateur pour confirmer l'ajout au panier (l'envoie au localstorage)
      alert("Article(s) ajouté au panier avec succes"); 
    }
  });
};

// ----------------------------------------------------------------------------
//-------------------------- ENVOIE AU LOCAL STORAGE --------------------------
// ----------------------------------------------------------------------------

// je crée une fonction unique qui me permet de stocké le contenu dans un object
const getUniqueKey = (produit) => {
  // cette variable me retourne l'ID et la coleur
  return produit.id + "-" + produit.color; 
};

//je crée une fonction pour gerer le stockage dans le localstorage
const ajoutProduit = (produit) => {
  // Je prépare ma recupération de ma clé "commande" depuis le local storage
  const keyStorage = "commande";

  const commande = JSON.parse(localStorage.getItem(keyStorage)) || {};
  // le localstorage retourne ma clé en type string que je transforme du format JSON au format Javascript
    // Si "panierBrut" était "null", alors j'ai un object vide en valeur par defaut

  //j'appel ma fonction créer pour stocké l'id et la couleur
  const uniqueKey = getUniqueKey(produit);

  // J'acceder à mon produit
   let produitExistant = commande[uniqueKey];

  //je crée une condition pour vérifier si le produit existe déjà
    // si le produit existe avec l'id et la meme couleur
  if (produitExistant) {
    //ALORS j'incrémentant les quantités, j'utilise "number" pour transformer le string en nombre
    const newQuantity = Number(produitExistant.quantity) + Number(produit.quantity);
    //puis je repasse le nombre en string
    produitExistant.quantity = newQuantity.toString();
    commande[uniqueKey] = produitExistant;
  } else {
    //sinon je rajoute un nouveau produit au localstorage
    commande[uniqueKey] = produit;
  }
  //Je met un jour mon local storage
  localStorage.setItem(keyStorage, JSON.stringify(commande));
};