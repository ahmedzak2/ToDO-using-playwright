import { APIRequestContext } from "@playwright/test";

export default  class createApi{
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