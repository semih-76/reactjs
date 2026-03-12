import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
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
          credentials: "include",
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

      console.log("Réponse login:", data);
      console.log("Token reçu:", data.token);
      console.log("Client reçu:", data.client);

      // On passe aussi le token pour le stocker dans le localStorage
      login(data.client, data.token);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion: ", error);
      setErrorMsg("Une erreur s'est produite lors de la connexion");
    }
  };

  return (
    <main className="auth-wrapper">
      <div className="login-split-layout">
        <div className="img-login">
          <img src="/images/img-login.webp" alt="Image Page de connexion" />
        </div>
        <div className="auth-container">
          <h1 className="auth-title">Déjà client ?</h1>
          <p className="auth-subtitle">Connectez-vous à votre compte</p>

          <form className="auth-form" onSubmit={handleSubmit}>
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
                  type={showPassword ? "text" : "password"}
                  value={motDePasse}
                  required
                  placeholder="********"
                  onChange={(e) => setMotDePasse(e.target.value)}
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

            {errorMsg && <div className="error-message-box">{errorMsg}</div>}

            <div style={{ textAlign: "right", marginTop: "5" }}>
              <Link to="/mot-de-passe-oublie" className="forgot-password">
                Mot de passe oublié ?
              </Link>
            </div>

            <button type="submit" className="auth-submit">
              Se connecter
            </button>
          </form>

          <p className="register-link">
            Pas encore de compte ? <Link to="/register">Créer un compte</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
