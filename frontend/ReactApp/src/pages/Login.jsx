import TextField from "../components/TextField"
import Logo from "../assets/kv-logo.png"
import Icon from "../assets/loginpage.jpg"
import Button from "../components/Button"

const Login =()=>{
    return <>
     <main>
         <div className="hero">
             <div className="wrapper-hero">
                 <img src={Icon} alt="Login Image" className="login-image"/>
             </div>
         </div>
         <div className="login">
             <form action="/" method="post">
                 <img src={Logo} alt="Logo" className="logo"/>
                 <span>
                     <label htmlFor="uname">Username</label>
                     <TextField></TextField>
                 </span>
                 <span>
                     <label htmlFor="uname">Password</label>
                     <TextField></TextField>
                 </span>
                <Button></Button>
             </form>
         </div>
     </main>
    </>
}

export default Login