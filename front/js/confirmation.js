const idUrl = new URLSearchParams(new URL(location.href).search).get("id"); 

document.getElementById ("orderId").textContent = idUrl