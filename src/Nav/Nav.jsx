import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Connect } from "../Connect/Connect";
import CryptoJS from "crypto-js";

import { v4 as uuid } from "uuid";

function Nav() {
  const { navdata, setnavdatas } = useContext(Connect);

  useEffect(() => {
    axios
      .post("http://localhost:3001/fetch/token", {
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
                            <div className="ed_s">
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
                          <div className="c_a_1">
                            <i className="fa fa-door-open"></i>
                            <span>Log Out</span>
                          </div>
                        </div>
                      </div>
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
