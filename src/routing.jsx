import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserAddEdit from './User/userAddEdit'
import Login from './Login'
import Layout from './Layout'
import ProtectedRoute from './ProtectedRoute'
import BeforLogin from './Layouts/BeforLogin/BeforLogin'
import AfterLogin from './Layouts/AfterLogin/AfterLogin'

const routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route element={<ProtectedRoute/>}>
                    <Route path="/home" element={<Home />} />
                    <Route path="addedituser" element={<UserAddEdit />} />
                    <Route path="addedituser/:id" element={<UserAddEdit />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default routing
