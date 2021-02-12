import React, {useState, useRef, useEffect} from "react"
import {Container, Row, Form, Button, Alert} from "react-bootstrap";

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
    const [variant, setVariant] = useState("")
    const [alert, setAlert] = useState("")
    useEffect(()=>focusedRef.current.focus(), [])

    const submit = () => {
        fetch(`http://localhost:3001/form`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response)=>{
                const res = await response.json()
                if (response.status >= 400 && response.status <600) {
                    throw res.error ?res.error : new Error("Something went wrong!")

                }
                setValues({name: "", email: "", message: ""})
                setVariant("success")
                setAlert("Your message has been sent successfully?")
                setTimeout(()=>setVariant(''), 7000)


            })
            .catch(error => {
                console.log("catch error", error)
                setAlert(error.status === 422 ? "Please fill form!": "Something went wrong!")
                setVariant(error.status === 422 ?"warning": "danger")
                setInterval(()=>setVariant(''), 7000)
            })

    }

    const changeValues = ({target: {name, value}}) => {
        setValues({...values, [name]: value})
    }
return (
    <Container fluid>
        <Row>
            <Form onSubmit={(event)=> event.preventDefault()}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter full name"
                                  name="name"
                                  value={values.name}
                                  onChange={(e) => changeValues(e)}
                                  ref={focusedRef}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                                  name="email"
                                  value={values.email}
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
                                  onChange={(e) => changeValues(e)}
                    />
                </Form.Group>
                <Button variant="primary"
                        type="submit"
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