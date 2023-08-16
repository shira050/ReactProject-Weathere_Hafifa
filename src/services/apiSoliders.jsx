import { API_URL, doApiMethod, doApiGet, USER } from "./apiBasic";
  let currentUser;
  if(localStorage[USER]){
    currentUser= JSON.parse(localStorage[USER]);
} 



export const UpdateMadorSoliders = async (soliders) => {
    debugger
    let url = API_URL + "/updateMadorSoldiers";
    try {
        let resp = await doApiMethod(url, "PUT",
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