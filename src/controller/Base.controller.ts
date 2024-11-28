import { agent,userAuthentication } from "../api/agent.ts";
import { decrypt } from "../api/crypto.ts";

export const checkCredential = async(req, res) => {
    let cred = JSON.parse(decrypt(req.cookies.credetial));
    const logCred = await userAuthentication({ identifier: cred.identifier, password:cred.password });
    return logCred
}