import React, { useEffect, useReducer, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    addNewuserapi,
    getsigneluserapi,
    updateuserapi
} from '../redux/actions'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useForm, FormProvider } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
const userAddEdit = () => {
    const methods = useForm({ criteriaMode: 'all' })
    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleData, error } = useSelector((state) => state.user)

    function getUser() {
        return dispatch(getsigneluserapi(id))
    }
    const ref = useRef()

    useEffect(() => {
        if (id) {
            getUser()
        } else {
            ref.current.children[0].value = ''
            ref.current.children[1].value = ''
            ref.current.children[2].value = ''
            ref.current.children[3].value = ''
            ref.current.children[4].value = ''
            ref.current.children[5].value = ''
        }
    }, [])

    useEffect(() => {
        if (singleData) {
            ref.current.children[0].value = singleData.name
            ref.current.children[1].value = singleData.email
            ref.current.children[2].value = singleData.city
            ref.current.children[3].value = singleData.flatno
            ref.current.children[4].value = singleData.landmark
            ref.current.children[5].value = singleData.zipcode
        } else {
            ref.current.children[0].value = ''
            ref.current.children[1].value = ''
            ref.current.children[2].value = ''
            ref.current.children[3].value = ''
            ref.current.children[4].value = ''
            ref.current.children[5].value = ''
        }
    }, [singleData])

    const onSubmit = (data) => {
        if (!id) {
            dispatch(addNewuserapi(data))
        } else {
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
    }

    return (
        <>
            <Container>
                <div>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            ref={ref}
                        >
                            <ErrorMessage
                                errors={methods.errors}
                                name="userAddedit"
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(
                                        ([type, message]) => (
                                            <p key={type}>{message}</p>
                                        )
                                    )
                                }
                            />
                            <input
                                type="text"
                                placeholder="Enter Name"
                                {...methods.register('name', {
                                    required: true,
                                    message: 'This input is number only.'
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Enter Email"
                                {...methods.register('email', {
                                    required: true,
                                    message: 'This input is number only.'
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Enter City"
                                {...methods.register('city', {
                                    required: true,
                                    message: 'This input is number only.'
                                })}
                            />

                            <input
                                type="text"
                                placeholder="Enter flatno"
                                {...methods.register('flatno', {
                                    required: true,
                                    message: 'This input is number only.'
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Enter landmark"
                                {...methods.register('landmark', {
                                    required: true,
                                    message: 'This input is number only.'
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Enter zipcode"
                                {...methods.register('zipcode', {
                                    required: true,
                                    message: 'This input is number only.'
                                })}
                            />

                            <button
                                type="submit"
                                style={{
                                    marginLeft: '250px',
                                    marginTop: '50px'
                                }}
                            >
                                {!id ? 'add ' : 'Update'}
                            </button>
                        </form>
                    </FormProvider>
                </div>
            </Container>
        </>
    )
}

export default userAddEdit
