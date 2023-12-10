const URL = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxY2Y3NDBkOGEyMDAwMThhNDhhNGIiLCJpYXQiOjE3MDE5NTc0OTIsImV4cCI6MTcwMzE2NzA5Mn0.z8qPVn5B-_Qxdv26AsiBjRZ1ctIfG6N4MyAcdx_oSd4";
const image =
  "https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg";
const params = new URLSearchParams(window.location.search).get("product");
console.log(params);
method = "PUT";
post = "POST";

window.onload = () => {
  if (params) {
    fetch(URL + params, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error", response.status);
        }
        return response.json();
      })
      .then(({ name, brand, description, price }) => {
        document.getElementById("name").value = name;
        document.getElementById("brand").value = brand;
        document.getElementById("description").value = description;
        document.getElementById("price").value = price;
        const edit = document.getElementById("edit");
        edit.classList.remove("btn-primary");
        edit.classList.add("btn-success");
        edit.innerHTML = "Modifica Prodotto";
        const cancel = document.getElementById("delete");
        cancel.classList.remove("d-none");
      })
      .catch((Error) => {
        console.log("Error");
      })
      .finally(() => {
        const div = document.getElementById("spinner");
        div.classList.add("d-none");
      });
  } else {
    const div = document.getElementById("spinner");
    div.classList.add("d-none");
  }
};
const detectedAlert = (typeofEdit, changeClass) => {
  const alert = document.getElementById("alert");
  alert.classList.add(`${changeClass}`);
  alert.innerText = typeofEdit;
  setTimeout(() => {
    alert.innerText = "";
    alert.classList.add("d-none");
  }, 3000);
  console.log(alert);
};
const postIt = (event) => {
  event.preventDefault();
  const newPhone = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("file").value ? document.getElementById("file").value : image,
    price: document.getElementById("price").value,
  };
  const requestHeader = {
    method: params ? method : post,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPhone),
  };
  console.log(requestHeader);
  fetch(params ? URL + params : URL, requestHeader)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (requestHeader.method == "PUT") {
        detectedAlert("Modifica avvenuta con successo", "alert-success");
      } else detectedAlert("Creazione avvenuta con successo", "alert-primary");
      setTimeout(() => {
        window.location.assign("./index.html");
      }, 3000);
    })
    .catch((Error) => {
      console.log("Errore tipo:" + Error);
    })
    .finally(() => {
      const div = document.getElementById("spinner");
      div.classList.add("d-none");
    });
};
const deleteProduct = () => {
  const hasConfirmed = confirm("sei sicuro di voler eliminare il prodotto?");
  if (hasConfirmed) {
    const doubleCheck = confirm("Sicuro, sicuro?");
    if (doubleCheck) {
      fetch(URL + params, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
        })
        .then((deletedObj) => {
          detectedAlert("Hai eliminato la risorsa con successo", "alert-danger");
          setTimeout(() => {
            window.location.assign("./index.html");
          }, 3000);
        })
        .catch((Error) => {
          console.log("houston abbiamo un problema", +Error.status);
        });
    }
  }
};
const details = (show) => {
  const popover = document.getElementById("advice");
  if (show) {
    popover.innerText = "Don't worry if you don't have we'll provide one";
  } else {
    setTimeout(() => (popover.innerText = ""), 2000);
  }
};
