import React, { FunctionComponent, useEffect, useState } from 'react'
import styles from "../styles/Popout.module.css"
import {ProgressBar} from "react-loader-spinner"

interface Props {
    show: boolean
    status : number
}

const messages = {
    0 : "Success!",
    1 : "Gym is Full",
    2 : "You didn't checkin"
}

const Popout: FunctionComponent<Props> = ({ show, status}) => {
    const [finished, setFinished] = useState<boolean>(false);
    const [dots, setDots] = useState<string>("")
    const [message, setMessage] = useState<string>(messages[0])

    useEffect(()=>{
        const errArray = Object.values(messages)
        setMessage(errArray[status])
    }, [status])

    useEffect(()=> {
        setTimeout(() => {
            setFinished(!finished)
        }, 2000);
    }, [show])

    const loadingMessage = () => {
        return (
            <>
                <h2>Loading {dots}</h2>
            </>
        )
    }

    const successMessage = () => {
        return (
            <>
                <h2>{message}</h2>
            </>
        )
    }

    const addDot = () => {
        if (dots.length==3) {
            setDots('')
            return
        }
        const newDot = dots + '.'
        setDots(newDot)
    }



    setInterval(addDot,400)

    const popout = () => {
        return (
            <div className={styles.popoutDiv}>
                <ProgressBar
                    width={80}
                    height={80}
                />
                {finished ? successMessage() : loadingMessage()}
            </div>
        )
    }

    const nil = () => {
        return <></>
    }

    return (
        <>
            {show ? popout() : nil()}
        </>
    )
}

export default Popout