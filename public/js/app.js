console.log("Client side js file loaded");

const weatherForm = document.querySelector("form");
const serach = document.querySelector("input");
const msg1 = document.getElementById("msg-1");
const msg2 = document.getElementById("msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  msg1.textContent = "Loading...";
  msg2.textContent = "";

  const location = serach.value;

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg1.textContent = data.error;
        } else {
          msg1.textContent = data.address;
          msg2.textContent = data.forecast;
        }
      });
    }
  );
});
