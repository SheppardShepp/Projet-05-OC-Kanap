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

//const minimisé
const idUrl = new URLSearchParams(new URL(location.href).search).get("id");

// ----------------------------------------------------------------------------
/* -----------------------------APPEL A L'API ------------------------------ */
// ----------------------------------------------------------------------------
fetch("http://localhost:3000/api/products/" + idUrl) //J'envoie une requete au serveur avec l'id et me renvoie une promesse
  .then((reponse) => reponse.json())
  .then((ficheProduit) => {
    detailProduit(ficheProduit);
  });

// ----------------------------------------------------------------------------
/* -----------------------J'INTEGRE LES DONNEE DANS LE HTML------------------- */
// ----------------------------------------------------------------------------

const detailProduit = (ficheProduit) => {
  //selection de la div qui stock l'image
  let divImg = document.getElementsByClassName("item__img");

  //une image
  let imgCartProduit = document.createElement("img");
  imgCartProduit.setAttribute("src", ficheProduit.imageUrl, "alt", ficheProduit.altTxt);
  divImg[0].appendChild(imgCartProduit);

  //le nom
  document.getElementById("title").innerText = ficheProduit.name;

  // le prix
  document.getElementById("price").innerText = ficheProduit.price;

  //la descritpion
  document.getElementById("description").innerText = ficheProduit.description;

  //option de couleur
  let tableaucolor = ficheProduit.colors;

  let selecteur = document.getElementById ("colors");

  for (let i = 0; i < tableaucolor.length; i++) {
    let optioncolor = tableaucolor[i];

    let selectoption = document.createElement ("option");
    selectoption.value = optioncolor
    selectoption.innerHTML = optioncolor

    selecteur.appendChild(selectoption);
   
  }
};


