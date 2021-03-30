import React, {useState, useRef, useEffect} from "react"
import cls from "./Contact.module.sass"
import request from "../../../helpers/auth"
import illustration from "../../Style assets/Contact page illustration.png";
import Wrapper from "../../HOC Wrapper/Wrapper"
import {CONTACT_SECCESS, PENDING} from "../../../store/actTypes";
import {store} from "../../../store/store"

const apiHost = process.env.REACT_APP_API_HOST

function Contact(props) {
    const focusedRef = useRef();
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [err, setErr] = useState({
        name: null,
        email: null,
        message: null,
    })
    useEffect(()=>focusedRef.current.focus(), [])


    const changeErr = () => {
        let newErr = {}

        newErr.name = !values.name ? `name is required`: null
        newErr.email = !values.email ? `email is required`: null
        newErr.message = !values.message ? `message is required`: null

        setErr({...err, ...newErr})
    }

    const submit = () => {
        const errArr = Object.values(err);
        const errExist = !errArr.every(el => el===null);

        const valuesArr = Object.values(values);
        const valuesExist = !valuesArr.some(el => el==='');

        if(valuesExist && !errExist){
            store.dispatch({type: PENDING})
            request(`${apiHost}/form`,"POST", values)
              .then( ()=>{
                  setValues({name: "", email: "", message: ""})
                  store.dispatch({type: CONTACT_SECCESS})
              })
        }
        changeErr()
    }

    const changeValues = ({target: {name, value}}) => {
        if (!value) {
            setErr({
                ...err,
                [name]: `Please fill ${name} field`
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
    const {intro, article} = props
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
                      <h1 className={`${cls.introTitle}`}>Contact us</h1>
                      <div className={cls.form}>
                          <div className={`${cls.filed} ${err.name? cls.required: ""}`}>
                              <input type="text"
                                     name="name"
                                     value={values.name}
                                     onChange={(e) => changeValues(e)}
                                     onKeyUp={(e) => e.key === "Enter" && submit()}
                                     ref={focusedRef}
                              />
                              <span>Name:</span>
                              <p>{err.name}</p>
                          </div>
                          <div className={`${cls.filed} ${err.name? cls.required: ""}`}>
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
                          </div>
                          <div className={`${cls.filed} ${err.name? cls.required: ""} ${cls.textarea}`}>
                              <textarea
                                name="message"
                                value={values.message}
                                className={err.message? cls.required: ""}
                                onChange={(e) => changeValues(e)}
                              />
                              <span>Message:</span>
                              <p>{err.message}</p>
                          </div>
                          <button onClick={submit}
                                  className={`${cls.submit}`}
                          >
                              Send message
                          </button>
                      </div>
                  </div>
              </article>
          </section>
      </>
    )
}

export default Wrapper(Contact)