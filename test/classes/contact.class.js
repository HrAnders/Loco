class Contact extends Person{ //Person ist eine SUPERKLASSE und vererbt die darin deklarierten Eigenschaften an Contact

    constructor(firstName, lastName, phone){ 
        super(firstName, lastName); //Aufruf des Parent-Constructors //Übergabe von Parametern, falls diese an das Child-Objekt gegeben werden
        this.phone = phone;
        console.log('New contact created');
    }

    call(){
        window.location.href = 'tel://'+this.phone
    }


}