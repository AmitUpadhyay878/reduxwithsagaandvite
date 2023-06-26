import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getuserapi,
    deleteuserapi,
    addUsertowishlistapi
} from '../redux/actions'
import { useNavigate } from 'react-router-dom'

import { TbJewishStar, TbJewishStarFilled } from 'react-icons/tb'
import { Button, Col, Container, Row } from 'react-bootstrap'

const userListing = () => {
    const [isAddwishlist, setIsAddwishlist] = useState(false)
    const [isAddwishlistdata, setIsAddwishlistdata] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data } = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(getuserapi())
    }, [])

    const handleClick = (id) => {
        navigate(`/addedituser/${id}`)
    }

    const deleteuser = (id) => {
        dispatch(deleteuserapi(id))
    }

    const [hobby, setHobby] = useState()
    
    const hobbies = [
        {
            name: 'cricket'
        },
        {
            name: 'football'
        },
        {
            name: 'handball'
        }
    ]

    const handleCheck = (event) => {
        var updatedList = [...checked]
        if (event.target.checked) {
            updatedList = [...checked, event.target.value]
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1)
        }
        setChecked(updatedList)
    }

    function handlewishlist(id, e) {
        setIsAddwishlist(id)

        if (isAddwishlist) {
            dispatch(addUsertowishlistapi(id))
        } else {
            // dispatch(removeUserfromwishlistapi(id))
        }
    }

    return (
        <div
            style={{
                paddingTop: ' 102px',
                marginBottom: '50px'
            }}
        >
            <Container>
                <Button
                    variant="warning"
                    type="button"
                    onClick={() => navigate('/addedituser')}
                >
                    Add New-User
                </Button>
                <br />
                <Row>
                    {data?.map((singleUser) => {
                        return (
                            <>
                                <Col>
                                    <div
                                        key={singleUser.id}
                                        style={{
                                            padding: '3px',
                                            border: '1px solid red',
                                            cursor: 'pointer',
                                            margin: '3px 0px'
                                        }}
                                    >
                                        <h5>
                                            <div>
                                                {isAddwishlist ==
                                                singleUser.id ? (
                                                    <TbJewishStarFilled
                                                        onClick={() =>
                                                            handlewishlist(null)
                                                        }
                                                    />
                                                ) : (
                                                    <TbJewishStar
                                                        onClick={() =>
                                                            handlewishlist(
                                                                singleUser.id
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <br />
                                            <div
                                                onClick={() =>
                                                    handleClick(singleUser.id)
                                                }
                                            >
                                                {singleUser.email}
                                                <br />
                                                {singleUser.name}
                                                <br />
                                                {singleUser.city}
                                                <br />
                                                {singleUser.flatno}
                                                <br />
                                                {singleUser.landmark}
                                                <br />
                                                {singleUser.zipcode}
                                                <br />
                                            </div>
                                            <br />
                                            {hobbies.map((hl, i) => {
                                                return (
                                                    <>
                                                        <div>
                                                            <input
                                                                type="checkbox"
                                                                id={`hobby${i}`}
                                                                value={hl.name}
                                                                onChange={
                                                                    handleCheck
                                                                }
                                                            />
                                                            <label>
                                                                {hl.name}
                                                            </label>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                            <br />
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        deleteuser(
                                                            singleUser.id
                                                        )
                                                    }
                                                    style={{ zIndex: '9999' }}
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </h5>
                                    </div>
                                </Col>
                            </>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default userListing
