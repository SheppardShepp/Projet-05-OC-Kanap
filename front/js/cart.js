// ---------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------- DECLARATION DES CONST ET VARIABLE -----------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------


//recupération de ma clé "commande" depuis le local storage
const keyStorage = "commande";

// le localstorage retourne ma clé en type string que je transforme du format JSON au format Javascript
// Si "panierBrut" était "null", alors j'ai un object vide en valeur par defaut
const commande = JSON.parse(localStorage.getItem(keyStorage)) || {};

//Object.values me renvoie un tableau de l'objet "commande"
let tabCmd = Object.values(commande);
let totalQty = document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");
let panierTotalPrix = 0;
let panierTotalQuantité = 0;


// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------- DECLARATION DES FONCTIONS --------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//Fonction de création du panier
const addPanier = () => {
  // je crée une boucle pour parcourir les article stocké dans le localstorage
  for (const panier of tabCmd) {
    //J'envoie une requete au serveur avec l'id
    fetch("http://localhost:3000/api/products/" + panier.id)
      .then((reponse) => reponse.json())
      .then((tabPanier) => {
        let sectionPanier = document.getElementById("cart__items");
        //je crée l'article
        const article = document.createElement("article");
        //je lui ajoute le class
        article.classList.add("cart__item");
        //je lui attribu des data
        article.setAttribute("data-id", "{product-ID}")
        article.setAttribute("data-color", "{product-color}")
        //je rajoute le contenu de l'article
        //je recuepre les ifnormation dans l'api et dans le local storage
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

        // ***************** AFFICHAGE DU TOTAL PANIER ****************************
        //j'addition les quantité de chaque article dans le panier
        //parseInt analyse une chaîne de caractère pour renvoyer un nombre entier
        panierTotalQuantité += parseInt(panier.quantity);
        //je l'integre au html
        totalQty.textContent = panierTotalQuantité;
        //j'additionne les resultats de chaque article où le prix est multiplier par la quantité
        panierTotalPrix += panier.quantity * tabPanier.price;
        //je l'integre au html
        totalPrice.textContent = panierTotalPrix;

        // ********************* MODIFICATION DU PANIER ****************************
        //j'identifie mon input
        let [canap] = article.getElementsByTagName("input");
        //j'appel ma fonction pour la modification du panier
        modifPanier(canap, tabPanier._id, panier.color);

        // ********************* SUPPRESSION DU PANIER ****************************
        //j'identifie mon bouton "supprimer"
        let [btnSupprimer] = article.getElementsByClassName("deleteItem")
        //j'appel ma fonction pour supprimer un article du panier
        deletePanier(btnSupprimer, tabPanier._id, panier.color)
      })
      // En cas de probleme
      .catch((error) => {
        // j'ajoute un message d'erreur dans la console qui me renvera l'erreur en question.
        console.log(error); 
      });
  }
  
  //j'appel ma fonction pour mettre a jour mon DOM
  updateDom(tabCmd)
};

// ************************** GESTION DU PANIER *********************************

//fonction pour la modification du panier
function modifPanier (canap, id, color) {
  //j'ecouter l'evenement a la modification de la quantité
  canap.addEventListener('change', function (event) {
    // recup quantité
    const newqty = event.target.value;
    // 1 - mise a jour du local storage
    const commandes = majStorage(id, color, newqty)
    // 2 - mise a joru du DOM
    updateDom(commandes); 
  })
}

//fonction pour la suppression d'un article du panier
function deletePanier(btnSupprimer, id, color) {
  //j'ecouter l'evenement au clic sur le bouton supprimer
  btnSupprimer.addEventListener('click', function () {
    //j'appel ma fonction de suppression dans le storage
    deleteStorage(id, color)
    //je supprime l'article du DOM et du storage
    btnSupprimer.closest("article").remove(commande)
  })
}

// ************************** GESTION DU STORAGE *********************************

//fonction pour recuperer le contenu de mon local storage
function recupStorage () {
  return JSON.parse(localStorage.getItem(keyStorage))
}

//fonction pour mettre a jour mon local storage
function majStorage (id, color, newqty) {
  // - recuperer les donné de la commande
  let updateStorage = recupStorage();
  // j'identifie la commande (id + couleur)
  let uniqueKey = id + '-' + color;
  let commande = updateStorage[uniqueKey];
  // je modifie la quantité
  commande.quantity = newqty;
  // je maj les donnée du tableau a jour
  updateStorage[uniqueKey] = commande;
  // je met a jour le local storage
  localStorage.setItem(keyStorage, JSON.stringify(updateStorage));
  //je retourne pour avoir le resultat de la mise a jour
  return updateStorage;
}

//fonction pour supprimer un article du local storage
function deleteStorage (id, color){
  //je recupere un objet avec les info du local storage
  let deleteCommand = recupStorage()
  //je converti l'objet en tableau
  let tabDeleteCommand = Object.entries(deleteCommand)
  //je créer un objet vide
  let newCart = {}
  //je fais une recherche dans le tableau 
  tabDeleteCommand.forEach(([uniqueKey, item]) => {
    if(item.id != id || item.color != color) {
      newCart[uniqueKey] = item 
    }
    //je met a jour le storage
    localStorage.setItem(keyStorage, JSON.stringify(newCart));
  })
  //j'appel ma fonction pour al mise a jour du DOM
  updateDom(newCart); 
}

