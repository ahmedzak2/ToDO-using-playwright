import { Page } from "@playwright/test";

export class toDoPage{

    private get welcomeText(){
        return '[data-testid="welcome"]';
    }
    welcomeMessagePage(page:Page){
return page.locator(this.welcomeText);
    }
 
    async load(page:Page){
        await page.goto('/todo');  

    }

    private get toDOListItem(){
        return '[data-testid="todo-item"]';
    }

    DoItemMessage(page:Page){
return  page.locator(this.toDOListItem).first();  ;
    }
    

    private get deleteButton(){
        return '[data-testid="delete"]';
    }
    async deleteItem(page:Page){
        await page.click(this.deleteButton); 
    }
    private get noToDOitem(){
        return '[data-testid="no-todos"]';
    }
    noItemMessage(page:Page){
        return  page.locator(this.noToDOitem);

    }

}