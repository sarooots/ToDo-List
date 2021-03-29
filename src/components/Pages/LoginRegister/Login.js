import React, {useState, useRef, useEffect} from "react"
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {login} from "../../../store/actions"
import cls from "./Register.module.sass";
import illustration from "../../Style assets/Contact page illustration.png";
import Wrapper from "../../HOC Wrapper/Wrapper";

function Login({login, intro, article}){
  const focusedRef = useRef();
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [err, setErr] = useState({
    email: null,
    password: null,
  })
  useEffect(()=>focusedRef.current.focus(), [])

  const changeErr = () => {
    let newErr = {}

    newErr.email = !values.email ? `email is required`: null
    newErr.password = !values.password ? `password is required`: null

    setErr({...err, ...newErr})
  }

  const submit = () => {
    changeErr()
    const errArr = Object.values(err);
    const errExist = !errArr.every(el => el===null);

    const valuesArr = Object.values(values);
    const valuesExist = !valuesArr.some(el => el==='');

    if(valuesExist && !errExist){
      values.name = values.email
      login(values)
    }
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
            <h1 className={`${cls.introTitle}`}>Login</h1>
            <div className={cls.form}>
              <label className={`${cls.filed} ${err.email? cls.required: ""}`}>
                <input type="email"
                       name="email"
                       value={values.email}
                       className={err.email? cls.required: ""}
                       onChange={(e) => changeValues(e)}
                       ref={focusedRef}

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
                />
                <span>Password:</span>
                <p>
                  {err.password}
                </p>
              </label>
              <button onClick={submit}
                      className={`${cls.submit}`}
              >
                Login
              </button>
              <Link to="/signup" className={cls.link}>
                create new account
              </Link>
            </div>
          </div>


        </article>
      </section>
    </>
  )
}



const mapDispatchToProps =  {
  login
}


export default Wrapper(connect(null, mapDispatchToProps)(Login))

