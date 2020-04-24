import React from 'react';

const Notification = ({ text, type }) => {
    type = type || 'error';

    if (text.length === 0) {
        return null;
    }

    const alertBox = <div className={`alert alert--${type}`}>{text}</div>;
    return <>{alertBox}</>;
};

export default Notification;
