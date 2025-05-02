import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [sessionUid, setSessionUid] = useState(sessionStorage.getItem("uid"));
    const [sessionUsername, setSessionUsername] = useState(sessionStorage.getItem("username"));


    const onSubmitLogin = async e => {
        e.preventDefault();
        try 
        {
            //build request body
            const body = {username, password}
            //send post request
            const response = await fetch("http://localhost:8080/login", {
                method: "Post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            //retreive response
            const loginResult = await response.json();

            //Check if uid was found
            if(response.ok && loginResult.uid)
            {
                console.log("User found, uid:", loginResult.uid);
                sessionStorage.setItem("uid", loginResult.uid)
                sessionStorage.setItem("username", username);
                setSessionUid(loginResult.uid);
                setSessionUsername(username);
            }
            else
            {
                console.error("User not found");
            }
        }
        catch (error)
        {
            console.log("error found");
            console.error(error.message);
        }
    }

    const onLogout = () =>{
        sessionStorage.removeItem("uid");
        sessionStorage.removeItem("username");
        setSessionUid("");
        setSessionUsername("");
    }

    if(sessionUid && sessionUsername)
    {
        return(
            <>
                <h1>Welcome Back! {sessionStorage.getItem("username")}</h1>
                <button onClick={onLogout}>Logout</button>
            </>
        )
    }



    return(
        <>
            <form onSubmit={onSubmitLogin}>
                <label>
                    Username:
                    <input type="text" values={username} onChange={e => setUsername(e.target.value)}></input>
                </label>
                <label>
                    Password:
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)}></input>
                </label>
                <button>Login</button>
            </form>
        </>
    )
}

export default Login;