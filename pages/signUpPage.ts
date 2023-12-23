import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/createuser";
import UserAPi from "../APi/userApi";
// yo import base url form config file 

import config from '../playwright.config';
export default  class signUpPage {
    private access_token: string ;
  private userID: string ;
async load(page:Page){
    await page.goto('/signup');

}

private get firstNameInput(){
    return '[data-testid="first-name"]';
}
private get lastNameInput(){
    return '[data-testid="last-name"]';
}
private get emailInput(){
    return '[data-testid="email"]';
}
private get passwordInput(){
    return'[data-testid="password"]';
}
private get confirmPasswordInput(){
    return'[data-testid="confirm-password"]';
}
private get sumbitButton(){
    return'[data-testid="submit"]';
}
async signUp(page:Page,user:User){  
    await page.fill(this.firstNameInput, user.getFirstNAme());
    await page.fill(this.lastNameInput, user.getLastNAme());
    await page.fill(this.emailInput, user.getEmail());
    await page.fill(this.passwordInput, user.getPassword());
    await page.fill(this.confirmPasswordInput, user.getPassword()); // Assuming you want to use the same password for confirmation
  
    await page.click(this.sumbitButton);
}

async signUpByAPi(request:APIRequestContext,user:User,context:BrowserContext){
    const response = await new UserAPi().signup(request,user);
    const responseBody = await response.json();
    this.access_token = responseBody.access_token;
    this.userID = responseBody.userID;
  const firstName = responseBody.firstName;
    await context.addCookies([
        {
          name: "access_token",
          value:this.access_token,
          url: config.use?.baseURL,
        },
        {
          name: "firstName",
          value: firstName,
          url: config.use?.baseURL,
        },
        {
          name: "userID",
          value:  this.userID,
          url: config.use?.baseURL,
        },
      ])

}
getAccessToken(): string {
    return this.access_token;
  }

  getUserID(): string  {
    return this.userID;
  }

}