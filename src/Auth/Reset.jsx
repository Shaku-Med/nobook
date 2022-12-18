import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import CryptoJS from 'crypto-js';

import axios from 'axios'

function Reset() {

    const [token, settoken] = useState('')

    const [secret, setsecret] = useState("")

    const [pass, setpass] = useState("")

    const [email, setemail] = useState('')


    const navig = useNavigate()


    const [btns, setbtns] = useState(
        { 
            main: true,
            desc: "Please wait..."
        }
    )


    useEffect(() => { 
        axios.post("http://192.168.1.43:3001/resets", { 
            se_token: uuid()
        }).then(res => { 
            settoken(res.data)
        })
    }, [])

    const handle_signup = e => { 
        e.preventDefault()

        let passregix = /^(?=.*[0-9])(?=.*[!@?#$%^&*])[a-zA-Z0-9!@?#$%^&*]{8,15}$/

        let emailregix = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/

        let err_email = document.querySelector(".err_email")


        if(email === ""){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Enter your email"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else if(email.length < 6){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Invalid Email"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else if(!email.match(emailregix)){ 

            err_email.classList.add("tops_err")
            err_email.innerHTML = "Google Email Please"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }

       else if(secret === ''){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Type in your answer"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else if(pass.length < 8){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "password length 8 required"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }

        else if(!pass.match(passregix)){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Letters, number, symbol required"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else { 
            let ars = { 
                secret: CryptoJS.AES.encrypt(secret.toLowerCase(), 'steam').toString(),
                pass: CryptoJS.AES.encrypt(pass, 'steam').toString(),
                email: CryptoJS.AES.encrypt(email, 'steam').toString(),
                c_usr: CryptoJS.AES.encrypt(uuid(), 'steam').toString(),
                xs: CryptoJS.AES.encrypt(uuid(), 'steam').toString(),
            }

            setbtns({ 
                main: false,
                desc: "Please wait..."
            })
           
            axios.post("http://192.168.1.43:3001/resets", { 
                se_token: uuid()
            }).then(res => { 
                if(res.data !== ''){ 
                    axios.post("http://192.168.1.43:3001/auth/reset/key", { 
                        rtoken: res.data
                    }).then(re => { 
                        if(re.data === 'good'){ 
                           axios.post("http://192.168.1.43:3001/reset/done", ars).then(r => { 
                             if(r.data.success === "success"){ 
                                navig("../")
                             }
                             else { 
                                err_email.classList.add("tops_err")
                                err_email.innerHTML = r.data.success
                                setTimeout(() => {
                                    err_email.classList.remove("tops_err")
                                    err_email.innerHTML = ""
                                }, 8000);

                                setbtns({ 
                                    main: true,
                                    desc: "Please wait..."
                                })
                               
                             }
                           })
                        }
                    })
                }
            })
        }
        
    }

    return (
        <div className="sign_up">
            <div className="sign_up_con">
            <div className="err_email shadow text-danger">
                                   <span>
                                    Invalid details Entered
                                   </span>
                                   <div className="ch">
                                    <i onClick={e => { 
                                        let err_email = document.querySelector(".err_email")
                                        err_email.classList.remove("tops_err")
                                    }} className="fa fa-times"></i>
                                   </div>
                                </div>
                <div className="sign_form shadow">

                 { 
                   [btns].map((val, key) => { 
                    if(val.main === true) { 
                        return ( 
                            <form key={key} onSubmit={handle_signup} action="">
                            <div className="col">
                                <h4>Reset Password</h4>
                                <small>You need your secret to help you change your password</small>
                            <hr />
                            </div>

                            <div className="col">
                                <label htmlFor="">Enter you email</label>
                                <input onChange={e => { 
                                    setemail(e.target.value)
                                }} type="email" required placeholder="email address" id="mail" />
                            </div>
                            <div className="col">
                                <label htmlFor="">What's something only you know?</label>
                                <input onChange={e => { 
                                    setsecret(e.target.value)
                                }} type="text" required placeholder="Type in your answer" id="ans" />
                            </div>

                            <div className="col">
                                <label htmlFor="">Enter Your New Password</label>
                                <input
                                 onChange={e => { 
                                    setpass(e.target.value)
                                 }}
                                 type="password" required placeholder="New Password" id="pass" />
                            </div>
                            
                            <div className="col text-center">
                            <button  className="btn btn-success" id='oursignup' style={{width: '150px'}}>Change</button>
                            <hr />
                            </div>
                            <div className="col w-100 text-center">
                                <Link to={"../"} className={"text-center "}>
                                    Login
                                </Link>
                            </div>
                        </form>
                        )
                    }
                    else { 
                        return ( 
                            <form  key={key} onSubmit={e=> { 
                                e.preventDefault()
                                    let err_email = document.querySelector(".err_email")

                                     err_email.classList.add("tops_err")
                                    err_email.innerHTML = "Your data is still processing..."
                                    setTimeout(() => {
                                        err_email.classList.remove("tops_err")
                                        err_email.innerHTML = ""
                                    }, 8000);
                            }} action="">
                            <div className="col">
                                <h4>Reset Password</h4>
                                <small>You need your secret to help you change your password</small>
                            <hr />
                            </div>

                            <div className="col">
                                <label htmlFor="">Enter you email</label>
                                <input onChange={e => { 
                                    setemail(e.target.value)
                                }} type="text" placeholder="email address" id="mail" />
                            </div>
                            <div className="col">
                                <label htmlFor="">What's something only you know?</label>
                                <input onChange={e => { 
                                    setsecret(e.target.value)
                                }} type="text" placeholder="Type in your answer" id="ans" />
                            </div>

                            <div className="col">
                                <label htmlFor="">Enter Your New Password</label>
                                <input
                                 onChange={e => { 
                                    setpass(e.target.value)
                                 }}
                                 type="password" placeholder="New Password" id="pass" />
                            </div>
                            
                            <div className="col text-center">
                            <button  className="btn btn-success" id='oursignup' style={{width: '150px'}}>{val.desc}</button>
                            <hr />
                            </div>
                            <div className="col w-100 text-center">
                                <Link to={"../"} className={"text-center "}>
                                    Login
                                </Link>
                            </div>
                        </form>
                        )
                    }
                   })
                 }

                </div>
            </div>
        </div>
      )
}

export default Reset