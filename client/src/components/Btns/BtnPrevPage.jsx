import React from 'react';
import { useNavigate } from 'react-router-dom';

const BtnPrevPage = ({ justify = "end", className }) => {
    const navigate = useNavigate()
    return (
        <div className={`py-3 is-flex is-justify-content-${justify} `}>
            <button
                type='button'
                className={`button is-info ${className}`}
                onClick={() => navigate(-1)}>برو به صفحه قبل</button>
        </div>
    );
}

export default BtnPrevPage;