import React, {useState, useRef, useEffect} from "react"
import {Container, Row, Form, Button, Alert} from "react-bootstrap";
import classes from "./Contact.module.sass"
import request from "../../../helpers/request"

export function ShowAlert(props) {
    return(
        <Alert variant={props.variant}>
            {props.alert}
        </Alert>
    )
}

export default function Contact(){
    const focusedRef = useRef();
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null,
    })
    const [variant, setVariant] = useState("")
    const [alert, setAlert] = useState("")
    useEffect(()=>focusedRef.current.focus(), [])

    const submit = () => {
        const errorsArr = Object.values(errors);
        const errorsExist = !errorsArr.every(el => el===null);

        const valuesArr = Object.values(values);
        const valuesExist = !valuesArr.some(el => el==='');

        if(valuesExist && !errorsExist){
            request(`http://localhost:3001/form`,"POST", values)
            .then( ()=>{
                setValues({name: "", email: "", message: ""})
                setVariant("success")
                setAlert("Your message has been sent successfully!")
                setTimeout(()=>setVariant(''), 7000)
            })
            // .catch(error => {
            //     console.log("catch error", error)
            //     setAlert(error.status === 422 ? "Please fill form!": "Something went wrong!")
            //     setVariant(error.status === 422 ?"warning": "danger")
            //     setTimeout(()=>setVariant(''), 7000)
            // })
        } else {
            setAlert("Please fill form!")
            setVariant("warning")

        }
    }

    const changeValues = ({target: {name, value}}) => {
        if (!value) {
            setErrors({
                ...errors,
                [name]: `Please fill ${name} field`
            })
        } else {
            setErrors({
                ...errors,
                [name]: null
            })
        }

        if (name==="email" && value) {
            const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if(!emailReg.test(value)){
                setErrors({
                    ...errors,
                    email: 'Invalid email'
                })
            }

        }
        setValues({...values, [name]: value})
    }
return (
    <Container fluid>
        <Row>
            <Form>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter full name"
                                  name="name"
                                  value={values.name}
                                  className={errors.name? classes.required: ""}
                                  onChange={(e) => changeValues(e)}
                                  ref={focusedRef}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                                  name="email"
                                  value={values.email}
                                  className={errors.email? classes.required: ""}
                                  placeholder="Enter email"
                                  onChange={(e) => changeValues(e)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea"
                                  name="message"
                                  value={values.message}
                                  className={errors.message? classes.required: ""}
                                  onChange={(e) => changeValues(e)}
                    />
                </Form.Group>
                <Button variant="primary"
                        onClick={submit}
                >
                    send
                </Button>
            </Form>
        </Row>
        <br/>
        {variant !=="" &&
        <ShowAlert
            variant={variant}
            alert={alert}
        />
        }
    </Container>
)
}