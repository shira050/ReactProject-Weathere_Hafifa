import React, { useState, useContext, useEffect } from 'react';
import { Modal } from 'antd';
import AddSoliderForm from './addSoliderForm';
import { UserContext } from '../../context/userContext';
import ArrowIcon from '../icons/arowIcon';
import SelectedCardsEvents from './selectedCardsEvents';
import SelectSortBy from './selectSortBy';
import DisplaySoliders from './displaySoliders';
import '../../comps/css/modalSoliders.css';
import { ReactComponent as CloseIcon } from '../icons/close.svg'


export default function ModalSoliders() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const { soliders, updateSoliders } = useContext(UserContext);
    const [groupedBy, setGroupedBy] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 20000);

        return () => clearInterval(interval);
    }, [soliders]);

    const toggleModal = () => {
        if (isModalVisible && isUpdated) {
            const confirmed = window.confirm('שים לב שישנם שינויים שלא נשמרו!');
            if (confirmed) {
                setIsModalVisible(!isModalVisible);
            }
        } else {
            setIsModalVisible(!isModalVisible);
        }
    };

    return (
        <>
            <button onClick={toggleModal}>הצג חיילים</button>

            <Modal
                visible={isModalVisible}
                // onCancel={toggleModal}
                footer={null}
                closeIcon={null}
                width="80%"
                wrapClassName="modal-body"
                height='90%'          
            >

                <div className="modal-close-button text-right" onClick={toggleModal}>
                    <CloseIcon/>
                </div>
                <div className="solider-modal-header container-modal">
                    <div className="text-right">
                        <ArrowIcon />
                    </div>
                    <div className="text-left">
                        <h4>חיילי המדור</h4>
                        <p>{currentTime}</p>
                    </div>
                </div>
                <div className='container-modal'>
                    <AddSoliderForm changeIsUpdated={(status) => setIsUpdated(status)} />

                    <div className="text-left">
                        <SelectSortBy soliders={soliders} setGroupedBy={setGroupedBy} />

                        <DisplaySoliders groupedBy={groupedBy} />
                    </div>
                </div>
                <div className="solider-modal-footer container-modal">
                    <SelectedCardsEvents
                        isUpdated={isUpdated}
                        setIsUpdated={setIsUpdated}
                        basicModal={isModalVisible}
                        setBasicModal={setIsModalVisible}
                    />
                </div>
            </Modal>
        </>
    );
}
