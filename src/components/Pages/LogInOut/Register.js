import React, {useState, useRef, useEffect} from "react"
import {Container, Row, Form, Button, Alert} from "react-bootstrap";
import classes from "../Contact/Contact.module.sass"
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
function Register({register}){
  const focusedRef = useRef();
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    confirmPassword: null
  })
  const [variant, setVariant] = useState("")
  const [alert, setAlert] = useState("")
  useEffect(()=>focusedRef.current.focus(), [])

  const submit = () => {
    const errorsArr = Object.values(errors);
    const errorsExist = !errorsArr.every(el => el===null);

    const valuesArr = Object.values(values);
    const valuesExist = !valuesArr.some(el => el==='');

    if(valuesExist && !errorsExist && values.password===values.confirmPassword){

      register(values)
      // request(`http://localhost:3001/form`,"POST", values)
      //     .then( ()=>{
      //         setValues({email: "", password: ""})
      //         setVariant("success")
      //         setAlert("Your message has been sent successfully!")
      //         setTimeout(()=>setVariant(''), 7000)
      //     })
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
      const pswReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_])(?=.{8,})/;
      if(!pswReg.test(value)){
        setErrors({
          ...errors,
          password: 'Invalid password'
        })
      }
    }


    if (name==="confirmPassword" && value) {

      if(!(value === values.password)){
        setErrors({
          ...errors,
          confirmPassword: "Password dosen't match"
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
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text"
                          name="name"
                          value={values.name}
                          className={errors.name? classes.required: ""}
                          placeholder="Enter name"
                          onChange={(e) => changeValues(e)}
                          ref={focusedRef}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text"
                          name="surname"
                          value={values.surname}
                          className={errors.surname? classes.required: ""}
                          placeholder="Enter surname"
                          onChange={(e) => changeValues(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          className={errors.password? classes.required: ""}
                          onChange={(e) => changeValues(e)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          className={errors.confirmPassword? classes.required: ""}
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
      <Link to="/signin">already have an account</Link>
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


export default connect(null, mapDispatchToProps)(Register)

// export default function Login(register) {
//     let {pathname} = history.location
//     pathname = pathname.substr(1)
//     return(
//         <>
//             {pathname === "signup" && <LogInOut/>}
//             {pathname === "signin" && <Signin/>}
//         </>
//     )
//
// }

