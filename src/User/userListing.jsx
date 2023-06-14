import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getuserapi, deleteuserapi } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import { FormCheck } from 'react-bootstrap'

const userListing = () => {
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

    return (
        <div>
            <button type="button" onClick={() => navigate('/addedituser')}>
                Add New-User
            </button>
            <br />
            {data?.map((singleUser) => {
                return (
                    <>
                        <div
                            key={singleUser.id}
                            style={{
                                height: 'auto',
                                width: 'auto',
                                padding: '3px',
                                margin: '5px',
                                display: 'inline-block',
                                border: '1px solid red',
                                cursor: 'pointer'
                            }}
                        >
                            <h5>
                                <div onClick={() => handleClick(singleUser.id)}>
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
                                {/* {hobbies.map((hl, i) => {
                                    return (
                                        <input
                                            type="checkbox"
                                            id={`hobby${i}`}
                                            value={hl.name}
                                            onChange={handleCheck}
                                        />
                                    )
                                })} */}
                                <div>
                                    <button
                                        onClick={() =>
                                            deleteuser(singleUser.id)
                                        }
                                        style={{ zIndex: '9999' }}
                                    >
                                        delete
                                    </button>
                                </div>
                            </h5>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default userListing
