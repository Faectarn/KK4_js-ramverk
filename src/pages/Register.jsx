import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../stores/auth/atom";
import '../style/Register.css';

function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phone, setPhone] = useState("");
    const [users, setUsers] = useRecoilState(userState);
    const navigate = useNavigate();

    async function registerUser() {
        const response = await fetch('https://k4backend.osuka.dev/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    email: email,
                    username: username,
                    password: password,
                    role: "user",
                    name: {
                        firstname: firstname,
                        lastname: lastname,
                    },
                    address: {
                        city: city,
                        street: street,
                        number: number,
                        zipcode: zipcode
                    },
                    phone: phone
                }
            )
        })
        const json = await response.json();
        console.log(json);
        setUsers([
            ...users,
            json
        ])
    }

    function handleSubmit(e) {
        e.preventDefault();
        registerUser();
        navigate("/login")
    }

    return (
        <main className="main-login">
            <h1 className="h1-register" >Här kan du registrera en ny användare</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="email" placeholder="E-post"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-div">
                    <input className="name-input"
                        type="text" placeholder="Användarnamn"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input className="name-input"
                        type="password" placeholder="Lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-div">
                    <input className="name-input"
                        type="text" placeholder="Förnamn"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input className="name-input"
                        type="text" placeholder="Efternamn"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div className="input-div">
                    <input className="street-input"
                        type="text" placeholder="Adress"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <input className="number-input"
                        type="number" placeholder="#"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <div className="input-div">
                    <input className="city-input"
                        type="text" placeholder="Postort"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input className="zipcode-input"
                        type="number" placeholder="Postnummer"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </div>
                <input
                    type="number" placeholder="Telefonnummer"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button className="register-button">Skapa konto</button>
            </form>
        </main>
    );
}

export default Register;