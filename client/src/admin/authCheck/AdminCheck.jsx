import React, { useContext } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { AdminContext } from '../context/context'

const AdminCheck = () => {
  const { userData } = useContext(AdminContext)
  return userData.isAdmin ? <Outlet /> : <Navigate to="/main" replace={true} />
}

export default AdminCheck