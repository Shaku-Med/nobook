import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

import axios from 'axios'

import {v4 as uuid} from 'uuid'

import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';


function Login() {

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const [token, settoken] = useState('')

    const [btns, setbtns] = useState(
        { 
            main: true,
            desc: "Please wait..."
        }
    )

    
    
    useEffect(() => { 
        axios.post("http://192.168.1.43:3001/se_token", { 
            se_token: uuid()
        }).then(res => { 
            settoken(res.data)
        })
        
    }, [])
    

    const handle_login = e => { 
        e.preventDefault()

        let emailregix = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/
        let passregix = /^(?=.*[0-9])(?=.*[!@?#$%^&*])[a-zA-Z0-9!@?#$%^&*]{8,15}$/

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

        else if(token === ''){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "You can't continue. Your token is invalid"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }

        else { 

            let ars = { 
                email: CryptoJS.AES.encrypt(email, 'steam').toString(),
                pass: CryptoJS.AES.encrypt(pass, 'steam').toString()
            }


            setbtns({ 
                main: false,
                desc: "Please wait..."
            })


            axios.post("http://192.168.1.43:3001/se_token", { 
                se_token: uuid()
            }).then(res => { 
               if(res.data !== ''){ 
                 axios.post("http://192.168.1.43:3001/auth/login/key", { 
                    toks: res.data
                 }).then(ers => {
                    if(ers.data === "good"){ 
                        axios.post("http://192.168.1.43:3001/log/me/in", ars).then(r => { 
                            if(r.data.success === "success"){ 
                                setTimeout(() => {
                                    let c_usr = CryptoJS.AES.decrypt(r.data.c_usr, "steam").toString(CryptoJS.enc.Utf8)
                                    let xs = CryptoJS.AES.decrypt(r.data.xs, "steam").toString(CryptoJS.enc.Utf8)

                                Cookies.set("c_usr", c_usr)
                                Cookies.set("xs", xs)
                                localStorage.setItem("_g", c_usr)

                                setTimeout(() => {
                                window.location.reload()
                                }, 1000);
                            }, 1000);
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
    <div className="login">
        <div className="log_cont">
            <div className="intros_f">
                <div className="h3">
                    <div className="nobok h1">no-book</div>
                    <div className="lo_m h5">
                    No-Book helps you connect and share with the people in your life.
                    </div>
                </div>
                <div className="form_co">

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

                    {
                       [btns].map((val, key) => { 
                          if(val.main === true){ 
                            return ( 
                                <form key={key} onSubmit={handle_login} action="" className='shadow rounded'>
                                    <div className="col">
                                        <input onChange={e=> { 
                                            setemail(e.target.value)
                                        }} title='Your email must only be gmail | @gmail.com' type="email" placeholder="email address | @gmail.com" required id="email" />
                                    </div>
                                    <div className="col">
                                        <input 
                                        onChange={e=> { 
                                            setpass(e.target.value)
                                        }}
                                        maxLength={15} title='Your password must be up to 8 containing letters numbers and symbols' type="password" placeholder="Password**" required id="pass" />
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary w-100">
                                            Login
                                        </button>
                                    </div>
                                    <div className="col text-center">
                                        <Link to={"../Reset/Account"}>Forgot password?</Link>
                                    <hr />
                                    </div>
                                    <div className="col w-100 text-center">
                                        <Link to={"../Signup"} className={"btn btn-outline-success"}>Signup</Link>
                                    </div>
                                </form>
                            )
                          }
                          else { 
                            return ( 
                                <form key={key} onSubmit={e=> { 
                                    e.preventDefault()
                                        let err_email = document.querySelector(".err_email")

                                         err_email.classList.add("tops_err")
                                        err_email.innerHTML = "Your data is still processing..."
                                        setTimeout(() => {
                                            err_email.classList.remove("tops_err")
                                            err_email.innerHTML = ""
                                        }, 8000);
                                }} action="" className='shadow rounded'>
                                    <div className="col">
                                        <input onChange={e=> { 
                                            setemail(e.target.value)
                                        }} title='Your email must only be gmail | @gmail.com' type="email" placeholder="email address | @gmail.com" required id="email" />
                                    </div>
                                    <div className="col">
                                        <input 
                                        onChange={e=> { 
                                            setpass(e.target.value)
                                        }}
                                        maxLength={15} title='Your password must be up to 8 containing letters numbers and symbols' type="password" placeholder="Password**" required id="pass" />
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary w-100">
                                            {val.desc}
                                        </button>
                                    </div>
                                    <div className="col text-center">
                                        <Link to={"../Reset/Account"}>Forgot password?</Link>
                                    <hr />
                                    </div>
                                    <div className="col w-100 text-center">
                                        <Link to={"../Signup"} className={"btn btn-outline-success"}>Signup</Link>
                                    </div>
                                </form>
                            )
                          }
                       }) 
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login