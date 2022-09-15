// ----------------------------------------------------------------------------
/* -------------------------APPEL AU LOCAL STORAGE-------------------------- */
// ----------------------------------------------------------------------------

const monStorage = "commande";
// Je prépare ma recupération de ma clé "commande" depuis le local storage

const commande = JSON.parse(localStorage.getItem(monStorage)) || {};
// le localstorage retourne ma clé en type string que je transforme du format JSON au format Javascript
// Si "panierBrut" était "null", alors j'ai un object vide en valeur par defaut

let tabCmd = Object.values(commande);
//Object.values me renvoie un tableau de l'objet "commande"

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------


//variable necessaire pour le total du panier
//j'identify mes 2 id de la page html
let totalQty = document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");

//variable necessaire pour le calcul du panier
let panierTotalPrix = 0;
let panierTotalQuantité = 0;


// ----------------------------------------------------------------------------
/* --------------------INTEGRATION DANS LA PAGE HTML------------------------ */
// ----------------------------------------------------------------------------
const addPanier = () => {
  //je créer une fonction qui recupere les informations dans le local storage, et dans l'api
  //je recupere dans le localstrorage l'id, la couleur et la quantité
  //je recupere dans l'api le nom, le prix, l'image, la description d'image et de l'article
  // puis j'injecte le tout dans le html
  for (const panier of tabCmd) {
    // je crée une boucle pour parcourir les article stocké dans le localstorage
    fetch("http://localhost:3000/api/products/" + panier.id) //J'envoie une requete au serveur avec l'id
      .then((reponse) => reponse.json())
      .then((tabPanier) => {
        let sectionPanier = document.getElementById("cart__items");
        //je lui injecte un contenu en recupérant les info soit dans le local soit dans l'api
        //je crée l'article
        const article = document.createElement("article");
        //je lui ajoute le class
        article.classList.add("cart__item");
        //je lui attribu des data
        article.setAttribute("data-id", "{product-ID}")
        //je lui attribu des data
        article.setAttribute("data-color", "{product-color}")
        //je rajoute le contenu de l'article
        article.innerHTML = ` <div class="cart__item__img">
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
                              </div>`
        //je declare que sectionPanier est le parent de article
        sectionPanier.appendChild(article);


        // --------------------------------------------------------------------
        /* -------------------AFFICHAGE DU TOTAL PANIER--------------------- */
        // --------------------------------------------------------------------

        //j'addition les quantité de chaque article dans le panier
        //parseInt analyse une chaîne de caractère pour renvoyer un nombre entier
        panierTotalQuantité += parseInt(panier.quantity);
        //je l'integre au html
        totalQty.textContent = panierTotalQuantité;
        //j'additionne les resultats de chaque article où le prix est multiplier par la quantité
        panierTotalPrix += panier.quantity * tabPanier.price;
        //je l'integre au html
        totalPrice.textContent = panierTotalPrix;


        // --------------------------------------------------------------------
        /* ----------------------MODIFICATION DU PANIER--------------------- */
        // --------------------------------------------------------------------

        //j'identifie mon input
        let [canap] = article.getElementsByTagName("input");

        //j'appel ma fonction pour la modification du panier
        modifPanier(canap, tabPanier._id, panier.color);

        // --------------------------------------------------------------------
        /* -----------------------SUPPRESSION DU PANIER--------------------- */
        // --------------------------------------------------------------------

        //j'identifie mon bouton "supprimer"
        let [btnSupprimer] = article.getElementsByClassName("deleteItem")

         //j'appel ma fonction pour supprimer un article du panier
        supPanier(btnSupprimer, tabPanier._id, panier.color)

        // --------------------------------------------------------------------
        // --------------------------------------------------------------------
      })
      .catch((error) => {
        // En cas de probleme
        // j'ajoute un message d'erreur dans al colsole log qui me renvera l'erreur en question.
        console.log(error); 
      });
  }
};

function supPanier(btnSupprimer, id, color) {
  console.log(btnSupprimer, id, color);
  //j'ecouter l'evenement au clic sur le bouton supprimer
  btnSupprimer.addEventListener('click', function () {
    console.log(btnSupprimer);
    deleteStorage(id, color)
    btnSupprimer.closest("article").remove()
  })
}

function deleteStorage (id, color){
  //je recupere les info du local storage
  let deleteCommand = recupStorage()
  let tabDeleteCommand = Object.values(deleteCommand)
  let newCart = []
  tabDeleteCommand.forEach(item => {
    if(item.id != id || item.color != color) {
      newCart.push(item)
    }
  })
  localStorage.setItem(monStorage, JSON.stringify(newCart));
}

//j'appel ma fonction
addPanier();

//je crée ma fonction qui va contenir mon action
function modifPanier (canap, id, color) {
  //j'ecouter l'evenement a la modification de "value"
  canap.addEventListener('change', function (event) {
    // recup quantité
    const newqty = event.target.value;
    // 1 - Updtae local storage
    const commandes = majStorage(id, color, newqty)
    // 2 - Update dom
    updateDom(commandes); 
  })
}

//fonction pour appeller le contenu de mon localstorage
function recupStorage () {
  return JSON.parse(localStorage.getItem(monStorage))
}

//fonction pour mettre a jour mon local storage
function majStorage (id, color, newqty) {
  // - recuprer les commands
  let commandes = recupStorage();
  // - trouver la commande (id + couleur)
  let uniqueKey = id + '-' + color;
  let commande = commandes[uniqueKey];
  // - modifier la quantité
  commande.quantity = newqty;
  // - update les commandes
  commandes[uniqueKey] = commande;
  // - mettre a jour le local storage
  localStorage.setItem(monStorage, JSON.stringify(commandes));

  return commandes;
}

function updateDom (commandes) {
  let cmds = Object.values(commandes)
  let ttStorageQty = 0;
  let ttStoragePrix= 0;

  for (let i = 0; i < cmds.length; i++) {
    const { id, quantity } = cmds[i];
    //Calcul de quantité de produit du panier
    ttStorageQty += parseInt(quantity);

    //calcul du prix de chaque article dans le panier
    fetch("http://localhost:3000/api/products/" + id)
    .then((reponse) => reponse.json())
    .then((canapProduit) => {
      ttStoragePrix += quantity * canapProduit.price
      //ajout du prix global dans le html
      totalPrice.textContent = ttStoragePrix
    })
  }
  //ajout des quantité globale au html
  totalQty.textContent = ttStorageQty
}



