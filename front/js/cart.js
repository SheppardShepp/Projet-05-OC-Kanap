// ----------------------------------------------------------------------------
/* -------------------Récuperation dans le localstorage--------------------- */
// ----------------------------------------------------------------------------

const sousPanier = "commande";
// Je prépare ma recupération de ma clé "commande" depuis le local storage

const commande = JSON.parse(localStorage.getItem(sousPanier)) || {};
// le localstorage retourne ma clé en type string que je transforme du format JSON au format Javascript
// Si "panierBrut" était "null", alors j'ai un object vide en valeur par defaut

tabCmd = Object.values(commande);
//Object.values me renvoie un tableau de l'objet "commande"
console.log(tabCmd);

const addPanier = () => {
  //

  for (const panier of tabCmd) {
    fetch("http://localhost:3000/api/products/" + panier.id) //J'envoie une requete au serveur avec l'id et me renvoie une promesse
      .then((reponse) => reponse.json())
      .then((tabPanier) => {
        let sectionPanier = document.getElementById("cart__items");
        //je lui injecte un contenu
        sectionPanier.innerHTML += `<article class="cart__item" data-id="${panier.id}" data-color="${panier.color}">
                        <div class="cart__item__img">
                          <img src="${tabPanier.imageUrl}" alt="${tabPanier.altTxt}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${tabPanier.name}</h2>
                            <p>${panier.color}</p>
                            <p>${tabPanier.price} €</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté : </p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                      </article>`;
        console.log(tabPanier);
      })
      .catch((error) => {
        // En cas de probleme
        console.log(error); // j'ajoute un message d'erreur
      });
  }
};

addPanier();
// --------------------------------------------------------------------------------
/* -----------------------------en cour d'ecriture------------------------------ */
// --------------------------------------------------------------------------------

//-------- total article---------------
const totalPanier = () => {
  //j'identify mes 2 id de lma page html
  let totalQty = document.querySelector("#totalQuantity");
  let totalPrice = document.querySelector("#totalPrice");
  //j'appel le locastoragepour avoir les finormation mémorisé
  let TotalLocal = localStorage.getItem();

  //étape pour avoir le prix total de la commande
  //etape 1:
  //je dois recuperer les données depuis le local storage
  //etape 2:
  //je dois recuperer les données depuis l'api
  //etape 3 :
  //je dois addition les quantités avec les prix
  //etape 4 :
  //je dois additionn les quantités
};

//---------pour modifier la quantité dans le panier------------
//si
// if (condition) {
// } else {
// }
// let btnQuantite = document.getElementsByClassName("itemQuantity");

// btnQuantite.addEventListener("change", (event) => {});

//pour supprimer l'article du panier
// let btnSup = document.getElementsByClassName("deleteItem");
// console.log("log de btnSup");
// console.log(btnSup);

// btnSup.addEventListener("click", (event) => {
//   let articleCommande = btnSup.closest("article");
// });
