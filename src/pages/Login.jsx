import React, {useContext, useState} from "react";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { Eye } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials : "include",
                    body: JSON.stringify({
                        email,
                        mot_de_passe: motDePasse,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Erreur de connexion");
                return;
            }

            // Appel au login via le contexte
            login(data.client)

            // Puis retour à l'accueil
            navigate("/");
        }   catch (error) {
            console.error("Erreur lors de la connexion: ", error);
            setErrorMsg("Une erreur s'est produite lors de la connexion");
        }
    };

    return (
        <main className="login-wrapper">
            <div className="login-container">
                <h1 className="login-title">Déjà client ?</h1>
                <p className="login-subtitle">Connectez-vous à votre compte</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            required
                            placeholder="votre@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"} // Utilise le state showPassword
                                value={motDePasse}
                                required
                                placeholder="********"
                                onChange={(e) => setMotDePasse(e.target.value)}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                style={{ fontSize: '0.75rem', fontWeight: 'bold' }} // Petit style rapide
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "CACHER" : "VOIR"}
                            </button>
                        </div>
                    </div>

                    {/* Affichage du message d'erreur s'il existe */}
                    {errorMsg && <div className="error-message-box">{errorMsg}</div>}

                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Se souvenir de moi
                        </label>
                        <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                    </div>

                    <button type="submit" className="submit-button">
                        Se connecter
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Login;