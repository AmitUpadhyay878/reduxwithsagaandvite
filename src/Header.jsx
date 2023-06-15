import React from 'react'
import { Link } from 'react-router-dom'

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

                position: ' -webkit-sticky' /* Safari */,
                position: 'sticky',
                top: 0
            }}
        >
            <Link
                to="/sign-in"
                style={{ margin: '5px', textDecoration: 'none', color: 'red' }}
            >
                <h3>Log-In</h3>
            </Link>
            <Link
                to="/"
                style={{ margin: '5px', color: 'red', textDecoration: 'none' }}
            >
                <h3>Listing</h3>
            </Link>
        </div>
    )
}

export default Header
