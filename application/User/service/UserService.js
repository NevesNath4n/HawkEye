import UserRepository from "../../../infrastructure/repositories/UserRepository";

export default class UserService{
    /**
     *
     */
    constructor(userService) {
        this.userService = userService;
        
    }

    async getUserByEmail(email){
        let userInfo = await this.userService.getUserByEmail(email);
        return userInfo;
    }
}