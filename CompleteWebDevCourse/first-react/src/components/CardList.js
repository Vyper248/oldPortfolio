import React from 'react';
import Card from './Card';
import './CardList.css';

const CardList = ({ robots }) => {
    return (
        <div className="cardList">
            {
                robots.map(robot => {
                    return <Card 
                        key={robot.id} 
                        name={robot.name} 
                        username={robot.username} 
                        email={robot.email}
                    />
                })
            }
        </div>
    );
};

export default CardList