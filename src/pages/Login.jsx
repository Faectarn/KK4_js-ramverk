import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, userState } from "../stores/auth/atom";
import '../style/Login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useRecoilState(authState);
    const { token, userId } = useRecoilValue(authState);
    const users = useRecoilValue(userState);
    const userData = users.find(
        (user) => user.id === userId)
    const navigate = useNavigate();

    async function login() {
        const response = await fetch("https://k4backend.osuka.dev/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        const json = await response.json();
        console.log(json);
        setAuth({
            ...auth,
            token: json.token,
            userId: json.userId
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        login();
        console.log(token)
    }

    useEffect(() => {
        if (token) {
            if (userData.role === "admin") {
                navigate("/admin")
            } else {
                navigate("/profile")
            }
        }
    }, [token])

    return (
        <main className="main-login">
            <h1 className="h1-login" >Logga in för att se din profil</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text" placeholder="Användarnamn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password" placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button">Logga in</button>
                <h2 className="h2-login">Saknar du ett konto?</h2>
                <h3 className="h3-login"><Link to="/register">Registrera ny användare</Link></h3>
            </form>
        </main>
    );
}

export default Login;