const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2Y3NDBkOGEyMDAwMThhNDhhNGIiLCJpYXQiOjE3MDE5NTc0OTIsImV4cCI6MTcwMzE2NzA5Mn0.z8qPVn5B-_Qxdv26AsiBjRZ1ctIfG6N4MyAcdx_oSd4";
const requestHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};
const div = document.getElementById("spinner");

fetch(URL, requestHeader)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return response.json();
  })
  .then((object) => {
    object.forEach((smartphone) => {
      const table = document.querySelector("tbody");
      const telephone = document.createElement("tr");
      telephone.innerHTML = `
                                <td ><img src="${smartphone.imageUrl}" class="px-0 ms-auto"   alt="smartphone image"></td>
                                <td ><strong>${smartphone.name}</strong></td>
                                <td><a href="./details.html?product=${smartphone._id}" class="btn btn-secondary text-dark m-1">Scopri di più</a><a href="./back-office.html?product=${smartphone._id}" class="btn btn-secondary text-dark m-1 mx-2"><i class="bi bi-pencil"></i></a></td>
                            `;
      table.appendChild(telephone);

      //   console.log(smartphone);
    });
  })
  .catch((Error) => {
    console.log("error");
  })
  .finally(() => {
    div.classList.add("d-none");
  });

const search = (event) => {
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  div.classList.remove("d-none");
  event.preventDefault();
  const key = document.getElementById("key").value;
  console.log(key);
  fetch(URL, requestHeader)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      return response.json();
    })
    .then((product) => {
      product
        .forEach((smartphone) => {
          if (smartphone.name.includes(key) || smartphone.brand.includes(key)) {
            //   console.log(smartphone);
            const telephone = document.createElement("tr");
            telephone.innerHTML = `
                                <td ><img src="${smartphone.imageUrl}" class="px-0 ms-auto"   alt="smartphone image"></td>
                                <td ><strong>${smartphone.name}</strong></td>
                                <td><a href="./details.html?product=${smartphone._id}" class="btn btn-secondary text-dark">Scopri di più</a><a href="./back-office.html?product=${smartphone._id}" class="btn btn-secondary text-dark mx-2"><i class="bi bi-pencil"></i></a></td>
                            `;
            table.appendChild(telephone);
            div.classList.add("d-none");
          }
        })
        .catch((Error) => {
          console.log("error");
        });
    });
};
