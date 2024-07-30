document.addEventListener("DOMContentLoaded", function () {
  // Initialize Materialize select elements
  var elems = document.querySelectorAll("select");
  M.FormSelect.init(elems);

  // Uppercase conversion for NAME OF THE PUJA
  document.getElementById("puja_name").addEventListener("input", function () {
    this.value = this.value.toUpperCase();
  });

  // Prevent duplicate names and phone numbers
  var contactNames = ["contact_name_1", "contact_name_2", "contact_name_3"];
  var contactPhones = ["contact_phone_1", "contact_phone_2", "contact_phone_3"];

  function checkForDuplicates(fieldIds, type) {
    var values = fieldIds.map((id) =>
      document.getElementById(id).value.trim().toLowerCase()
    );
    var duplicates = values.filter(
      (item, index) => values.indexOf(item) !== index && item !== ""
    );
    if (duplicates.length > 0) {
      alert(
        `Duplicate ${type} found: ${duplicates[0]}. Please ensure all ${type}s are unique.`
      );
      return false;
    }
    return true;
  }

  document.getElementById("puja-form").addEventListener("submit", function (e) {
    var namesValid = checkForDuplicates(contactNames, "name");
    var phonesValid = checkForDuplicates(contactPhones, "phone number");

    if (!namesValid || !phonesValid) {
      e.preventDefault(); // Prevent form submission if duplicates are found
    }
  });
});
