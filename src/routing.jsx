import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserAddEdit from './User/userAddEdit'
import Layout from './Layout'
import Login from './Login'

const routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/addedituser" element={<UserAddEdit />} />
                    <Route path="/addedituser/:id" element={<UserAddEdit />} />
                    <Route path="/sign-in" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default routing
