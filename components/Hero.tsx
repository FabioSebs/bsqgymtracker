import React, { FunctionComponent, useState, useEffect } from 'react'
import Image from "next/image"
import Logo from "../assets/logo.png"
import styles from "../styles/Hero.module.css"

interface Props {
    gymCount: number
}

const globals = {
    MAX: 5,
    MIN: 0
}

const Hero: FunctionComponent<Props> = ({ gymCount }) => {
    const [available, setAvailable] = useState<number>(globals.MAX);

    useEffect(() => {
        setAvailable(globals.MAX - gymCount)
    }, [gymCount])

    return (
        <div className={styles.heroDiv}>
            <h1>BSQ Gym Tracker</h1>


            <div className={styles.iconDiv}>
                <Image src="/logo.png" layout='fill' objectFit='contain' />
            </div>

            <h2>{gymCount} People</h2>
            <h3>{available} spaces left!</h3>
            <Image className={styles.heroBG} src="/bg.PNG" layout='fill' />
        </div>
    )
}

export default Hero