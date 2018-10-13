import React from 'react';

const SearchBox = ({searchfield, searchChange}) => {
    return (
        <div className='pa2'>
            <input 
                type='search' 
                placeholder='search robots'
                onChange={searchChange}
                style={{height: '50px', textAlign: 'center'}}
            />
        </div>
    );
};

export default SearchBox;