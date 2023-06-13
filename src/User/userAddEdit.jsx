import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getsigneluserapi, updateuserapi } from '../redux/actions'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useForm, FormProvider } from 'react-hook-form'
import { useRef } from 'react'

const userAddEdit = () => {
    const methods = useForm()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { singleData } = useSelector((state) => state.user)

    function getUser() {
        return dispatch(getsigneluserapi(id))
    }
    const ref = useRef()

    useEffect(() => {
        getUser()
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
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            ref={ref}
                        >
                            <input
                                type="text"
                                placeholder="Enter Laast Name"
                                {...methods.register('name')}
                            />

                            <input
                                type="text"
                                placeholder="Enter Email"
                                {...methods.register('email')}
                            />
                            <input
                                type="text"
                                placeholder="Enter City"
                                {...methods.register('city')}
                            />

                            <input
                                type="text"
                                placeholder="Enter flatno"
                                {...methods.register('flatno')}
                            />
                            <input
                                type="text"
                                placeholder="Enter landmark"
                                {...methods.register('landmark')}
                            />
                            <input
                                type="text"
                                placeholder="Enter zipcode"
                                {...methods.register('zipcode')}
                            />

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
