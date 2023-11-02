import React from 'react'

const HelpMessage = ({ textColor, children }) => {
    return (
        <p className={`help ${textColor}`}>
            {children}
        </p>
    )
}

export default HelpMessage