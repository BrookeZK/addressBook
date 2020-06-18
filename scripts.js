// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) { // 1 == "1" false
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li class=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId, addressBook) {
  let contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  let buttons = $("#buttons");
  buttons.empty();
  // using backticks and the special syntax with ${expression} is not jQuery, but a template literal. 
  buttons.append(`<button class='deleteButton' id='${contact.id}'>Delete</button>`);
}

function attachContactListeners(addressBook) {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.className, addressBook);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id); 
    $("#show-contact").hide();
    displayContactDetails(addressBook); 
  });
};


$(document).ready(function() {
  let addressBook = new AddressBook();
  attachContactListeners(addressBook);
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    let inputtedFirstName = $("input#new-first-name").val();
    let inputtedLastName = $("input#new-last-name").val();
    let inputtedPhoneNumber = $("input#new-phone-number").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});