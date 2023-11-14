import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { HomeContext } from '@src/context/context'

const FilterNavs = ({ items }) => {

    const { loadCatNews } = useContext(HomeContext)

    const filterHandler = (id) => {
        loadCatNews(id);
    }

    return (
        <div className="whats-news-nav">
            {items?.length > 0 &&
                <ul className="is-flex">
                    <li className="ml-5 has-text-weight-bold">
                        <span onClick={() => filterHandler()}>همه</span>
                    </li>
                    {
                        items?.map(item => (
                            <li key={item?.id} className="ml-5 has-text-weight-bold">
                                <span onClick={() => filterHandler(item.id)}>{item?.name}</span>
                            </li>
                        ))
                    }
                </ul>
            }

        </div>
    )
}

export default FilterNavs