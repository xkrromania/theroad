import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ name, description, type, stats, removeHandle }) => {
    const cardClass = `card__class card__class--${type}`;

    return (
        <article className="card">
            <div className={cardClass}></div>
            <div className="card__name">{name}</div>
            <div className="card__description">{description}</div>
            <div className="card__stats">
                {JSON.stringify(stats)}
            </div>
            <div className="card__actions">
                <button className="btn danger" onClick={removeHandle}>
                    Remove
                </button>
            </div>
        </article>
    );
};

Card.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    stats: PropTypes.object.isRequired,
    removeHandle: PropTypes.func.isRequired
};

export default Card;
