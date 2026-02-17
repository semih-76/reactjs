import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Les mots de passe ne correspondent pas");
            return;
        }

        if (!formData.acceptTerms) {
            setErrorMsg("Vous devez accepter les conditions générales");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/clients/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        prenom: formData.prenom,
                        nom: formData.nom,
                        email: formData.email,
                        mot_de_passe: formData.password
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Erreur lors de l'inscription");
                return;
            }

            navigate("/login");
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            setErrorMsg("Une erreur s'est produite lors de l'inscription");
        }
    };

    return (
        <main className="auth-wrapper">
            <div className="auth-container">
                <h1 className="auth-title">Nouveau client ?</h1>
                <p className="auth-subtitle">Créez votre compte</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-row">
                        <div className="input-group">
                            <label htmlFor="prenom">Prénom</label>
                            <input
                                type="text"
                                id="prenom"
                                placeholder="Jean"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="nom">Nom</label>
                            <input
                                type="text"
                                id="nom"
                                placeholder="Dupont"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="votre@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Mot de passe</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👁️‍🗨️" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className="terms-group">
                        <label htmlFor="acceptTerms" className="checkbox-label">
                            <input
                                type="checkbox"
                                id="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                required
                            />
                            <span>
                                J'accepte les <Link to="/cgv">conditions générales d'utilisation</Link>
                            </span>
                        </label>
                    </div>

                    {errorMsg && <div className="error-message-box">{errorMsg}</div>}

                    <button type="submit" className="auth-submit">
                        Créer mon compte
                    </button>
                </form>

                <p className="register-link">
                    Déjà un compte ? <Link to="/login">Se connecter</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;