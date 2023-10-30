import React from 'react'

const InfoItem = ({ title, value, iconName, classStyle }) => {
    return (
        <div className={`info-item ${classStyle}`}>

            <h4 className=''>
                {title}
                <span className=''>
                    {value}
                </span>
            </h4>
            <box-icon name={`${iconName}`} size='md'></box-icon>
        </div>
    )
}

export default InfoItem