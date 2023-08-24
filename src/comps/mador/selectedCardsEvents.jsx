import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { UpdateMadorSoliders } from '../../services/apiSoliders';

function SelectedCardsEvents(props) {
    const { soliders, updateSoliders } = useContext(UserContext);
    const { selectedCards, setSelectedCards } = useContext(UserContext);
    let {isUpdated,setIsUpdated,basicModal, setBasicModal }=props;


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
        const allIds = soliders.map((solider) => solider.Mispar_Ishi);
        setSelectedCards(allIds);
    };
    const deleteSelectedCards = async () => {
        const updatedSoliders = soliders.filter((solider) => !selectedCards.includes(solider.Mispar_Ishi));
        await updateSoliders(updatedSoliders);
        setSelectedCards([]);
        setIsUpdated(true);
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