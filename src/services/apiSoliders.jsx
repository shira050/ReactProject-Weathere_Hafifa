import { API_URL,  Method,  getRquest, USER } from "./apiBasic";
  let currentUser;
  if(localStorage[USER]){
    currentUser= JSON.parse(localStorage[USER]);
} 



export const UpdateMadorSoliders = async (soliders) => {
    let url = API_URL + "/updateMadorSoldiers";
    try {
        let resp = await  Method(url, "PUT",
            { newSoldiers: soliders },
            {
                user_name: currentUser.name,
                user_mispar_ishi: currentUser.password
            });
        return resp;
    } catch (err) {
        return err.response;
    }
};