import { useState, useEffect } from 'react'
import styles from './customcursor.module.css'

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 })

    useEffect(() => {
        const updateCursorPosition = (e) => {
            setPosition({ x: e.clientX-15, y: e.clientY-15 })
        };

        document.addEventListener('mousemove', updateCursorPosition)

        return () => {
            document.removeEventListener('mousemove', updateCursorPosition)
        }
    }, [])

    return (
        <div
            className={`${styles.circlecursor}  bg-transparent lg:bg-neutral`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        ></div>
    )
}