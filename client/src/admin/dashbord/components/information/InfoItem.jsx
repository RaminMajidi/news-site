import React from 'react'

const InfoItem = ({ title, value, iconName, classStyle }) => {
    return (
        <div className={`info-item ${classStyle}`}>

            <h4 className='is-flex is-justify-content-center is-align-items-center'>
                {title}
                <span className=''>
                    {value}
                </span>
            </h4>
            <div>
                <box-icon name={`${iconName}`} size='md'></box-icon>
            </div>
        </div>
    )
}

export default InfoItem