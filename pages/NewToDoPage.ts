import { APIRequestContext, Page } from "@playwright/test";

 export default class NewToDoPage{


    async load(page:Page){
        await page.goto('/todo/new');
    

    }

    private get sumbitButton(){
        return'[data-testid="submit-newTask"]';
    }

    private get newToDO(){
        return'[data-testid="new-todo"]';
    }
    private get toDoItem(){
        return '[data-testid="todo-item"]';
    }
    
    async todo(page:Page,text:string){
      
        await page.fill(this.newToDO,text );
        await page.click(this.sumbitButton);
        await page.waitForTimeout(20000);
      
    }
 async   gettoDoListItem(page :Page){
return  page.locator(this.toDoItem);

 }
 async createApi( request: APIRequestContext, linkText: string, access_token: string){
    const responseCreate = await request.post('/api/v1/tasks', {
        data: {
          "isCompleted": false,
          "item": linkText,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }
 }