import React, {useEffect} from "react";
import {Spinner as BSpinner} from "react-bootstrap"
import cls from "./Spinner.module.sass"

export default function Spinner () {
    useEffect(()=> {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "auto"
        }
    })
    return (
        <div className={cls.background}>
            <BSpinner animation="border" role="status" className={cls.spinner}>
                <span className="sr-only">Loading...</span>
            </BSpinner>
        </div>
    )

}