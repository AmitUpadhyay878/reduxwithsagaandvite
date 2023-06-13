import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getsigneluserapi, updateuserapi } from '../redux/actions'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useForm, FormProvider } from 'react-hook-form'

const userAddEdit = () => {
    const methods = useForm()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleData } = useSelector((state) => state.user)

    function getUser() {
        return dispatch(getsigneluserapi(id))
    }

    useEffect(() => {
        getUser()
    }, [])

    const onSubmit = (data) => {
        // console.log(data)
        dispatch(
            updateuserapi({
                ...singleData,
                city: data.city,
                name: data.name,
                email: data.email,
                flatno: data.flatno,
                zipcode: data.zipcode,
                landmark: data.landmark
            })
        )
    }

    return (
        <>
            <Container>
                <div>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6}>
                                    <div>
                                        <span>
                                            <b>Peronal Detail</b>
                                        </span>
                                        <br />
                                        <input
                                            type="text"
                                            placeholder="Enter Laast Name"
                                            defaultValue={singleData?.name}
                                            {...methods.register('name')}
                                        />

                                        <input
                                            type="text"
                                            placeholder="Enter Email"
                                            defaultValue={singleData?.email}
                                            {...methods.register('email')}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter City"
                                            defaultValue={singleData?.city}
                                            {...methods.register('city')}
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div>
                                        <span>
                                            <b>Address</b>
                                        </span>{' '}
                                        <br />
                                        <input
                                            type="text"
                                            placeholder="Enter flatno"
                                            defaultValue={singleData?.flatno}
                                            {...methods.register('flatno')}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter landmark"
                                            defaultValue={singleData?.landmark}
                                            {...methods.register('landmark')}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter zipcode"
                                            defaultValue={singleData?.zipcode}
                                            {...methods.register('zipcode')}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <button
                                type="submit    "
                                style={{
                                    marginLeft: '250px',
                                    marginTop: '50px'
                                }}
                            >
                                Update
                            </button>
                        </form>
                    </FormProvider>
                </div>
            </Container>
        </>
    )
}

export default userAddEdit
