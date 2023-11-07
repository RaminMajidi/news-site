import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { HomeContext } from '@src/context/context'

const FilterNavs = ({items}) => {
    return (
        <div className="whats-news-nav">
            <ul className="is-flex">
                <li className="ml-5 has-text-weight-bold">
                    <NavLink to={'/'}>همه</NavLink>
                </li>
                {
                    items?.map(item => (
                        <li key={item?.id} className="ml-5 has-text-weight-bold">
                            <NavLink to={'/'}>{item?.name}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FilterNavs