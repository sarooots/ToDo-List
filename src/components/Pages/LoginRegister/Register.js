import React, {useState, useRef, useEffect} from "react"
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {register} from "../../../store/actions"
import cls from "./LoginRegister.module.sass";
import illustration from "../../Style assets/Register page illustration.png";
import Wrapper from "../../HOC Wrapper/Wrapper";

function Register({register, intro, article}){
  const focusedRef = useRef();
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [err, setErr] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    confirmPassword: null
  })
  useEffect(()=>focusedRef.current.focus(), [])
  console.log(focusedRef)

  const changeErr = () => {
    let newErr = {}

    newErr.name = !values.name ? `name is required`: null
    newErr.surname = !values.surname ? `surname is required`: null
    newErr.email = !values.email ? `email is required`: null
    newErr.password = !values.password ? `password is required`: null
    newErr.confirmPassword = !values.confirmPassword ? `password dosen't match`: null

    setErr({...err, ...newErr})
  }

  const submit = () => {
    const errArr = Object.values(err);
    const errExist = !errArr.every(el => el===null);

    const valuesArr = Object.values(values);
    const valuesExist = !valuesArr.some(el => el==='');

    if(valuesExist && !errExist && values.password===values.confirmPassword){
      register(values)
    }
    changeErr()
  }

  const changeValues = ({target: {name, value}}) => {
    if (!value) {
      setErr({
        ...err,
        [name]: `${name} is required`
      })
    } else {
      setErr({
        ...err,
        [name]: null
      })
    }

    if (name==="email" && value) {
      const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if(!emailReg.test(value)){
        setErr({
          ...err,
          email: 'Invalid email'
        })
      }
    }
    if (name==="password" && value) {
      const pswReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
      if(!pswReg.test(value)){
        setErr({
          ...err,
          password: 'use UPPERCASE, lowercase and numbers'
        })
      }
    }


    if (name==="confirmPassword" && value) {

      if(!(value === values.password)){
        setErr({
          ...err,
          confirmPassword: "password dosen't match"
        })
      }
    }
    setValues({...values, [name]: value})
  }
  return (

    <>
      {/*whole page content*/}
      <section className={cls.wrapper}>
        {/*first section of page, intro*/}
        <article className={`${intro} ${article} ${cls.article}`}>
          <div className={`${cls.introItem}`}>
            <img src={illustration} alt=""
                 className={`${cls.illustration}`}
            />
          </div>

          <div className={`${cls.introItem} ${cls.introInfo}`}>
            <h1 className={`${cls.introTitle}`}>Register</h1>
            <div className={cls.form}>
              <label className={`${cls.filed} ${err.name? cls.required: ""}`}>
                <input type="text"
                       name="name"
                       value={values.name}
                       onChange={(e) => changeValues(e)}
                       onKeyUp={(e) => e.key === "Enter" && submit()}
                       ref={focusedRef}
                />
                <span>Name:</span>
                <p>{err.name}</p>
              </label>
              <label className={`${cls.filed} ${err.surname? cls.required: ""}`}>
                <input type="surname"
                       name="surname"
                       value={values.surname}
                       className={err.surname? cls.required: ""}
                       onChange={(e) => changeValues(e)}
                       onKeyUp={(e) => e.key === "Enter" && submit()}
                />
                <span>Surname:</span>
                <p>
                  {err.surname}
                </p>
              </label>
              <label className={`${cls.filed} ${err.email? cls.required: ""}`}>
                <input type="email"
                       name="email"
                       value={values.email}
                       className={err.email? cls.required: ""}
                       onChange={(e) => changeValues(e)}
                       onKeyUp={(e) => e.key === "Enter" && submit()}
                />
                <span>Email:</span>
                <p>
                  {err.email}
                </p>
              </label>
              <label className={`${cls.filed} ${err.password? cls.required: ""}`}>
                <input type="password"
                       name="password"
                       value={values.password}
                       className={err.password? cls.required: ""}
                       onChange={(e) => changeValues(e)}
                       onKeyUp={(e) => e.key === "Enter" && submit()}
                />
                <span>Password:</span>
                <p>
                  {err.password}
                </p>
              </label>
              <label className={`${cls.filed} ${err.confirmPassword? cls.required: ""}`}>
                <input type="password"
                       name="confirmPassword"
                       value={values.confirmPassword}
                       className={err.confirmPassword? cls.required: ""}
                       onChange={(e) => changeValues(e)}
                       onKeyUp={(e) => e.key === "Enter" && submit()}
                />
                <span>Confirm:</span>
                <p>
                  {err.confirmPassword}
                </p>
              </label>
              <button onClick={submit}
                      className={`${cls.submit}`}
              >
               Register
              </button>
              <Link to="/signin" className={cls.link}>
                already have an account?
              </Link>
            </div>
          </div>


        </article>
      </section>
    </>

  )
}



const mapDispatchToProps =  {
  register
}


export default Wrapper(connect(null, mapDispatchToProps)(Register))