import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginapi } from './redux/actions'
import { Container } from 'react-bootstrap'
const Login = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const { email, password } = data
        dispatch(loginapi({ email: email, password: password }))
    }

    return (
        <>
            <Container>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            {...register('email', { required: true })}
                            name="email"
                        />
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            name="password"
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default Login
