import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Connect } from "../Connect/Connect";
import CryptoJS from "crypto-js";

import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";

function Home() {
  const { navdata, setnavdatas } = useContext(Connect);

  return (
    <div className="home_main">
      <div className="home_first_part">
        <div className="head_main_home h4 mt-2 p-2">Followers</div>
        <div className="folo_line">
          <Link to={"../"}>
            <div className="sol_one rounded shadow">
              <img
                src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                alt=""
              />
              <div className="name_of">Mohamed Brima Amara</div>
            </div>
          </Link>

          <div className="sol_two rounded shadow">
            <div className="round_ers"></div>
            <div className="name_of_me"></div>
          </div>
        </div>
      </div>
      <div className="home_middle_part">
        <div className="stories">
          <Link to={"../"}>
            <div className="sgory_main shadow">
              <img
                id="scme"
                src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                alt=""
              />
              <div className="us_own">
                <img
                  src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                  alt=""
                />
              </div>
            </div>
          </Link>
          <Link to={"../"}>
            <div className="sgory_main shadow">
              <img
                id="scme"
                src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                alt=""
              />
              <div className="us_own">
                <img
                  src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                  alt=""
                />
              </div>
            </div>
          </Link>
          <Link to={"../"}>
            <div className="sgory_main shadow">
              <img
                id="scme"
                src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                alt=""
              />
              <div className="us_own">
                <img
                  src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                  alt=""
                />
              </div>
            </div>
          </Link>
          <Link to={"../"}>
            <div className="sgory_main shadow">
              <img
                id="scme"
                src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                alt=""
              />
              <div className="us_own">
                <img
                  src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                  alt=""
                />
              </div>
            </div>
          </Link>
        </div>
        <hr />
        <div className="ac_user p-2">
          <div className="sho_ppv shadow">
            <div className="top_ask w-100 mb-3">
              <img
                src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                alt=""
              />
              <div className="shqt_new">What's New Mohamed?</div>
            </div>
            <div className="buts">
              <button className="btn btn-outline-warning">
                Feeling / Activity
              </button>
              <button className="btn btn-outline-primary">Photo / Video</button>
            </div>
          </div>
        </div>
        <div className="posteD_containers">
          <div className="post_mains shadow">
            <div className="popo">
              <div className="post_main">
                <img
                  style={{ pointerEvents: "none" }}
                  src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                  alt=""
                />
                <div className="cont_ents">
                  <Link to={"../"}>
                    <div className="nam">Mohamed Brima Amara</div>
                  </Link>
                  <div className="times">
                    <i className="fa fa-globe"></i>
                    <span>2h ago</span>
                  </div>
                </div>
              </div>
              <div className="options">
                <i
                  onClick={(e) => {
                    let di = document.querySelector(".down");
                    document.addEventListener("pointerdown", (es) => {
                      if (es.target.id === "1") {
                        di.style.display = "block";
                      } else {
                        di.style.display = "none";
                      }
                    });
                  }}
                  id="1"
                  className="fa-solid fa-ellipsis"
                ></i>
                <div id="1" className="down">
                  <div className="d_1">
                    <i className="fa fa-save"></i>
                    <div className="to_1">
                      <div className="to_m">Save</div>
                      <small>Save to view for later.</small>
                    </div>
                  </div>
                  <div className="d_1">
                    <i className="fa fa-link"></i>
                    <div className="to_1">
                      <div className="to_m">Share</div>
                      <small>Share this post outside No-Book</small>
                    </div>
                  </div>
                  <div className="d_1">
                    <i className="fa fa-exclamation-circle"></i>
                    <div className="to_1">
                      <div className="to_m">Report</div>
                      <small>
                        Report This post if you think it violates our community
                        laws
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="descMe p-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              a accusamus, quo quasi maiores tenetur tempora fugit amet, nulla
              corrupti quos natus rem dolor eveniet debitis iure aperiam,
              dignissimos consequatur.
            </div>
            <div className="posted_image">
              <Link to={"../"}>
                <div className="img_posted">
                  <img
                    src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/6f5/d79/6c2d4457e7b227254fbc0f51b8.jpg"
                    alt=""
                  />
                </div>
              </Link>
              <Link to={"../"}>
                <div className="img_posted">
                  <video
                    src="https://player.vimeo.com/external/559857411.sd.mp4?s=9872177190d3d4b127ff889adf973162a7886f9d&profile_id=165&oauth2_token_id=57447761#t=1"
                    playsInline
                    controls
                  ></video>
                </div>
              </Link>
            </div>

            <div className="amount_of_likes actions_pages">
              <div className="btn_two">
                <span className="material-symbols-outlined" id="likes">
                  thumb_up
                </span>
                <span id="likes">2k</span>
              </div>
              <div className="btn_two">
                <span className="material-symbols-outlined">
                  google_plus_reshare
                </span>
                <span>5k</span>
              </div>
              <div className="btn_two">
                <span className="material-symbols-outlined">forum</span>
                <span>3k</span>
              </div>
            </div>

            <div className="actions_pages">
              <div className="btn_one">
                <span className="material-symbols-outlined" id="likes">
                  thumb_up
                </span>
                <span id="likes">Liked</span>
              </div>
              <div className="btn_one">
                <span className="material-symbols-outlined">
                  google_plus_reshare
                </span>
                <span>Share</span>
              </div>
              <div className="btn_one">
                <span className="material-symbols-outlined">forum</span>
                <span>Comment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home_last_part">
        <div className="ordn">
          {navdata.length < 1
            ? "Loading..."
            : navdata.map((v, k) => {
                if (
                  CryptoJS.AES.decrypt(v.c_usr, "steam").toString(
                    CryptoJS.enc.Utf8
                  ) === Cookies.get("c_usr")
                ) {
                  return (
                    <div
                      style={{
                        backgroundImage: `url(${CryptoJS.AES.decrypt(
                          v.coverpic,
                          "steam"
                        ).toString(CryptoJS.enc.Utf8)})`,
                      }}
                      key={k}
                      className="user_part_w"
                    >
                      <img
                        onError={(e) => {
                          e.target.src =
                            "https://media.istockphoto.com/id/951985126/vector/fail-ink-stamp.jpg?s=612x612&w=0&k=20&c=YIHZIUaRLJqNArnsvWWIswGIn3Q5y7FWxUsNQs-rzrQ=";
                        }}
                        id="pcard"
                        src={CryptoJS.AES.decrypt(
                          v.profilepic,
                          "steam"
                        ).toString(CryptoJS.enc.Utf8)}
                        alt=""
                      />
                      <div className="nam_s text-center">
                        <div className="n h5 text-center">
                          {CryptoJS.AES.decrypt(v.names, "steam").toString(
                            CryptoJS.enc.Utf8
                          )}
                        </div>
                        <div className="b">
                          <Link
                            to={
                              "../Profile/" +
                              CryptoJS.AES.decrypt(v.pageid, "steam").toString(
                                CryptoJS.enc.Utf8
                              )
                            }
                            className={"btn btn-outline-primary"}
                          >
                            Edit Profile
                          </Link>
                        </div>
                        <hr />
                      </div>
                    </div>
                  );
                }
              })}
        </div>
        <div className="watch_edpart">
          <div className="h4 text-center">Recently Watched</div>

          <div className="watch_con p-2">
            <Link to={"../"}>
              <div className="sol_one rounded shadow">
                <img
                  src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                  alt=""
                />
                <div className="name_of">
                  <div className="vid_tie">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Necessitatibus harum maiores, temporibus doloremque,
                    quibusdam quaerat incidunt nihil repellat totam aspernatur
                    soluta. Amet alias illum, aut labore dolorum autem provident
                    possimus!
                  </div>
                  <div className="own_vid_n">
                    Mohamed Brima Amara Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Obcaecati natus optio veniam magni eius
                    animi ullam veritatis maxime, quaerat modi sequi ex
                    voluptatum recusandae! Esse beatae quae tempore itaque
                    placeat.
                  </div>
                </div>
              </div>
            </Link>

            <div className="sol_two rounded shadow">
              <div className="round_ers"></div>
              <div className="name_of_me"></div>
            </div>
          </div>
        </div>
        <hr />
        <div className="watch_edpart">
          <div className="h4 text-center">Contacts</div>

          <div className="watch_con p-2">
            <Link to={"../"}>
              <div className="sol_one rounded shadow">
                <img
                  src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"
                  alt=""
                />
                <div className="name_of">
                  <div className="vid_tie">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Necessitatibus harum maiores, temporibus doloremque,
                    quibusdam quaerat incidunt nihil repellat totam aspernatur
                    soluta. Amet alias illum, aut labore dolorum autem provident
                    possimus!
                  </div>
                  <div className="own_vid_n">
                    Mohamed Brima Amara Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Obcaecati natus optio veniam magni eius
                    animi ullam veritatis maxime, quaerat modi sequi ex
                    voluptatum recusandae! Esse beatae quae tempore itaque
                    placeat.
                  </div>
                </div>
              </div>
            </Link>

            <div className="sol_two rounded shadow">
              <div className="round_ers"></div>
              <div className="name_of_me"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
