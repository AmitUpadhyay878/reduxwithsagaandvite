import React from 'react'
import UserListing from './User/userListing'
import { Container } from 'react-bootstrap'
const Home = () => {
    return (
        <div>
            <Container>
                <UserListing />
            </Container>
        </div>
    )
}

export default Home
