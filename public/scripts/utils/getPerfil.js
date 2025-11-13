import { parseJwt } from "./parseJWT.js";

export function getPerfil(){
    const token = localStorage.getItem("token")
    if (!token){
        return null;
    } 

    const payload = parseJwt(token)
    return payload.perfil;

}