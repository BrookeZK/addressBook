#### Specifications for Address Book 
1. It creates an address book 
 * input: no input necessary
 * output: address book object: {contacts: [], currentId: 0}
2. It creates a contact 
 * input: name, phone number: “brooke”, “503-443-4343”
 * output: contact object: { name: “brooke”, phone: “503-443-4343”}
3. It provides a contact object’s details
 * Input: none
 * output: “brooke, phone: 503-443-4343”
4. It adds a contact to the address book and assigns id
 * input: contact object: { name: “brooke”, phone: “503-443-4343”}
 * output: address book object has 1 contact: {id: 1, name: “brooke”, phone: “503-443-4343”}
5. It finds a contact given an id
 * input: id number 4
 * output: contact object: {id: 4, name: “shawn”, phone: “523-232-2323”}
6. It deletes a contact given an id
 * input: id number 4
 * output: contact object with id 4 removed from address book
