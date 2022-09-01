import { NextPage } from 'next'
import React, { useState } from 'react'
import styles from "../../styles/Checkin.module.css"
import Popout from '../../components/Popout'

const index: NextPage = () => {
    const [show, setShow] = useState<boolean>(false);

    const toggleShow = () => {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 2000)
    }

    return (
        <div className={styles.checkinDiv}>
            {show && <Popout show={show}/>}

            <button onClick={_ => toggleShow()}>Checkin</button>
            <button onClick={_ => toggleShow()}>Checkout</button>
        </div>
    )
}

export default index