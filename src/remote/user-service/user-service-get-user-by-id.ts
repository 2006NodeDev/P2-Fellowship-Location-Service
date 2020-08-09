import { userServiceBaseClient } from ".";
import { User } from "../../models/User";
import { logger, errorLogger } from "../../utils/logger";

//where are we getting the number from though? and do we need the token stuff?
export const userServiceGetUserById = async (userId:number, token:string) => {
    try{
        let res = await userServiceBaseClient.get(`/users/${userId}`, {
            headers:{
                'Authorization': token
            }
        })
        return res.data
    }catch(e){
        logger.error(e);
        errorLogger.error(e)
        let defaultUser = new User()
        defaultUser.userId = userId
        return defaultUser
    }
}