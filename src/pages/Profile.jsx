import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState, authState } from "../stores/auth/atom";
import '../style/Profile.css';

function Profile() {
    const { userId } = useRecoilValue(authState);
    const resetAuth = useResetRecoilState(authState);
    const users = useRecoilValue(userState);
    const user = users.find(
        (user) => user.id === userId);
    const navigate = useNavigate();

    function logout() {
        resetAuth()
        navigate(`/`)
    }

    return (
        <main className="main-profile">
            <h1 className="h1-profile">Välkommen tillbaka {user.name.firstname}!</h1>
            <section className="profile-section">
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Avatar" />
                <div>
                    <h2 className="h2-profile" >ANVÄNDARNAMN: {user.username} (id: {user.id})</h2>
                    <h2 className="h2-profile">NAMN: {user.name.firstname} {user.name.lastname}</h2>
                    <h2 className="h2-profile">ADRESS: {user.address.street} {user.address.number}, {user.address.zipcode} {user.address.city}</h2>
                    <h2 className="h2-profile">E-POST: {user.email}</h2>
                    <h2 className="h2-profile">TELEFON: {user.phone}</h2>
                    <button className="profile-logout" onClick={() => logout()}>Logga ut</button>
                </div>
            </section>
        </main>
    )
}

export default Profile;