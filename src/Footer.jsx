import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
    return (
        <Container>
            <div
                style={{
                    position: 'fixed',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'lightgreen',
                    color: 'red',
                    textAlign: 'center'
                }}
            >
                Footer
            </div>
        </Container>
    )
}

export default Footer
