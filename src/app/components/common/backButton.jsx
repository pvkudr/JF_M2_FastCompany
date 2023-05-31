import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function BackButton() {
    const history = useHistory();
    return (
        <button
            className='btn btn-primary'
            onClick = { (() => {
                history.goBack();
            })}
        >
            <i className='bi bi-caret-left'/>
            Go back
        </button>
    );
}

export default BackButton;
