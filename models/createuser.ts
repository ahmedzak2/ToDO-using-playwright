import { faker, th } from "@faker-js/faker";

export default class User{

    private firstName :string
    private lastName :string
    private Email :string
    private password : string
    private accesToken :string
    private userID :string
constructor(


    ) {
    this.firstName=faker.person.firstName();
    this.lastName=faker.person.lastName();
    this.Email=    faker.internet.email();
    this.password=faker.internet.password();
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
getAccesToken(){
    return this.accesToken;
}
setAccessToken(access:string){
this.accesToken=access;
}
getUserID(){
    return this.userID;
}
setUserID(userId:string){
    this.userID=userId;
}
}
