import { FC, useState } from "react"
import "./LoginPage.css"
import { Link, useNavigate } from "react-router-dom";

const LoginPage : FC<{isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}> = ({isLoggedIn, setIsLoggedIn}) => {

    const [login, setLogin] = useState(true);
    const [userData, setUserData] = useState({email: "", password: ""});
    const [signupUserData, setSignupUserData] = useState({email: "", password: "", cpassword: ""});
    const navigate = useNavigate();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        const {name, value} = event.target;
        setUserData((prev) => ({...prev, [name]: value}));
    }

    const loginHandler = (event: React.FormEvent<HTMLFormElement>) : void => {
        event.preventDefault(); 
        console.log(userData);
        setIsLoggedIn(true);
        window.localStorage.setItem("userData", JSON.stringify(userData));
        navigate(-1);
    }

    const signupChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        const {name, value} = event.target;
        setSignupUserData((prev) => ({...prev, [name]: value}));
    }

    const signupHandler = (event: React.FormEvent<HTMLFormElement>) : void => {
        event.preventDefault(); 
        console.log(signupUserData);
        if(signupUserData.password === signupUserData.cpassword){
            setIsLoggedIn(true);
            window.localStorage.setItem("userData", JSON.stringify(signupUserData));
            navigate(-1);
        }
        else{
            console.log("Passwords do not match.");
        }
    }

    return (
        <div className='loginpage'>
            <div className="loginpage_container">
                <div className={`${login ? 'loginpage_left' : 'loginpage_left_none'}`}>
                    <div className="loginpage_left_top">
                        <Link to="/"><p className="title">Noodletown</p></Link>
                        <p className="welcome">Welcome Back!</p>
                    </div>
                    <form className="form_container" onSubmit={loginHandler}>
                        <p className="login_text">Log in</p>
                        <p className="desc">Welcome back! please enter your details.</p>
                        <label htmlFor="email" className="label_text">Email</label>
                        <input type="text" id="email" className="input_box" onChange={changeHandler} placeholder="Enter Your Email" value={userData.email} name="email"/>
                        <label htmlFor="password" className="label_text">Password</label>
                        <input type="text" id="password" className="input_box" onChange={changeHandler} placeholder="********" value={userData.password} name="password"/>
                        <div className="forgor_password_div">
                            <p className="forgot_password_text">Forgot Password?</p>
                        </div>
                        <div className="login_btn_box">
                            <button className="signin_btn">Sign in</button>
                        </div>
                    </form>
                </div>
                <div className={`${ login ? "loginpage_center" : "loginpage_center_on"}`}>
                    <img className="loginpage_img" src="https://images.unsplash.com/photo-1615719413546-198b25453f85?q=80&w=2236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <div className="loginpage_center_div">
                        <p className="loginpage_center_div_title">Craving Something?</p>
                        <p className="loginpage_center_div_desc">Let's get you started!</p>
                        <button className="signin_btn" onClick={() => { setLogin(!login); }}>Get's Started</button>
                    </div>
                </div>
                <div className={`${!login ? 'loginpage_right' : 'loginpage_right_none'}`}>
                    <div className="loginpage_left_top">
                        <p className="title">Noodletown</p>
                        <p className="welcome">Welcome Back!</p>
                    </div>
                    <form className="form_container" onSubmit={signupHandler}>
                        <p className="login_text">Sign up</p>
                        <p className="desc">Welcome! please enter your details.</p>
                        <label htmlFor="email" className="label_text">Email</label>
                        <input type="text" id="email" className="input_box" onChange={signupChangeHandler} value={signupUserData.email} placeholder="Enter Your Email" name="email"/>
                        <div className="password_div">
                            <div className="password_div_signup">
                                <label htmlFor="password" className="label_text">Password</label>
                                <input type="text" id="password" className="input_box" placeholder="********" onChange={signupChangeHandler} value={signupUserData.password} name="password"/>
                            </div>
                            <div className="password_div_signup">
                                <label htmlFor="cnfpassword" className="label_text">Confirm Password</label>
                                <input type="text" id="cnfpassword" className="input_box" placeholder="********" onChange={signupChangeHandler} value={signupUserData.cpassword} name="cpassword"/>
                            </div>
                        </div>
                        <div className="signup_btn_box">
                            <button className="signin_btn">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage