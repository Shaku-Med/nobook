import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

import CryptoJS from 'crypto-js';

import axios from 'axios'

import {v4 as uuid} from 'uuid'
import { main } from '@popperjs/core';

function Signup() {


    const [token, settoken] = useState('')
    const [btns, setbtns] = useState(
        { 
            main: true,
            desc: "Please wait..."
        }
    )
    const [setmind, mindates] = useState({ 
        min: "1990-01-01",
        max: "2004-12-31"
    })

    const navig = useNavigate()

    //Encrypted Email => Base64.stringify(hmacSHA512(email, "steam"))


    useEffect(() => { 
        axios.post("http://192.168.1.43:3001/Sign_token", { 
            se_token: uuid()
        }).then(res => { 
            settoken(res.data)
        })
        let dates = document.getElementById("dates")
        let males = document.getElementById("male")
        let females = document.getElementById("female")

        setInterval(() => {


            dates.setAttribute("min", "1990-01-01")
            dates.setAttribute("max", "2004-12-31")

            males.setAttribute("required", true)
            females.setAttribute("required", true)

            localStorage.clear()

        }, 1000);
    }, [])


    const [email, setemail] = useState("")
    const [pass, setpass] = useState("")
    const [names, setnames] = useState("")
    const [dob, setdob] = useState("")
    const [male, setmale] = useState(false)
    const [female, setfemale] = useState(false)
    const [secret, setsecret] = useState("")

    const handle_signup = e => { 
        e.preventDefault()

        let emailregix = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/
        let passregix = /^(?=.*[0-9])(?=.*[!@?#$%^&*])[a-zA-Z0-9!@?#$%^&*]{8,15}$/
        let namerg = /^[a-zA-Z ]+$/
        let err_email = document.querySelector(".err_email")

        if(names.length < 3){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Invalid Name"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else if(names !== names.split('  ')[0]){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "No Double spacing"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else if(names.split(' ').length < 2){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Enter your Surname"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else if(!names.match(namerg)){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Invalid input has been add to your name."
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else 
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
        else if(dob === ''){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Enter your date of birth"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }

        else if(male === false && female === false){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Choose your gender"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }

        else if(secret < 6){ 
            err_email.classList.add("tops_err")
            err_email.innerHTML = "Your secret can be found easily. Please make it stronger"
            setTimeout(() => {
                err_email.classList.remove("tops_err")
                err_email.innerHTML = ""
            }, 8000);
        }
        else { 

            let randomnames = [
                "A", 
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "0",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "a", 
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z"
            ]

            let rand = Math.floor(Math.random() * randomnames.length)

            let arrdata = { 
                names: CryptoJS.AES.encrypt(names, 'steam').toString(),
                email: CryptoJS.AES.encrypt(email, 'steam').toString(),
                pass: CryptoJS.AES.encrypt(pass, 'steam').toString(),
                dob: CryptoJS.AES.encrypt(dob, 'steam').toString(),
                gend: CryptoJS.AES.encrypt( female === false ? "Male" : "Female", 'steam').toString(),
                secret: CryptoJS.AES.encrypt(secret.toLowerCase(), 'steam').toString(),
                c_usr: CryptoJS.AES.encrypt(uuid(), 'steam').toString(),
                xs: CryptoJS.AES.encrypt(uuid(), 'steam').toString(),
                profilepic: CryptoJS.AES.encrypt(`https://avatars.dicebear.com/api/adventurer/${randomnames[rand]}.svg`, 'steam').toString(),
                coverpic: CryptoJS.AES.encrypt("https://timelinecovers.pro/facebook-cover/download/photography-city-lights-facebook-cover.jpg", 'steam').toString(),
                pageid: CryptoJS.AES.encrypt(uuid(), 'steam').toString(),
            }


            // U2FsdGVkX18qwLm7wWx14MZwiEc9RZm7SSGce2bv61A=
            // U2FsdGVkX1/HndLSe+uMzxihgwcJ/4eLd/pO5UYxcIg=
            
            setbtns({ 
                main: false,
                desc: "Please wait..."
            })

            axios.post("http://192.168.1.43:3001/Sign_token", { 
            se_token: uuid()
            }).then(res => { 
                if(res.data !== ''){ 
                    axios.post("http://192.168.1.43:3001/auth/user/key", { 
                        stoken: res.data
                    }).then(r => { 
                        if(r.data === "good"){ 
                            axios.post("http://192.168.1.43:3001/signup/send/auth", arrdata).then(a => { 
                               if(a.data.success !== 'success'){ 
                                    err_email.classList.add("tops_err")
                                    err_email.innerHTML = a.data.success
                                    setTimeout(() => {
                                        err_email.classList.remove("tops_err")
                                        err_email.innerHTML = ""
                                    }, 8000);

                                    setbtns({ 
                                        main: true,
                                        desc: "Please wait..."
                                    })
                        
                               }
                               else { 
                                  navig("../")
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
                            if(val.main === true){ 
                                return ( 
                                    <form key={key} onSubmit={handle_signup} action="">
                                    <div className="col">
                                        <h4>Sign up</h4>
                                        <small>It's quick and easy</small>
                                    <hr />
                                    </div>
                                    <div className="cm_form">
                                    <div className="col">
                                         <label htmlFor="birthday">Important:</label>
                                      <br />
                                        <input onChange={e => { 
                                            setnames(e.target.value)
                                        }} type="text" placeholder="First name & Surname" id="names" required/>
                                    </div>
                                    <div className="col">
                                        <input
                                         onChange={e => { 
                                            setemail(e.target.value)
                                        }}
                                         type="email" placeholder="email address" id="email" required />
                                    </div>
                                    <div className="col">
                                        <input
                                         onChange={e => { 
                                            setpass(e.target.value)
                                        }}
                                         type="password" maxLength={15} minLength={8} placeholder="New password" id="password" required/>
                                    </div>
                                    <div className="col">
                                      <label htmlFor="birthday">Birthday:</label>
                                      <br />
                                       <input
                                        onChange={e => { 
                                            setdob(e.target.value)
                                        }}
                                        type="date" placeholder="yyyy-mm-dd" name='birthday' min={setmind.min} max={setmind.max} required id="dates" />
                                    </div>
                                    <div className="col">
                                    <label htmlFor="birthday">Gender:</label>
                                      <br />
                                    </div>
                                    <div className="col ourcol">
                                       <label htmlFor="female">
                                           <input
                                            onChange={e => { 
                                              if(e.bubbles === true){ 
                                                setfemale(true)
                                              }
                                            }}
                                            type="radio" required name="gender" id="female" />
                                           <span>Female</span>
                                       </label>
                                       <label htmlFor="male">
                                           <input
                                            onChange={e => { 
                                                if(e.bubbles === true){ 
                                                    setmale(true)
                                                  }
                                            }}
                                            type="radio" required  name="gender" id="male" />
                                           <span>Male</span>
                                       </label>
                                    </div>
                
                                    <div className="col">
                                    <label htmlFor="birthday">Secret:</label>
                                      <br />
                                        <input
                                         onChange={e => { 
                                            setsecret(e.target.value)
                                        }}
                                         type="text" placeholder="Write something only you know." id="" required />
                                    </div>
                                    <div className="col">
                                        <small className='sm'>
                                        People who use our service may have uploaded your contact information to No-Book
                                        </small>
                                        <hr />
                                        <small className='sm'>
                                        By clicking Sign Up, you agree to our Terms. Learn how we collect, use and share your data in our <span title='We do not allow rubbish to this website' className='text-primary'>Privacy Policy</span> and how we use cookies and similar technology in our Cookies Policy.
                                        </small>
                                    </div>
                                    </div>
                                    <div className="col text-center">
                                    <button key={key} className="btn btn-success" id='oursignup' style={{width: '150px'}}>Sign up</button>
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
                            else{ 
                                return ( 
                                    <form key={key} onSubmit={e => { 
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
                                        <h4>Sign up</h4>
                                        <small>It's quick and easy</small>
                                    <hr />
                                    </div>
                                    <div className="cm_form">
                                    <div className="col">
                                         <label htmlFor="birthday">Important:</label>
                                      <br />
                                        <input onChange={e => { 
                                            setnames(e.target.value)
                                        }} type="text" placeholder="First name & Surname" id="names" required/>
                                    </div>
                                    <div className="col">
                                        <input
                                         onChange={e => { 
                                            setemail(e.target.value)
                                        }}
                                         type="email" placeholder="email address" id="email" required />
                                    </div>
                                    <div className="col">
                                        <input
                                         onChange={e => { 
                                            setpass(e.target.value)
                                        }}
                                         type="password" maxLength={15} minLength={8} placeholder="New password" id="password" required/>
                                    </div>
                                    <div className="col">
                                      <label htmlFor="birthday">Birthday:</label>
                                      <br />
                                       <input
                                        onChange={e => { 
                                            setdob(e.target.value)
                                        }}
                                        type="date" placeholder="yyyy-mm-dd" name='birthday' min={setmind.min} max={setmind.max} required id="dates" />
                                    </div>
                                    <div className="col">
                                    <label htmlFor="birthday">Gender:</label>
                                      <br />
                                    </div>
                                    <div className="col ourcol">
                                       <label htmlFor="female">
                                           <input
                                            onChange={e => { 
                                              if(e.bubbles === true){ 
                                                setfemale(true)
                                              }
                                            }}
                                            type="radio" required name="gender" id="female" />
                                           <span>Female</span>
                                       </label>
                                       <label htmlFor="male">
                                           <input
                                            onChange={e => { 
                                                if(e.bubbles === true){ 
                                                    setmale(true)
                                                  }
                                            }}
                                            type="radio" required  name="gender" id="male" />
                                           <span>Male</span>
                                       </label>
                                    </div>
                
                                    <div className="col">
                                    <label htmlFor="birthday">Secret:</label>
                                      <br />
                                        <input
                                         onChange={e => { 
                                            setsecret(e.target.value)
                                        }}
                                         type="text" placeholder="Write something only you know." id="" required />
                                    </div>
                                    <div className="col">
                                        <small className='sm'>
                                        People who use our service may have uploaded your contact information to No-Book
                                        </small>
                                        <hr />
                                        <small className='sm'>
                                        By clicking Sign Up, you agree to our Terms. Learn how we collect, use and share your data in our <span title='We do not allow rubbish to this website' className='text-primary'>Privacy Policy</span> and how we use cookies and similar technology in our Cookies Policy.
                                        </small>
                                    </div>
                                    </div>
                                    <div className="col text-center">
                                    <button key={key} className="btn btn-success" id='oursignup' style={{width: '150px'}}>{val.desc}</button>
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

export default Signup