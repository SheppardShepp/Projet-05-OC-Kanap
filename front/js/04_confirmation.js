//je recupere l'id dnas le lien de la page
const idUrl = new URLSearchParams(new URL(location.href).search).get("id");
//j'injecte l'id dans le html pour l'affichage du numero de commande
document.getElementById("orderId").textContent = idUrl;

localStorage.clear();
