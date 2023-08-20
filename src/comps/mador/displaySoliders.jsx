import React, { useContext } from 'react'
import SoliderCard from './soliderCard'
import { UserContext } from '../../context/userContext';

function DisplaySoliders(props) {
    const { soliders, selectedCards, setSelectedCards } = useContext(UserContext);
    let groupedBy = props.groupedBy;

    const toggleSelect = (id) => {
        if (selectedCards.includes(id)) {
            setSelectedCards(selectedCards.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedCards([...selectedCards, id]);
        }
    };

    return (
        <div>
            <div className='scroll-container'>
                {soliders.length > 0 ? (
                    Object.keys(groupedBy).map((title) => (
                        <div key={title}>
                            <h5>
                                {title === 'ז' || title === 'נ' ?
                                    (title === 'ז' ? 'זכר' : 'נקבה')
                                    : title
                                }
                            </h5>
                            <div className='solider-list d-flex' style={{ flexWrap: 'wrap' }}>
                                {groupedBy[title].map((solider) => (
                                    <SoliderCard
                                        key={solider.Mispar_Ishi}
                                        solider={solider}
                                        isSelected={selectedCards.includes(solider.Mispar_Ishi)}
                                        toggleSelect={(id) => toggleSelect(id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>אין כרגע חיילים להצגה.</p>
                )}
            </div>

        </div>
    )
}

export default DisplaySoliders