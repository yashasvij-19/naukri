import React, { useRef } from "react";
import styled from "styled-components";
import Login from "./Login"
import { uid } from 'react-uid';

import { auth, provider, db } from "./firebase"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Text
} from '@chakra-ui/react'
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { setUserLogOutState } from "./userSlice"
import { setUsers } from "./Redux/UserDetails/action";
import { useNavigate } from "react-router-dom";




const Anchor = styled.a`
color:#8292B4;
text-decoration:none;
margin-left:80px;
cursor: pointer;
`;
const AnchorDiv = styled.div`
color:#8292B4;
text-decoration:none;
margin-left:80px;
cursor: pointer;
`;
const InputStyle = styled.input`
width:280px;
height:30px;
`;

const ButtonLogin = styled.button`
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 25px;
  border-radius: 5px;
  color: #fff;
  background: #00bcd4;
  border: 0px;
  text-align: center;
  width:300px;
  height:40px;
`;

const UlStyle = {
    "display": "inline-flex",
    "fontFamily": "sans-serif",
    "listStyleType": "none"
}

const Button = styled.button`
cursor: pointer;
font-size: 17px;
font-weight: 700;
padding: 10px 20px;
border-radius: 40px;
color: #457EFF;
background: white;
border: 1px solid #457EFF;
text-align: center;
`;

export function Navbar1() {
    const dispatch = useDispatch()

    const [user, setUser] = useState(null)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged
            (userAuth => {
                const user = {
                    uid: userAuth.uid,
                    email: userAuth.email
                }
                if (userAuth) {
                    console.log(userAuth._delegate.email)
                    setUser(user)
                    let obj = {
                        name: userAuth._delegate.displayName,
                        email: userAuth._delegate.email
                    }
                    dispatch(setUsers(obj))
                } else {
                    setUser(null)
                }
            })
        return unsubscribe
    }, [])

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const registerRef = useRef(null);
    const registerpasswordRef = useRef(null);

    const Register = e => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(
            registerRef.current.value,
            registerpasswordRef.current.value
        ).then(user => {
            console.log(user)
        }).catch(err =>
            alert(err))
    }
    const emailAuth = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(user => {
            console.log(user)
        }).catch(err =>
            alert(err))
    }
    const emailSignOut = () => {
        auth.signOut().then(() => {
            (dispatch(setUserLogOutState()))
        }).catch((err) => alert(err.message))
    }
    const Navigate = useNavigate();
    const handleJobs = () => {
        Navigate("/UserHomePage");
    }

    return (
        <div style={{display: "flex", margin:"13px 0px 13px 0px"}}>
           <div>
           <a href="https://www.naukri.com" target="_blank">
                <img style={{ "marginLeft": "180px", "marginTop": "10px" }} src="https://static.naukimg.com/s/4/100/i/naukri_Logo.png" height="31" width="186" />
            </a>
           </div>
           <div style={{alignItems: "center", paddingTop: "10px"}}>
           <ul style={UlStyle}>
                <li ><AnchorDiv onClick={handleJobs}>Jobs</AnchorDiv></li>
                <li><Anchor href="https://www.naukri.com/top-company-jobs" target="_blank">Companies</Anchor></li>
                <li><Anchor href="https://resume.naukri.com/resume-services?fftid=100001" target="_blank">Services</Anchor></li>
                <li style={{ "color": "#8292B4", "marginLeft": "80px" }}>Resources</li>
            </ul>
           </div>
            <Popover >
                <PopoverTrigger>
                    {
                        !user? <Button style={{ "marginLeft": "100px" }}>Login</Button> : <Button style={{ "marginLeft": "100px" }}>MY Naukri</Button>
                    }
                </PopoverTrigger>
                <PopoverArrow />
                <PopoverContent>
                    <PopoverCloseButton style={{ "width": "10px", "marginLeft": "620px" }} />
                    <PopoverHeader style={{height: "30px"}}>
                        <h2 style={{ "marginLeft": "500px" }}>Login</h2>
                    </PopoverHeader>
                    <PopoverBody style={{zIndex: "10000000"}}>
                        <div style={{ "marginLeft": "0%" }}>
                            <form>
                                <label style={{ "fontSize": "13px" }}>Email Id / Username</label>
                                <br />
                                <InputStyle ref={emailRef} placeholder="Enter your active Email ID / Username"></InputStyle>
                                <br /><br />
                                <label style={{ "fontSize": "13px" }}>Password</label>
                                <br />
                                <InputStyle ref={passwordRef} placeholder="Enter your password"></InputStyle>
                                <br /><br />
                                {
                                    user ?
                                        (<ButtonLogin onClick={emailSignOut} >Logout</ButtonLogin>)
                                        : (
                                            <ButtonLogin onClick={emailAuth}>Login</ButtonLogin>
                                        )
                                }
                                <p style={{ "marginLeft": "150px" }}>or</p>
                            </form>
                            <Login />
                        </div>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger>
                    <Button style={{ "background": "#FF7555", "color": "white", "border": "none", "marginLeft": "40px" }}>Register</Button>
                </PopoverTrigger>
                <PopoverArrow />
                <PopoverContent>
                    <PopoverCloseButton style={{ "width": "10px", "marginLeft": "350px" }} />
                    <PopoverHeader  style={{height: "30px"}}>
                        <h2 style={{ "marginLeft": "300px" }}></h2>
                    </PopoverHeader>
                    <PopoverBody>
                        <div style={{ "marginLeft": "0%" }}>
                            <form>
                                <label style={{ "fontSize": "13px" }}>Email Id / Username</label>
                                <br />
                                <InputStyle ref={registerRef} placeholder="Enter your active Email ID / Username"></InputStyle>
                                <br /><br />
                                <label style={{ "fontSize": "13px" }}>Password</label>
                                <br />
                                <InputStyle ref={registerpasswordRef} placeholder="Enter your password"></InputStyle>
                                <br /><br />
                                {
                                    user ?
                                        (<ButtonLogin onClick={emailSignOut}>Logout</ButtonLogin>)
                                        : (
                                            <ButtonLogin onClick={Register}>Register</ButtonLogin>
                                        )
                                }
                                <p style={{ "marginLeft": "150px" }}>or</p>
                            </form>
                            <Login />
                        </div>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </div>
    )
}
