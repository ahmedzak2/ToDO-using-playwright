import User from '../models/createuser';
import {faker} from '@faker-js/faker';
import { test, expect ,APIRequestContext, request} from '@playwright/test';

export default class UserAPi{

    async signup(request:APIRequestContext ,user:User){   

      return await request.post('/api/v1/users/register', {
            data: {
              email:user.getEmail() ,
              firstName:  user.getFirstNAme(),
              lastName: user.getPassword(),
              password: user.getPassword(),
            }
          });
          
}

}