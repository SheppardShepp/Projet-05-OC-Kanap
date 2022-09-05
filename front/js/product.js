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

//const factorisé un maximum
const idUrl = new URLSearchParams(new URL(location.href).search).get("id");

//creation des variables qui me seront utiles
let boutonPanier = document.getElementById("addToCart");
let image = document.querySelector("item__img");
let imageURL = "";
let imageAlt = "";

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

  // ----------------------------------------------------------------------------
  /* --------------------------CREATION DU LOCALSTORAGE----------------------- */
  // ----------------------------------------------------------------------------

  // //configuration de l'evenement au clic du bouton "ajouter au panier"
  boutonPanier.addEventListener("click", (event) => {
    let selectColors = document.getElementById("colors").value;
    let selectQuantity = document.getElementById("quantity").value;
    let selectPrix =
      document.getElementById("price").textContent * selectQuantity;

    // je prepare l'envoie d'un objet avec la variable "produit"
    let produit = {
      id: idUrl,
      image: imageURL,
      alt: imageAlt,
      name: title.textContent,
      price: selectPrix,
      color: selectColors,
      quantity: selectQuantity,
    };

    /* -----------------------j'envoie dans le localstorage--------------------- */

    //-----je fais une condition pour verifier la saisie de l'utilisateur------
    if (colors.value === "" || quantity.value <= 0 || quantity.value > 100) {
      //si l'utilisateur fais une mauvaise saisie
      alert("Choisissez une couleur ou une quantité d'article entre 1 et 100"); //alors il aura une alerte pour corriger
    } else {
      ajoutProduit(produit);
      alert("Article(s) ajouté au panier avec succes"); //je fais une alerte a l'utilisateur pour confirmer l'envoie au localstorage
    }
  });
};

function ajoutProduit(produit) {
  const kCartKey = "cart";
  // Je recupère mon cart depuis le local storage
  const rawCart = localStorage.getItem(kCartKey); // type: String
  // Comme le localstorage retourne une value de type string
  // Je transofrme l'object JSON en un object Javascript
  // Si jamais rawCart était "null", alors j'ai un object vide en valeur par defaut
  const cart = JSON.parse(rawCart) || {};

  // je crée une variable unique qui me permet de stocké le contenu dans un object
  // cette variable en composé de l'ID et la color
  const uniqueKey = getUniqueKey(produit);
  // J'essaie d'acceder à mon produit
  let existingProduit = cart[uniqueKey];

  if (existingProduit) {
    // si le produit existe on le modifie
    // en incrémentant quantity
    const newCount =
      Number(existingProduit.quantity) + Number(produit.quantity);
    existingProduit.quantity = newCount.toString();
    cart[uniqueKey] = existingProduit;
  } else {
    cart[uniqueKey] = produit;
  }

  // Sans oublier de sauvegarder l'intégralité du cart
  // dans notre beau petit localstorage
  localStorage.setItem(kCartKey, JSON.stringify(cart));
}

function getUniqueKey(produit) {
  return produit.color + "-" + produit.id;
}

// ----------------------------------------------------------------------------
/* -----------------------------APPEL A L'API ------------------------------ */
// ----------------------------------------------------------------------------
fetch("http://localhost:3000/api/products/" + idUrl) //J'envoie une requete au serveur avec l'id et me renvoie une promesse
  .then((reponse) => reponse.json())
  .then((ficheProduit) => {
    detailProduit(ficheProduit);
    imageURL = ficheProduit.imageUrl;
    imageAlt = ficheProduit.altTxt;
    console.log(ficheProduit);
  })
  .catch((error) => {
    // En cas de probleme
    alert("Error"); // j'ajoute un message d'erreur
  });

// new approach

/**
 * @description Add a product to the cart
 * @param {object} product - the product object
 * @returns {void}
 */

/**
 * @param {object} produit - the shit we fu**in sell
 * @returns {string} A unique identifier
 */
