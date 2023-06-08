class Person{
    firstName; //dies sind die erforderlichen Daten, die an die Klasse übergeben werden müssen
    lastName;   // --"--

    constructor(firstName, lastName){ //der Constructor erhält die Parameter bei Instanzierung der Klasse 
        // this gibt an, dass die objektinternen Variablen genutzt werden sollen
        this.firstName = firstName;
        this.lastName = lastName;
    }

    printFullName(){
        console.log(this.firstName + " " + this.lastName);
    }
}