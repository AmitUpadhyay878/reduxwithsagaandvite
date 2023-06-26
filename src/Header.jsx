import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

const Header = () => {

    return (
        <div
            style={{
                width: '100%',
                marginBottom: '10px',
                height: '25px',
                backgroundColor: 'lightblue',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                // position: ' -webkit-sticky' /* Safari */,
                position: 'sticky',
                top: 0
            }}
        >
            <Link
                to="/home"
                style={{ margin: '5px', textDecoration: 'none', color: 'red' }}
            >
                <h3>Home</h3>
            </Link>
        </div>
    )
}

export default Header
