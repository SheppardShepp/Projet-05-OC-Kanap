//je selectionne la balise <section>
let section = document.getElementById("cart__items");

//je creer <article> dans son parent <section>
let article = document.createElement("article");
article.classList.add("cart__item");
article.dataset.id = {
  /* product, id */
};
article.dataset.color = {
  /* product, color */
};
section.appendChild(article);

// creation de la <div> enfant de <article>
let divPanier = document.createElement("div");
divPanier.classList.add("cart__item__img");
article.appendChild(divPanier);

//creation de la balise <image> enfant de <divPanier>
let imgPanier = document.createElement("img");
imgPanier.setAttribute("src", " . ", "alt", " . "); //A RAJOUTER LIEN IMG ET DESCRIPTION
divPanier.appendChild(imgPanier);

// creation de la <div> avec la <class = cart__item__content> enfant de <article>
let divContent = document.createElement("div");
divContent.classList.add("cart__item__content");
article.appendChild(divContent);

// creation de la <div> avec la <class = cart__item__description> enfant de <divContent>
let divDescription = document.createElement("div");
divDescription.classList.add("cart__item__description");
divContent.appendChild(divDescription);

//un titre <h2>
let h2Panier = document.createElement("h2");
h2Panier.textContent = "nom produit"; //A RAJOUTER LIEN NOM PRODUIT
divDescription.appendChild(h2Panier);

//un <p> pour la couleur
let pCouleur = document.createElement("p");
pCouleur.textContent = "couleur"; //A RAJOUTER LIEN COULEUR PRODUIT
divDescription.appendChild(pCouleur);

//un <p> pour la prix
let pPrix = document.createElement("p");
pPrix.textContent = "prix"; //A RAJOUTER LIEN COULEUR PRODUIT
divDescription.appendChild(pPrix);

// creation de la <div> avec la <class = cart__item__settings> enfant de <divContent>
let divSetting = document.createElement("div");
divSetting.classList.add("cart__item__settings");
divContent.appendChild(divSetting);

// creation de la <div> avec la <class = cart__item__settings__quantity> enfant de <divSetting>
let divSettingQty = document.createElement("div");
divSettingQty.classList.add("cart__item__settings__quantity");
divSetting.appendChild(divSettingQty);

//creation d'un <p> et d'un input
divSettingQty.innerHTML = `<p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">`; //CHANGER LE VALUE

// creation de la <div> avec la <class = cart__item__settings__delete> enfant de <divContent>
let divDelete = document.createElement("div");
divDelete.classList.add("cart__item__settings__delete");
divSetting.appendChild(divDelete);

//un <p> pour la suppression
let pSup = document.createElement("p");
pSup.textContent = "Supprimer";
pSup.classList.add("deleteItem");
divSetting.appendChild(pSup);
