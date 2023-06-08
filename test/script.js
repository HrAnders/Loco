let contacts = [];

function addContact(firstName, lastName, phone){  //diese Klasse übergibt den Vor- und Nachnamen an die Klasse Contact
    let myContact = new Contact(firstName, lastName, phone);
    contacts.push(myContact);
}

