// ----------------------------------------------------------------------------
/* --------------------------intégration a l'html--------------------------- */
// ----------------------------------------------------------------------------

//je selectionne la balise <section>
let section = document.getElementById("cart__items");

//je lui injecte un contenu
section.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="" alt="">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Vert</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p></div>
  </div>
</div>
</article>`