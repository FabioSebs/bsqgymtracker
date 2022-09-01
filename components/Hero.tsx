import React, { FunctionComponent, useState, useEffect } from 'react'
import Image from "next/image"
import Logo from "../assets/logo.png"
import styles from "../styles/Hero.module.css"

interface Props {
    title: string
}

const globals = {
    MAX: 3,
    MIN: 0
}

const Hero: FunctionComponent<Props> = ({ title }) => {
    const [count, setCount] = useState<number>(globals.MIN);
    const [available, setAvailable] = useState<number>(globals.MAX);

    const add = () => {
        if (count == globals.MAX) {
            return
        }

        const inc = count + 1
        setCount(inc)
    }

    const sub = () => {
        if (count == globals.MIN) {
            return
        }

        const dec = count - 1
        setCount(dec)
    }

    useEffect(() => {
        setAvailable(globals.MAX - count)
    }, [count])

    return (
        <div className={styles.heroDiv}>
            <h1>{title}</h1>


            <div className={styles.iconDiv}>
                <Image src="/logo.png" layout='fill' objectFit='contain'/>
            </div>

            <h2>{count}</h2>
            <h3>{available} spaces left!</h3>
        </div>
    )
}

export default Hero