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
// we are no longer instantiating our addressBook instance at the global level. Instead we will instantiate it on line 98. When a variable is globally scoped, any function or method in scripts.js has direct access to it. The problem with global variables is that since they can be accessed anywhere within the document, it becomes very challenging to track which function or line of code is reading from (accessing it) or writing to (assigning a new value) it. 
// let addressBook = new AddressBook(); // we remove this line

// this function does not have to be updated, because it is already expecting the addressBook object to be passed into it
function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li class=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

// in this function we've updated the declaration to include another parameter: 'addressBookParam'. The parameter is the placeholder for the argument that will be passed in when we call the function on line 81
function showContact(contactId, addressBookParam) {
  let contact = addressBookParam.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  let buttons = $("#buttons");
  buttons.empty();
  // using backticks and the special syntax with ${expression} is not jQuery, but a template literal. 
  buttons.append(`<button class='deleteButton' id='${contact.id}'>Delete</button>`);
}

// in this function we've updated the declaration to include a parameter: 'addressBookParam'. The parameter is the placeholder for the argument that will be passed in when we call the function on line 101
function attachContactListeners(addressBookParam) {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.className, addressBookParam);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBookParam.deleteContact(this.id); 
    $("#show-contact").hide();
    // this function call needs to be updated to have the argument being passed in to match the attachContactListeners parameter.
    displayContactDetails(addressBookParam); 
  });
};


$(document).ready(function() {
  // we are instantiating our addressBook object within the scope of the $(document).ready() event listener. Everything within the opening and closing curly brackets of the $(document).ready() will have access to the 'addressBook' variable.
  // since 'addressBook' is no longer available everywhere in scripts.js, we need to pass addressBook as an argument to the functions that need access to the object (whether to read its values or update its values). 
  // To complete this refactor we need to update certain function declarations to have a new parameter, and we need to update certain function calls to pass in a new argument
  // These are the functions that need to be updated to access to the addressBook object within it's new scope:
  // attachContactListeners()
  // showContact()
  let addressBook = new AddressBook();

  // below, we are passing in addressBook as an ARGUMENT
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
    // this function call does not have to be updated, because it is already passing in addressBook as an object
    displayContactDetails(addressBook);
  });
});