import React, { useEffect } from 'react'


function SelectSortBy(props) {
    let soliders = props.soliders, setGroupedBy = props.setGroupedBy;
    useEffect(() => {
        sortSolidersBy('City_Location');
    }, [soliders]);
    const groupBy = (arr, property, separator = '-') => {
        return arr.reduce((groups, item) => {
            const value = property === 'Rank+Role' ? `${item.Rank}${separator}${item.Role}` : item[property];
            if (!groups[value]) {
                groups[value] = [];
            }
            groups[value].push(item);
            return groups;
        }, {});
    };

    const sortSolidersBy = async (sortBy) => {
        const newGroupedBy = groupBy(soliders, sortBy, sortBy === 'Rank+Role' ? ',' : undefined);
        await setGroupedBy(newGroupedBy);
    };
    return (
        <div>
            <div className='mb-4'>
                <label>סדר לפי:</label>
                <select
                    className='select-Sort-by'
                    onChange={(e) => { sortSolidersBy(e.target.value) }}
                >
                    <option value='City'> עיר</option>
                    <option value='Gender'>מין</option>
                    <option value='City_Location'>מיקום עיר בארץ</option>
                    <option value='Rank+Role'>תפקיד+דרגה  </option>
                </select>
            </div>
        </div>
    )
}

export default SelectSortBy