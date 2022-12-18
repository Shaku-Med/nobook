import './App.css';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie'
import {BrowserRouter} from 'react-router-dom'
import Auth from './Auth/Auth';
import { Connect } from './Connect/Connect';
import Routing from './Routing';
import Nav from './Nav/Nav';

function App() {

  const [st, setst] = useState({ 
    home: true,
    auth: false,
    frame: false,
    loader: true
  })

  const [navdata, setnavdatas] = useState([])

  useEffect(() => { 
    if(window.top !== window.self){ 
      setst({ 
        home: false,
        auth: false,
        frame: true,
        loader: false
      })
    }
    else { 
      setTimeout(() => {
          if(Cookie.get("c_usr") && Cookie.get("xs") && localStorage.getItem("_g")){ 
            if(Cookie.get("c_usr") !== null && Cookie.get("xs") !== null && localStorage.getItem("_g") !== null){ 
              if(Cookie.get("c_usr") === localStorage.getItem("_g")){ 
                setInterval(() => {
                  if(Cookie.get("c_usr") && Cookie.get("xs") && localStorage.getItem("_g")){ 
                    if(Cookie.get("c_usr") !== null && Cookie.get("xs") !== null && localStorage.getItem("_g") !== null){ 
                      if(Cookie.get("c_usr") === localStorage.getItem("_g")){ 
                        setst({ 
                          home: true,
                          auth: false,
                          frame: false,
                          loader: false
                        })
                      }
                      else { 
                        Cookie.remove("c_usr")
                        Cookie.remove("xs")
                        localStorage.clear()
                      }
                    }
                    else { 
                      Cookie.remove("c_usr")
                      Cookie.remove("xs")
                      localStorage.clear()

                    }
                  }
                  else { 
                    Cookie.remove("c_usr")
                    Cookie.remove("xs")
                    localStorage.clear()
                  }
                }, 10);
              }
              else { 
                setst({ 
                  home: false,
                  auth: true,
                  frame: false,
                  loader: false
                })
              }
            }
            else { 
              setst({ 
                home: false,
                auth: true,
                frame: false,
                loader: false
              })
            }
          }
          else { 
            setst({ 
              home: false,
              auth: true,
              frame: false,
              loader: false
            })
          }
      }, 5000);
    }

    setTimeout(() => {
      console.clear()
    }, 1000);
  }, [])

  return (
    <>
       { 
         [st].map((val, key) => { 
          if(val.frame === true){ 
            console.error(" UnAuthorized Route")
            setTimeout(() => {
              setInterval(() => {
                console.clear()
                localStorage.clear()
                Cookie.remove("c_usr")
                Cookie.remove("xs")
              }, 1000);
            }, 10000);
            return ( 
              <div key={key} className="text-center ous h-full w-100 d-flex align-items-center justify-content-center bg-danger" style={{width: '100%', height: '100vh'}}>
                <div className="bg-red shadow rounded p-4 h1">
                   UnAuthorized Route
                <hr />
                </div>
              </div>
            )
          }
          else { 
            if(val.loader === true){ 
              return ( 
                <div className='oust' key={key}>
                  <div className="blobs">
	<div className="blob-center"></div>
	<div className="blob"></div>
	<div className="blob"></div>
	<div className="blob"></div>
	<div className="blob"></div>
	<div className="blob"></div>
	<div className="blob"></div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
      <feBlend in="SourceGraphic" in2="goo"></feBlend>
  	</filter>
  </defs>
</svg>
                </div>
              )
             }
             else { 
              if(val.auth === true){ 
                return ( 
                  <div key={key}>
                    <BrowserRouter>
                     <Auth/>
                    </BrowserRouter>
                  </div>
                )
              }
              else { 
                return ( 
                 <Connect.Provider key={key} value={{navdata, setnavdatas}}>
                    <BrowserRouter>
                       <Nav/>
                       <Routing/>
                    </BrowserRouter>
                 </Connect.Provider>
                )
              }
             }
          }
         })
       }
    </>
  );
}

export default App;