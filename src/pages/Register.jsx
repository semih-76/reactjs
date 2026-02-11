import React, { useState } from 'react';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <main className="auth-wrapper">
            <div className="auth-container">
                <h1 className="auth-title">Nouveau client ?</h1>
                <p className="auth-subtitle">Créez votre compte</p>

                <form className="auth-form">
                    {/* Ligne Prénom et Nom */}
                    <div className="input-row">
                        <div className="input-group">
                            <label>Prénom</label>
                            <input type="text" placeholder="Jean" required />
                        </div>
                        <div className="input-group">
                            <label>Nom</label>
                            <input type="text" placeholder="Dupont" required />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="votre@email.com" required />
                    </div>

                    {/* Mot de passe */}
                    <div className="input-group">
                        <label>Mot de passe</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                👁️
                            </button>
                        </div>
                    </div>

                    {/* Confirmation */}
                    <div className="input-group">
                        <label>Confirmation du mot de passe</label>
                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="********"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                👁️
                            </button>
                        </div>
                    </div>

                    {/* Case à cocher CGU */}
                    <div className="terms-group">
                        <label className="checkbox-label">
                            <input type="checkbox" required />
                            <span>J'accepte les <a href="/cgu">conditions générales d'utilisation</a></span>
                        </label>
                    </div>

                    <button type="submit" className="auth-submit">
                        Créer mon compte
                    </button>
                </form>
            </div>
        </main>
    );
};

export default RegisterContainer;