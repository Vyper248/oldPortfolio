import React from 'react';
import './Card.css';

const Card = ({name, username, email}) => {
    return (
        <div className='card grow bg-light-blue'>
            <img src={`https://robohash.org/${name}?200x200`} alt='user'/>
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
};

export default Card;