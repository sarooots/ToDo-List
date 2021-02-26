import React from "react";
import {Spinner as BSpinner} from "react-bootstrap"
import cls from "./Spinner.module.sass"

export default function Spinner () {
    return (
        <div className={cls.background}>
            <BSpinner animation="border" role="status" className={cls.spinner}>
                <span className="sr-only">Loading...</span>
            </BSpinner>
        </div>
    )

}