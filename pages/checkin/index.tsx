import { NextPage, } from 'next'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import styles from "../../styles/Checkin.module.css"
import Popout from '../../components/Popout'
import { useCookies } from 'react-cookie';
import Router from "next/router";

const index: NextPage = () => {
    const [cookies, setCookie] = useCookies(['checkedin']);
    const [show, setShow] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);

    // Check if they have checkedin
    useEffect(()=>{
        cookies.checkedin ? Router.back() : undefined
    },[])


    const handleCheck = async (flag: boolean) => {
        // Request
        try {
            const resp = await fetch("https://bsqgymdb.herokuapp.com/checkin")
            const halfday = new Date().getTime();
            resp.status == 400 ? setStatus(1) : setStatus(0)
            setShow(flag)
            setCookie('checkedin', true, { path: '/', expires: new Date(halfday + 12 * 60 * 60 * 1000)});
            setTimeout(() => {
                setShow(!flag)
            }, 3000)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.checkinDiv}>
            {show && <Popout show={show} status={status} />}

            <button onClick={_ => handleCheck(true)}>Checkin</button>
            <Image className={styles.checkinBG} src="/bg.PNG" layout='fill' />
        </div>
    )
}

export default index