// **************************** GESTION DU DOM ***********************************

//fonction pour la mise a jour du DOM
function updateDom (commandes) {
  //je fais un tableau "commandes"
  let cmds = Object.values(commandes)
  //j'initialise mes valeurs a zéro
  let ttStorageQty = 0;
  let ttStoragePrix = 0;
  //ajout du prix global dans le html
  totalPrice.textContent = ttStoragePrix

  for (let i = 0; i < cmds.length; i++) {
    const { id, quantity } = cmds[i];
    //Calcul de quantité de produit du panier
    ttStorageQty += parseInt(quantity);
    //calcul du prix de chaque article dans le panier
    fetch("http://localhost:3000/api/products/" + id)
    .then((reponse) => reponse.json())
    .then((canapProduit) => {
      ttStoragePrix += quantity * canapProduit.price
      totalPrice.textContent = ttStoragePrix
    })
  }
  //ajout des quantité globale au html
  totalQty.textContent = ttStorageQty
}

// ********************* VALIDATION SAISIE FORMULAIRE *****************************

const validForm = (input, regex) =>{
  //variable qui me permet de tester mes saisie avec les regex
  let testSaisieInput = regex.test(input.value);
  //variable qui me permet de faire un message d'erreur en cas de mauvaise saisie
  let messError = input.nextElementSibling;
  if (testSaisieInput) {
    messError.textContent = "Saisie validé."; 
    messError.style.color = "green";
  }else {
    messError.textContent = "Saisie non valide. Merci de vérifier votre saisie.";
    messError.style.color = "red";
  }
  return testSaisieInput
};

// ---------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------APPEL DE LA FONCTION-------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//j'appel ma fonction pour afficher on panier
addPanier();

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------GESTION DU FORMULAIRE--------------------------------------------------------- 
// ---------------------------------------------------------------------------------------------------------------------------------

// préparation des regex pour la saisie du formulaire
let regexText = new RegExp("^[A-zÀ-ú \-]+$");
let regexAdress = new RegExp("^[0-9a-zA-Zà-ú '-._]{5,100}$");
let regexEmail = new RegExp("^[a-zA-Z0-9_.-]+@{1}[a-zA-Z.-_]+[.]{1}[a-z]{2,10}$");
// j'initialise mes champs de saisie sur false
let validator = {
  prenom: false, 
  nom: false, 
  address: false, 
  ville: false, 
  email: false
}
// **************************** SAISIE DU FORMULAIRE ***********************************
//j'identifie le champs de saisie
let prenom = document.getElementById("firstName");
// j'écoute l'evenement au changement dans la saisie
let prenomInput = prenom.addEventListener("change", function () {
  //pour chaque saisie je test son contenu avec une fonction
  validator.prenom = validForm(prenom, regexText);
})

let nom = document.getElementById("lastName");
let nomInput = nom.addEventListener("change", function () {
  validator.nom = validForm(nom, regexText);
})

let adresse = document.getElementById("address");
let adressInput = adresse.addEventListener("change", function () {
  validator.address = validForm(adresse, regexAdress);
})

let ville = document.getElementById("city");
let villeInput = ville.addEventListener("change", function () {
  validator.ville = validForm(ville, regexText);
})

let mail = document.getElementById("email");
let mailInput = mail.addEventListener("change", function () {
  validator.email = validForm(mail, regexEmail);
})

// **************************** VALIDATION DE LA COMMANDE ***********************************

//je bloque la soumission du formaulaire initialement par default
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
  })
})

//je prépare l'action au clic du bouton "commander"
let btnCommander = document.getElementById("order");
btnCommander.addEventListener ("click", function () {
  //création de l'objet qui contient les infos clients
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value,
  };
  //je recupere les donnee du local storage
  let storage = Object.values(recupStorage())
  //je créer un tableau vide en vue d'y injecter des deonnées
  let products = []
  for (let i = 0; i < storage.length; i++) {
    //j'extrait les id des info de mon local storage
    const idProduit = storage[i].id;
    //j'injecte les id dans le tableau
    products.push(idProduit)
  }

  //je créer mon objet "contact"
  const objetContact = {contact, products}

  //condition pour verifier si mon formulaire est remplis correctement avant l'envoie
  if (!validator.prenom || !validator.nom || !validator.address || !validator.ville || !validator.email) {
    //ALORS j'envoie une alerte a l'utilisateur
    alert("Merci de respecter les champs de saisie.")  
    //SINON
  }else {
    //j'envoie les donnees a l'API
    fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //j'envoie mon objet au format JSON
    body: JSON.stringify(objetContact)
  })
    .then((reponse) => reponse.json())
    .then((data) => {
    //je renvoie vers la page confirmation
    document.location.href = "./confirmation.html?id=" + data.orderId;
    })
    .catch((error) => {
      // En cas de probleme
      // j'ajoute un message d'erreur dans le consolequi me renvera l'erreur en question.
      console.log(error); 
    });
  }
})
