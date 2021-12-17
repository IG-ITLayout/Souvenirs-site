"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // выпадающая форма при наведении
  let cardBtn = document.querySelectorAll(".product__card");
  let formShow = document.querySelectorAll(".product__card-form");
  const body = document.querySelector(".product");
  for (let i = 0; i < cardBtn.length; i++) {
    let cardBtnIndex = cardBtn[i];

    cardBtnIndex.addEventListener("mouseenter", function (e) {
      const curentTarget = e.currentTarget;
      curentTarget.classList.add("card-active");
      if (curentTarget.classList.contains("card-active")) {
        for (let i = 0; i < formShow.length; i++) {
          let formShowIndex = formShow[i];
          if (curentTarget.contains(formShowIndex)) {
            formShowIndex.classList.add("product__card-form-active");
          } else {
            formShowIndex.classList.remove("product__card-form-active");
            cardBtnIndex.classList.remove("card-active");
          }
        }
      }
    });
  }

  // Отправка данных на почту
  const form = document.querySelectorAll("#form");
  for (let i = 0; i < form.length; i++) {
    const formItem = form[i];

    formItem.addEventListener("submit", formSend);
    async function formSend(e) {
      e.preventDefault();
      let error = formValidate(formItem);
      let formData = new FormData(form);
      if (error === 0) {
        let cardsItem = document.querySelectorAll(".product__card");
        for (let i = 0; i < cardsItem.length; i++) {
          let cardCurent = cardsItem[i];
          cardCurent.classList.add("_sending");

          let response = await fetch("sendmail.php", {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            cardCurent.classList.remove("_sending");
          } else {
            alert("Ошибка");
            cardCurent.classList.remove("_sending");
          }
        }
      } else {
        alert("Заполните обязательные поля!");
      }
    }

    function formValidate(formItem) {
      let error = 0;
      let formReq = document.querySelectorAll("._req");

      for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);
        if (input.classList.contains("#number, #name")) {
          if (formTest(input)) {
            formAddError(input);
            error++;
          }
        } else {
          if (input.value === "") {
            formAddError(input);
            error++;
          }
        }
      }
      return error;
    }

    function formAddError(input) {
      input.parentElement.classList.add("_error");
      input.classList.add("_error");
    }

    function formRemoveError(input) {
      input.parentElement.classList.remove("_error");
      input.classList.remove("_error");
    }

    function formTest(input) {
      let valid = true;
      if (formItem.number.name.value == "") {
        valid = false;
      }
      return valid;
    }
  }
});
