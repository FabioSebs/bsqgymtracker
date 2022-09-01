import React, { FunctionComponent, useState } from 'react'
import styles from "../styles/Popout.module.css"
import {ProgressBar} from "react-loader-spinner"

interface Props {
    show: boolean
}

const Popout: FunctionComponent<Props> = ({ show }) => {
    const [finished, setFinished] = useState<boolean>(false);
    const [dots, setDots] = useState<string>("")

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
                <h2>Success!</h2>
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