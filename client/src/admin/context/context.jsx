import { createContext, useState } from "react";
import axios from 'axios'


export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const [error, setError] = useState('')
    

    const login = async (inputs) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/users/login`, inputs)
            if (res.status === 200) {

            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdminContext.Provider value={{ login }}>
            {children}
        </AdminContext.Provider>
    )
}