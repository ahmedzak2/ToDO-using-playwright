import { th } from "@faker-js/faker";

export default class User{

    private firstName :string
    private lastName :string
    private Email :string
    private password : string
constructor(
    fristName:string, 
    lastName:string , 
    email:string, 
    password:string
    ) {
    this.firstName=fristName;
    this.lastName=lastName;
    this.Email=email;
    this.password=password;
}
 getFirstNAme(){
    return  this.firstName;
}
 getLastNAme(){
    return  this.lastName;
}
getEmail(){
    return  this.Email;
}

 getPassword(){
    return  this.password;
}
}
