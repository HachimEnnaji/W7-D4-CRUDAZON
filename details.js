const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2Y3NDBkOGEyMDAwMThhNDhhNGIiLCJpYXQiOjE3MDE5NTc0OTIsImV4cCI6MTcwMzE2NzA5Mn0.z8qPVn5B-_Qxdv26AsiBjRZ1ctIfG6N4MyAcdx_oSd4";
const requestHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};
const params = new URLSearchParams(window.location.search);
const id = params.get("product");
console.log("product= " + id);
fetch(URL + id, requestHeader)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    } else {
      return response.json();
    }
  })
  .then((object) => {
    const div = document.getElementById("appointment-details");
    const product = document.createElement("div");
    product.innerHTML = `
<div class="card mx-auto" >
<img src="${object.imageUrl}" class="card-img-top mt-3" style="height:250px;
object-fit: contain;" alt="product Image">
<div class="card-body">
<h5 class="card-title"><span class="display-6">${object.name}</span> </h5>
<p class="card-text"><strong> ${object.brand}</strong><br>
    Descrizione:${object.description}<br>
Prezzo: <span class="lead"> ${object.price} € </span> <br>
ID: ${object._id}<br>
Creazione: ${object.createdAt}<br></p>
<div class="d-flex justify-content-around"> <a class="btn btn-secondary " href="./back-office.html?product=${id}" " role="button"><i class="bi bi-pencil"></i></a> <a class="btn btn-danger " href="./back-office.html?product=${id}" " role="button"><i class="bi bi-trash"></i></a></div>
</div>
</div>
    `;
    div.appendChild(product);
  })
  .catch((Error) => {
    console.log("Error" + Error);
  })
  .finally(() => {
    const div = document.getElementById("spinner");
    div.classList.add("d-none");
  });
