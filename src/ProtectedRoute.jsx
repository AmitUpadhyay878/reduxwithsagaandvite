import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { singleData } = useSelector((state) => state.user)
    return singleData ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute
