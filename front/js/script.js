// ------------------------------------------------
// Affichage des produits dans la page HTML "index"
// ------------------------------------------------
const affichageProduit = (dataProduit) => {
  //création de la fonction qui ajoutera les produits depuis la promise déclaré au dessus
  //"dataProduit" représente le tableau de donnée

  for (let i = 0; i < dataProduit.length; i++) {
    //Je créer une boucle pour rajouter autant d'article qu'il y a d'article dans le tableau, le resultat est déclaré dans la fonction "produits"
    let produits = dataProduit[i];

    const sectionProduit = document.getElementById("items"); //j'identifie l'id "items" dans fonction "sectionProduit"

    //un lien
    let lienProduit = document.createElement("a"); //je créer sur mon html l'élément "a"
    lienProduit.setAttribute("href", "./product.html?id=" + produits._id); //je declare l'attribut "href" et l'adresse du lien du produit
    sectionProduit.appendChild(lienProduit); //je déclare l'id "item" comme etant le parent de mon lien "a"

    //un article comprenant:
    let articleProduit = document.createElement("article"); //je créer sur mon html l'élément "article"
    lienProduit.appendChild(articleProduit); //je déclare "a" comme etant le parent de "article"

    //une image
    let imgProduit = document.createElement("img"); //je créer sur mon html l'élément "img"
    imgProduit.setAttribute("src", produits.imageUrl); //je declare l'attribut "src" et l'adresse de l'image
    imgProduit.setAttribute("alt", produits.altTxt); //je declare l'attribut "alt" et la descption de l'image
    articleProduit.appendChild(imgProduit); //je déclare "article" comme etant le parent de "img"

    //un titre h3
    let titreProduit = document.createElement("h3"); //je créer sur mon html l'élément "h3"
    titreProduit.classList.add("productName"); //je lui ajoute une class "productName"
    titreProduit.textContent = produits.name; //je rajoute le titre associé
    articleProduit.appendChild(titreProduit); //je déclare "article" comme etant le parent de "h3"

    //un paragraphe
    let descriptionProduit = document.createElement("p"); //je créer sur mon html l'élément "p"
    descriptionProduit.classList.add("productDescription"); //je lui ajoute une class "productDescription"
    descriptionProduit.textContent = produits.description; //rajout de la description a la balise"p"
    articleProduit.appendChild(descriptionProduit); //je déclare "article" comme etant le parent de "p"
  }
};
// ----------------------
// Communication avec API
// ----------------------

//J'envoie une requete au serveur distant et me renvoie une promesse
fetch("http://localhost:3000/api/products")
  .then((reponse) => reponse.json())
  .then((dataProduit) => {
    //Avec ma 2eme promise ".then", les données reçu avec la fonction "dataProduit"
    //et affiché sur le site dans ma fonction "affichageProduit" (déclaré plus bas)
    affichageProduit(dataProduit);
  })
  .catch((error) => {
    // En cas de probleme
    // j'ajoute un message d'erreur
    alert("Error");
  });
