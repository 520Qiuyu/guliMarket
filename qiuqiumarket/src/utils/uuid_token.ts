import { v4 as uuidv4 } from 'uuid';

export const getUuidToken = ()=>{
    let uuid_token = localStorage.getItem("UUID_TOKEN");
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem("UUID_TOKEN",uuid_token as string)
    }
    return uuid_token
}