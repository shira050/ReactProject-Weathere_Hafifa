import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { UpdateMadorSoliders } from '../../services/apiSoliders';
import { USER } from '../../services/apiBasic';

function SelectedCardsEvents(props) {
    const { soliders, updateSoliders } = useContext(UserContext);
    const {currentUser, selectedCards, setSelectedCards } = useContext(UserContext);
    let {isUpdated,setIsUpdated,basicModal, setBasicModal }=props;
    let localUser;
    if(localStorage[USER]){
        localUser= JSON.parse(localStorage[USER]);
    } 


    const updateSolidersInServer = async () => {
        if (isUpdated) {

            let res = await UpdateMadorSoliders(soliders);
            if (res && res.status == 200) {
                setBasicModal(!basicModal);
                await setIsUpdated(false);
                alert("שינויים נשמרו בהצלחה!")
            }
            else if (res && res.status != 200) {
                alert(res.data.error)
            }
            else {
                alert("שגיאה בשמירת חיילים חדשים נסה שוב...")
            }
        }
        else {
            alert('אין שינויים לשמירה.')
        }
    }

    const clearSelection = () => {
        setSelectedCards([]);
    };
    const handleSelectAll = () => {
           setSelectedCards([...soliders]);
    };
    const deleteSelectedCards = async () => {
       
        const isCurrentUserSelected = selectedCards.some((solider) => (solider.User_Name === localUser.name&&solider.Mispar_Ishi === localUser.password));
    
        if (isCurrentUserSelected) {
            alert('יש לך להתנתק מהמערכת לפני שאתה מוחק את עצמך.');
            return;
        }
    
        const updatedSoliders = soliders.filter((solider) => !selectedCards.includes(solider));
        await updateSoliders(updatedSoliders);
        setSelectedCards([]);
        setIsUpdated(true);
        alert("מחיקה בוצעה בהצלחה!")
    };
    return (
        <div>
            <button color='secondary' onClick={updateSolidersInServer}>
                שמירה
            </button>
            <button color='secondary' onClick={handleSelectAll}>
                בחר הכל
            </button>
            {selectedCards.length > 0 &&
                <>  <button color='secondary' onClick={clearSelection}>
                    נקה הכל
                </button>
                    <button color='secondary' onClick={deleteSelectedCards}>
                        מחיקת מסומנים
                    </button>
                </>}
        </div>
    )
}

export default SelectedCardsEvents