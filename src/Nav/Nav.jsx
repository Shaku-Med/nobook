import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Connect } from "../Connect/Connect";
import CryptoJS from "crypto-js";

import { v4 as uuid } from "uuid";

function Nav() {
  const { navdata, setnavdatas } = useContext(Connect);

  const [filesize, setfilesie] = useState("Photo / video")

  const [filesmain, setfilesmain] = useState([])

  useEffect(() => {
    axios
      .post("http://192.168.1.43:3001/fetch/token", {
        c_usr: CryptoJS.AES.encrypt(Cookies.get("c_usr"), "steam").toString(),
        xs: CryptoJS.AES.encrypt(Cookies.get("xs"), "steam").toString(),
        token: CryptoJS.AES.encrypt(uuid(), "steam").toString(),
      })
      .then((res) => {
        if (res.data.success === "yes") {
          console.clear();
          localStorage.clear();
          Cookies.remove("c_usr");
          Cookies.remove("xs");
          window.location.reload();
        } else {
          setnavdatas(res.data);
        }
      });
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (
        Cookies.get("c_usr") &&
        Cookies.get("xs") &&
        localStorage.getItem("_g")
      ) {
        if (
          Cookies.get("c_usr") !== null &&
          Cookies.get("xs") !== null &&
          localStorage.getItem("_g") !== null
        ) {
          if (Cookies.get("c_usr") === localStorage.getItem("_g")) {
          } else {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
      } else {
        window.location.reload();
      }
    }, 10);
  }, []);

  const [posttext, setposttext] = useState('')
  const [privacy, setpostprivacy] = useState('Public')


  const [btns, setbtns] = useState(
    { 
        main: true,
        desc: "Please wait..."
    }
)

  const handlesubmit = e => { 
    e.preventDefault()

    if(posttext !== '' && filesmain.length < 1){ 
        setbtns({ 
            main: false,
            desc: "Please wait..."
        })

        axios.post("http://192.168.1.43:3001/post/text/token", { 
            c_usr: CryptoJS.AES.encrypt(Cookies.get("c_usr"), 'steam').toString(),
            xs: CryptoJS.AES.encrypt(Cookies.get("xs"), 'steam').toString(),
            token: CryptoJS.AES.encrypt(uuid(), 'steam').toString()
        }).then(res => { 
            console.log(res.data)
            axios.post("http://192.168.1.43:3001/post/text", { 
                c_usr: CryptoJS.AES.encrypt(Cookies.get("c_usr"), 'steam').toString(),
                posttext: CryptoJS.AES.encrypt(posttext, 'steam').toString(), 
                filetype: CryptoJS.AES.encrypt("Text", 'steam').toString(), 
                generalid: CryptoJS.AES.encrypt(uuid(), 'steam').toString(), 
                singleid: CryptoJS.AES.encrypt(uuid(), 'steam').toString(), 
                ourg: CryptoJS.AES.encrypt(res.data, 'steam').toString(), 
                filesmain: '',
            }).then(r => { 
                console.log(r.data)
            })
        })
    }
    else if(posttext === '' && filesmain.length >= 1){ 
      for(var i of filesmain){ 
        alert(i.type)
        if(i.type === 'video/mp4' || i.type === "video/quicktime"){ 
            alert("Uploading video vile")

            setbtns({ 
                main: false,
                desc: "Please wait..."
            })
        }
        else if(i.type === 'image/jpeg' || i.type === 'image/jpg' || i.type === 'image/png' || i.type === 'image/wav'){ 
            alert("Image uploading")

            setbtns({ 
                main: false,
                desc: "Please wait..."
            })
        }
        else { 
            alert("Invalid File")
        }
      }
    }
    else if(posttext !== '' && filesmain.length >= 1){ 
        for(var i of filesmain){ 
            alert(i.type)
            if(i.type === 'video/mp4' || i.type === "video/quicktime"){ 
                alert("Uploading video vile")
            }
            else if(i.type === 'image/jpeg' || i.type === 'image/jpg' || i.type === 'image/png' || i.type === 'image/wav'){ 
                alert("Image uploading")
            }
            else { 
                alert("Invalid File")
            }
          }
    }
    else { 
        alert("Please Choose a file or write something.")
    }

  }

  return (
    <>
      {navdata.length < 1 ? (
        <div className="loaders">
          <div className="load_mid">Setting up...</div>
        </div>
      ) : (
        navdata.map((val, key) => {
          if (
            CryptoJS.AES.decrypt(val.c_usr, "steam").toString(
              CryptoJS.enc.Utf8
            ) === Cookies.get("c_usr")
          ) {
            return (
              <div key={key} className="nav_main shadow">
                <div className="nav_cont">
                  <div className="nav_logo">
                    <img
                      style={{ pointerEvents: "none" }}
                      src="../logo.png"
                      alt=""
                    />
                    <div className="search_ico">
                      <i className="fa fa-search"></i>
                      <input type="search" placeholder="Search No-Book" id="" />
                    </div>
                  </div>
                  <div className="nav_tols">
                    <Link to={"../"}>
                      <div className="col_nav">
                        <i className="fa fa-home"></i>
                        <span>Home</span>
                      </div>
                    </Link>
                    <Link to={"../Friends"}>
                      <div className="col_nav">
                        <i className="fa fa-user"></i>
                        <span>Friends</span>
                      </div>
                    </Link>
                    <Link to={"../Watch"}>
                      <div className="col_nav">
                        <i className="fa fa-tape"></i>
                        <span>Watch</span>
                      </div>
                    </Link>
                    <Link to={"../Groups"}>
                      <div className="col_nav">
                        <i className="fa fa-users"></i>
                        <span>Groups</span>
                      </div>
                    </Link>
                  </div>
                  <div className="nav_not_main">
                    <div className="add_post_1">
                      <i
                        id="our_drops"
                        onClick={(e) => {
                          let drop_downs =
                            document.querySelector(".drop_downs");
                          let our_plus = document.querySelector(".our_plus");

                          document.addEventListener("pointerdown", (es) => {
                            if (es.target.id !== "our_drops") {
                              drop_downs.classList.remove("crd_m");
                            } else {
                              drop_downs.classList.add("crd_m");
                            }
                          });
                        }}
                        className="fa fa-plus our_plus"
                      ></i>
                      <div id="our_drops" className="drop_downs shadow rounded">
                        <div id="our_drops" className="head_ h1">
                          Create
                        </div>
                        <hr id="our_drops" />
                        <div id="our_drops" className="what_posts">
                          <div className="cr_1 rounded">
                            <i className="fa fa-edit"></i>
                            <div onClick={e => { 
                                let upload_now_settings = document.querySelector(".upload_now_settings")
                                upload_now_settings.classList.add("sh_upl")
                            }} className="ed_s">
                              <div className="eh">Post</div>
                              <small>Share a post on News Feed.</small>
                            </div>
                          </div>
                          <div className="cr_1 rounded">
                            <i className="fa fa-book-open"></i>
                            <div className="ed_s">
                              <div className="eh">Story</div>
                              <small>Share a Photo or write something.</small>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="adv_part">
                          <div className="cr_1 rounded">
                            <i className="fa fa-book-open"></i>
                            <div className="ed_s">
                              <div className="eh">Group</div>
                              <small>
                                Connect with people who share your interests.
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="notif_a">
                      <Link to={"../"}>
                        <i title="Chats" className="fa fa-comment"></i>
                      </Link>
                    </div>
                    <div className="usr_profiles">
                      <div className="prof_m">
                        <img
                          id="pcard"
                          onClick={(e) => {
                            let prof_card =
                              document.querySelector(".prof_card");
                            let our_plus = document.querySelector(".our_plus");

                            document.addEventListener("pointerdown", (es) => {
                              if (es.target.id !== "pcard") {
                                prof_card.classList.remove("pcard");
                              } else {
                                prof_card.classList.add("pcard");
                              }
                            });
                          }}
                          style={{ cursor: "pointer" }}
                          onError={(e) => {
                            e.target.src =
                              "https://media.istockphoto.com/id/951985126/vector/fail-ink-stamp.jpg?s=612x612&w=0&k=20&c=YIHZIUaRLJqNArnsvWWIswGIn3Q5y7FWxUsNQs-rzrQ=";
                          }}
                          src={CryptoJS.AES.decrypt(
                            val.profilepic,
                            "steam"
                          ).toString(CryptoJS.enc.Utf8)}
                          alt=""
                        />
                      </div>
                      <div id="pcard" className="prof_card shadow rounded">
                        <div className="con_nams shadow rounded">
                          <div
                            id="pcard"
                            style={{ cursor: "pointer", pointerEvents: "none" }}
                            className="ad"
                          >
                            <img
                              onError={(e) => {
                                e.target.src =
                                  "https://media.istockphoto.com/id/951985126/vector/fail-ink-stamp.jpg?s=612x612&w=0&k=20&c=YIHZIUaRLJqNArnsvWWIswGIn3Q5y7FWxUsNQs-rzrQ=";
                              }}
                              id="pcard"
                              src={CryptoJS.AES.decrypt(
                                val.profilepic,
                                "steam"
                              ).toString(CryptoJS.enc.Utf8)}
                              alt=""
                            />
                            <span id="pcard" className="ourname_usr">
                              {CryptoJS.AES.decrypt(
                                val.names,
                                "steam"
                              ).toString(CryptoJS.enc.Utf8)}
                            </span>
                          </div>
                          <Link
                            className="p-2 mb-3 text-center w-100"
                            style={{
                              padding: "10px",
                              paddingBottom: "20px",
                              width: "100%",
                            }}
                            to={
                              "../Profile/" +
                              CryptoJS.AES.decrypt(
                                val.pageid,
                                "steam"
                              ).toString(CryptoJS.enc.Utf8)
                            }
                          >
                            See Profile
                          </Link>
                          <hr />
                        </div>
                        <div className="cad_ses w-100">
                          <div className="c_a_1">
                            <i className="fa fa-gear"></i>
                            <span>Settings</span>
                          </div>
                        </div>
                        <div className="cad_ses w-100">
                          <div onClick={e => { 
                            if(window.confirm("Do you wish to log out?") === true){ 
                                console.clear();
                                localStorage.clear();
                                Cookies.remove("c_usr");
                                Cookies.remove("xs");
                                window.location.reload();
                            }
                          }} className="c_a_1">
                            <i className="fa fa-door-open"></i>
                            <span>Log Out</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="upload_now_settings">
                    <div className="reset_box rounded shadow">
                        <div className="head main_h text-center h5">
                            <span>Create Post</span>
                            <i onClick={e => { 
                                let upload_now_settings = document.querySelector(".upload_now_settings")
                                upload_now_settings.classList.remove("sh_upl")
                            }} className="fa fa-times"></i>
                        </div>
                        <div className="user_options">
                            <div className="img_co">
                            <img
                              onError={(e) => {
                                e.target.src =
                                  "https://media.istockphoto.com/id/951985126/vector/fail-ink-stamp.jpg?s=612x612&w=0&k=20&c=YIHZIUaRLJqNArnsvWWIswGIn3Q5y7FWxUsNQs-rzrQ=";
                              }}
                              id="pcard"
                              src={CryptoJS.AES.decrypt(
                                val.profilepic,
                                "steam"
                              ).toString(CryptoJS.enc.Utf8)}
                              alt=""
                            />
                            </div>
                            <div className="nam_op">
                                <div className="nst">
                                {CryptoJS.AES.decrypt(
                                val.names,
                                "steam"
                              ).toString(CryptoJS.enc.Utf8)}
                                </div>
                                <div className="post_options">
                                    <select onChange={e => { 
                                setpostprivacy(e.target.value)
                               }} name="" id="postop">
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="post_main_d">

                            { 
                               [btns].map((m, h) => { 
                                  if(m.main === true){ 
                                    return ( 
                                        <form key={h} onSubmit={handlesubmit} action="">
                                        <div className="post_main_edits">
                                            <textarea onChange={e => { 
                                             setposttext(e.target.value)
                                            }} name="" id="" placeholder={"What's new " + CryptoJS.AES.decrypt(
                                             val.names,
                                             "steam"
                                           ).toString(CryptoJS.enc.Utf8).split(' ')[0] + "?"}></textarea>
                                         </div>
                                         <label htmlFor="postfile" style={{width: "100%"}}>
                                         <div className="upload_show text-center">
                                             <i className="fa fa-upload"></i>
                                             <h5 className="mt-2">{filesize}</h5>
                                         </div>
                                         </label>
                                         <input onChange={e => { 
                                             if(e.target.files.length > 4){ 
                                                 setfilesie("Woa 😮. 4 File is the limit")
                                             }
                                             else { 
                                                 setfilesmain(e.target.files)
                                                 setfilesie("Good file Length: " + e.target.files.length)
                                             }
                                         }} multiple type="file" name="" accept="image/* video/mp4 video/quicktime" id="postfile" className="d-none" />
                                         <div className="send_btn w-100">
                                             <button className="btn btn-outline-success w-100 mt-2">Post</button>
                                         </div>
                                        </form>
                                    )
                                  }
                                  else { 
                                   return ( 
                                    <form key={h} onSubmit={e => {
                                        e.preventDefault() 
                                        alert("File under processing... Please wait...")
                                    }} action="">
                                    <div className="post_main_edits">
                                        <textarea onChange={e => { 
                                         setposttext(e.target.value)
                                        }} name="" id="" placeholder={"What's new " + CryptoJS.AES.decrypt(
                                         val.names,
                                         "steam"
                                       ).toString(CryptoJS.enc.Utf8).split(' ')[0] + "?"}></textarea>
                                     </div>
                                     <label htmlFor="postfile" style={{width: "100%"}}>
                                     <div className="upload_show text-center">
                                         <i className="fa fa-upload"></i>
                                         <h5 className="mt-2">{filesize}</h5>
                                     </div>
                                     </label>
                                     <input onChange={e => { 
                                         if(e.target.files.length > 4){ 
                                             setfilesie("Woa 😮. 4 File is the limit")
                                         }
                                         else { 
                                             setfilesmain(e.target.files)
                                             setfilesie("Good file Length: " + e.target.files.length)
                                         }
                                     }} multiple type="file" name="" accept="image/* video/mp4 video/quicktime" id="postfile" className="d-none" />
                                     <div className="send_btn w-100">
                                         <button className="btn btn-outline-success w-100 mt-2">{m.desc}</button>
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
            );
          }
        })
      )}
    </>
  );
}

export default Nav;
