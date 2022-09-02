import { NextPage } from 'next'
import React, { useState } from 'react'
import styles from "../../styles/Checkin.module.css"
import Popout from '../../components/Popout'

const index: NextPage = () => {
    const [show, setShow] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);

    const handleCheck = async (flag: boolean) => {
        // Request
        try {
            if (flag) {
                const resp = await fetch("http://localhost:8080/checkin")
                resp.status == 400 ? setStatus(1) : setStatus(0)
    
            } else {
                const resp = await fetch("http://localhost:8080/checkout")
                resp.status == 400 ? setStatus(2) : setStatus(0)
            }
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.checkinDiv}>
            {show && <Popout show={show} status={status}/>}

            <button onClick={_ => handleCheck(true)}>Checkin</button>
            <button onClick={_ => handleCheck(false)}>Checkout</button>
        </div>
    )
}

export default index