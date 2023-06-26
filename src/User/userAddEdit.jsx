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
    const ref = useRef()
    const dispatch = useDispatch()
    const { singleData, error } = useSelector((state) => state.user)

    function getUser() {
        return dispatch(getsigneluserapi(id))
    }

    useEffect(() => {
        if (id) {
            getUser()
        } else {
            ref.current.children[0].value = ''
            ref.current.children[1].value = ''
            ref.current.children[2].value = ''
            ref.current.children[3].value = ''
            ref.current.children[4].value = ''
        }
    }, [])

    useEffect(() => {
        if (singleData) {
            ref.current.children[0].value = singleData.firstname
            ref.current.children[1].value = singleData.lastname
            ref.current.children[2].value = singleData.email
            ref.current.children[3].value = singleData.password
            ref.current.children[4].value = singleData.phoneNo
        } else {
            ref.current.children[0].value = ''
            ref.current.children[1].value = ''
            ref.current.children[2].value = ''
            ref.current.children[3].value = ''
            ref.current.children[4].value = ''
        }
    }, [singleData])

    const onSubmit = (data) => {
        console.log(data, 'data')
        if (!id) {
            dispatch(
                addNewuserapi({
                    firstName: data.firstname,
                    lastName: data.lastname,
                    email: data.email,
                    password: data.password,
                    phoneNo: data.phonno
                })
            )
        } else {
            // console.log(data)
            dispatch(
                updateuserapi({
                    ...singleData,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    email: data.email,
                    password: data.password,
                    phoneNo: data.phonno
                })
            )
        }
    }

    return (
        <>
            <Container>
                <div
                    styke={{
                        paddingTop: '102px'
                    }}
                >
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
                                placeholder="Enter first Name"
                                {...methods.register('firstname', {
                                    required: true,
                                    message: 'This input is firstname'
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Enter last Name"
                                {...methods.register('lastname', {
                                    required: true,
                                    message: 'This input is number only.'
                                })}
                            />
                            <input
                                type="email"
                                placeholder="Enter email"
                                {...methods.register('email', {
                                    required: true,
                                    message: 'This input isemail.'
                                })}
                            />
                            <input
                                type="password"
                                placeholder="Enter password"
                                {...methods.register('password', {
                                    required: true,
                                    message: 'This input isemail.'
                                })}
                            />

                            <input
                                type="text"
                                placeholder="Enter phone No"
                                {...methods.register('phonno', {
                                    required: true,
                                    message: 'This input is number only.'
                                })}
                            />
                            <Button
                                variant="success"
                                type="submit"
                                style={{
                                    marginLeft: '250px',
                                    marginTop: '50px'
                                }}
                            >
                                {!id ? 'add ' : 'Update'}
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </Container>
        </>
    )
}

export default userAddEdit
