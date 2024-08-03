const scriptURL =
  "https://script.google.com/macros/s/AKfycbwE0Yr9YrK_hmNHLVRxgNE-tNfxEpYQYssP388ELxTu0-59MUZsDx4dnRlJ4oNAWjYzzQ/exec";
const form = document.forms["google-sheet"];

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   fetch(scriptURL, { method: "POST", body: new FormData(form) })
//     .then((response) =>
//       alert("Thanks for Contacting us..! We Will Contact You Soon...")
//     )
//     .catch((error) => console.error("Error!", error.message));
// });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      window.location.href = "thankyou.html";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 5000); // Redirect back after 5 seconds (5000 milliseconds)
    })
    .catch((error) => console.error("Error!", error.message));
});

// form.addEventListener("submit", function (e) {
//   setTimeout(() => {
//     window.location.reload(); // Reload the page after 10 seconds
//   }, 10000);
// });

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Materialize select elements
  var elems = document.querySelectorAll("select");
  M.FormSelect.init(elems);

  // Uppercase conversion for NAME OF THE PUJA
  document.querySelectorAll(".uppercase").forEach(function (element) {
    element.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
    });
  });

  // Format BUDGET and LAST 3 YEARS BUDGET fields
  function formatCurrency(inputId) {
    document.getElementById(inputId).addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, ""); // Remove non-digit characters
      this.value = this.value
        ? "₹" + this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : ""; // Add commas and rupee symbol
    });
  }

  formatCurrency("budget");

  // Validate that all phone numbers are 10 digits
  function validatePhoneNumber(value) {
    return /^\d{10}$/.test(value);
  }

  function validatePhoneNumbers() {
    const phoneIds = [
      "presidents_phone",
      "theme_artists_phone",
      "light_artists_phone",
      "music_artists_phone",
      "decorator_phone",
    ];
    return phoneIds.every((id) =>
      validatePhoneNumber(document.getElementById(id).value.trim())
    );
  }

  form.addEventListener("submit", function (e) {
    var namesValid = checkForDuplicates(contactNames, "name");
    var phonesValid = checkForDuplicates(contactPhones, "phone number");
    var phoneNumbersValid = validatePhoneNumbers();

    if (!namesValid || !phonesValid || !phoneNumbersValid) {
      e.preventDefault(); // Prevent form submission if validation fails
      if (!phoneNumbersValid) {
        alert("Please ensure all phone numbers are 10 digits long.");
      }
    }
  });
});

// Set the current year in the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
