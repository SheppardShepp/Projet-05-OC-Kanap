// ----------------------------------------------------------------------------
/* -------------------------APPEL AU LOCAL STORAGE-------------------------- */
// ----------------------------------------------------------------------------
const keyStorage = "commande";
// Je prépare ma recupération de ma clé "commande" depuis le local storage

const commande = JSON.parse(localStorage.getItem(keyStorage)) || {};
// le localstorage retourne ma clé en type string que je transforme du format JSON au format Javascript
// Si "panierBrut" était "null", alors j'ai un object vide en valeur par defaut

let tabCmd = Object.values(commande);
//Object.values me renvoie un tableau de l'objet "commande"


// ----------------------------------------------------------------------------
/* -------------------------APPEL AU LOCAL STORAGE-------------------------- */
// ----------------------------------------------------------------------------
let totalQty = document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");
//variable necessaire pour le total du panier
//j'identify mes 2 id de la page html

let panierTotalPrix = 0;
let panierTotalQuantité = 0;
//variable necessaire pour le calcul du panier


// ----------------------------------------------------------------------------
/* ------------------------DECLARATION DES FONCTIONS------------------------ */
// ----------------------------------------------------------------------------
//Fonction de création du panier
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
         deletePanier(btnSupprimer, tabPanier._id, panier.color)

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
//j'appel ma fonction
addPanier();

//fonction pour la modification du panier
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

//fonction pour la suppression d'un article du panier
function deletePanier(btnSupprimer, id, color) {
  //j'ecouter l'evenement au clic sur le bouton supprimer
  btnSupprimer.addEventListener('click', function () {
    deleteStorage(id, color)
    btnSupprimer.closest("article").remove(commande)
  })
}

//fonction pour supprimer un article du panier
function deleteStorage (id, color){
  //je recupere un objet avec les info du local storage
  let deleteCommand = recupStorage()
  //je converti l'objet de mon local en tableau
  let tabDeleteCommand = Object.entries(deleteCommand)

  let newCart = {}
  tabDeleteCommand.forEach(([uniqueKey, item]) => {
    if(item.id != id || item.color != color) {
      newCart[uniqueKey] = item 
    }
    // let objetTabDeleteCommand = Object.assign({}, tabDeleteCommand);
    //   console.log(objetTabDeleteCommand);
    localStorage.setItem(keyStorage, JSON.stringify(newCart));

  })
  updateDom(newCart); 
}

//fonction pour appeller le contenu de mon localstorage
function recupStorage () {
  return JSON.parse(localStorage.getItem(keyStorage))
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
  localStorage.setItem(keyStorage, JSON.stringify(commandes));

  return commandes;
}

//fonction pour la mise a jour du DOM
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


// --------------------------------------------------------------------
/* -----------------------GESTION DU FORMULAIRE--------------------- */
// --------------------------------------------------------------------
let regexText = new RegExp("^[A-zÀ-ú \-]+$");
let regexAdress = new RegExp("^[0-9a-zA-Zà-ú '-._]{5,100}$");
let regexEmail = new RegExp("^[a-zA-Z0-9_.-]+@{1}[a-zA-Z.-_]+[.]{1}[a-z]{2,10}$");

//j'identifie le formulaire
let prenom = document.getElementById("firstName");
let prenomInput = prenom.addEventListener("change", function () {
  validForm(prenom, regexText);
})

let nom = document.getElementById("lastName");
let nomInput = nom.addEventListener("change", function () {
  validForm(nom, regexText);
})

let adresse = document.getElementById("address");
let adressInput = adresse.addEventListener("change", function () {
  validForm(adresse, regexAdress);
})

let ville = document.getElementById("city");
let villeInput = ville.addEventListener("change", function () {
  validForm(ville, regexText);
})

let mail = document.getElementById("email");
let mailInput = mail.addEventListener("change", function () {
  validForm(mail, regexEmail);
})

// ********************* fonction formulaire *****************************
const validForm = (input, regex) =>{
  let testSaisieInput = regex.test(input.value);
  let messError = input.nextElementSibling;
  if (testSaisieInput) {
    messError.innerHTML = "Saisie validé."; 
    messError.style.color = "green";

  }else {
    messError.innerHTML = "Saisie non valide. Merci de vérifier votre saisie.";
    messError.style.color = "red";
  }
};


// --------------------------------------------------------------------
/* -----------------------CONFIRMATION COMMANDE--------------------- */
// --------------------------------------------------------------------
let btnCommander = document.getElementById("order");

btnCommander.addEventListener ("click", function () {


  //création de l'objet qui contient les infos clients
  let coordonnées = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value,
  };
  //mon tableau de produit dans le local storage
  let produits = Object.values(recupStorage())
  //je créer mon objet "contact"
  const contact = {coordonnées, produits}

  //j'envoie les donnée au serveur

})