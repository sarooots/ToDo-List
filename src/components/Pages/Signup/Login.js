import React, {useState, useRef, useEffect} from "react"
import {Container, Row, Form, Button, Alert} from "react-bootstrap";
import classes from "../Contact/Contact.module.sass"
import request from "../../../helpers/request"
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {register} from "../../../store/actions"

export function ShowAlert(props) {
  return(
    <Alert variant={props.variant}>
      {props.alert}
    </Alert>
  )
}

function Login(){
  const focusedRef = useRef();
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: null,
    password: null,
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
          setValues({email: "", password: ""})
          setVariant("success")
          setAlert("Your message has been sent successfully!")
          setTimeout(()=>setVariant(''), 7000)
        })
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
    if (name==="password" && value) {
      const pswReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if(!pswReg.test(value)){
        setErrors({
          ...errors,
          password: 'Invalid password'
        })
      }
    }
    setValues({...values, [name]: value})
  }
  return (
    <Container fluid>
      <Row>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
                          name="email"
                          value={values.email}
                          className={errors.email? classes.required: ""}
                          placeholder="Enter email"
                          onChange={(e) => changeValues(e)}
                          ref={focusedRef}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
                          name="password"
                          value={values.password}
                          className={errors.password? classes.required: ""}
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
      <Link to="/signup">create account</Link>
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



const mapDispatchToProps =  {
  register
}


export default connect(null, mapDispatchToProps)(Login)

