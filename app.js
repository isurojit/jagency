document.addEventListener("DOMContentLoaded", function () {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwE0Yr9YrK_hmNHLVRxgNE-tNfxEpYQYssP388ELxTu0-59MUZsDx4dnRlJ4oNAWjYzzQ/exec";
  const form = document.forms["google-sheet"];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        alert("Thanks for Submitting The Form..! We Will Contact You Soon...");
        setTimeout(() => {
          window.location.reload(); // Reload the page after 2 seconds
        }, 2000);
      })
      .catch((error) => console.error("Error!", error.message));
  });

  // Initialize Materialize select elements
  var elems = document.querySelectorAll("select");
  M.FormSelect.init(elems);

  // Uppercase conversion for NAME OF THE PUJA
  document.getElementById("puja_name").addEventListener("input", function () {
    this.value = this.value.toUpperCase();
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

  // // Prevent duplicate names and phone numbers
  // var contactNames = ["contact_name_1", "contact_name_2", "contact_name_3"];
  // var contactPhones = ["contact_phone_1", "contact_phone_2", "contact_phone_3"];

  // function checkForDuplicates(fieldIds, type) {
  //   var values = fieldIds.map((id) =>
  //     document.getElementById(id).value.trim().toLowerCase()
  //   );
  //   var duplicates = values.filter(
  //     (item, index) => values.indexOf(item) !== index && item !== ""
  //   );
  //   if (duplicates.length > 0) {
  //     alert(
  //       `Duplicate ${type} found: ${duplicates[0]}. Please ensure all ${type}s are unique.`
  //     );
  //     return false;
  //   }
  //   return true;
  // }

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

  // Set the current year in the footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();
});
