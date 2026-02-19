import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
    const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    const infos = [
        {
            icon: "✉",
            label: "Email",
            value: "contact@cafthe.fr",
            sub: "Réponse sous 24 à 48h ouvrées"
        },
        {
            icon: "☎",
            label: "Téléphone",
            value: "+33 1 23 45 67 89",
            sub: "Du lundi au vendredi, 9h – 18h"
        },
        {
            icon: "⌖",
            label: "Adresse",
            value: "12 rue des Jardins, 75004 Paris",
            sub: "Boutique ouverte 7j/7, 10h – 19h"
        },
    ];

    const sujets = [
        "Suivi de commande",
        "Retour / Remboursement",
        "Question produit",
        "Commande professionnelle",
        "Autre",
    ];

    return (
        <div className="contact-wrapper">

            {/* ── HERO ── */}
            <section className="contact-hero">
                <div className="contact-hero-inner">
                    <p className="contact-eyebrow">Nous contacter</p>
                    <h1 className="contact-title">Parlons-nous</h1>
                    <p className="contact-subtitle">
                        Une question, une commande, un projet ? Notre équipe est là pour vous.
                    </p>
                </div>
            </section>

            <main className="contact-main">
                <div className="contact-container">

                    {/* ── INFOS + FORMULAIRE ── */}
                    <div className="contact-grid">

                        {/* Infos */}
                        <aside className="contact-info-col">
                            <h2 className="contact-col-title">Nos coordonnées</h2>
                            <div className="contact-info-cards">
                                {infos.map((item, i) => (
                                    <div key={i} className="contact-info-card">
                                        <span className="contact-info-icon">{item.icon}</span>
                                        <div>
                                            <span className="contact-info-label">{item.label}</span>
                                            <p className="contact-info-value">{item.value}</p>
                                            <p className="contact-info-sub">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="contact-hours">
                                <h3 className="contact-hours-title">Horaires boutique</h3>
                                <div className="contact-hours-grid">
                                    <span>Lundi – Vendredi</span><span>10h – 19h</span>
                                    <span>Samedi</span><span>10h – 20h</span>
                                    <span>Dimanche</span><span>11h – 18h</span>
                                </div>
                            </div>
                        </aside>

                        {/* Formulaire */}
                        <div className="contact-form-col">
                            <h2 className="contact-col-title">Envoyer un message</h2>
                            {sent ? (
                                <div className="contact-success">
                                    <span className="contact-success-icon">✓</span>
                                    <h3>Message envoyé !</h3>
                                    <p>Merci de nous avoir contactés. Nous vous répondrons dans les meilleurs délais.</p>
                                    <button className="btn-outline" onClick={() => setSent(false)}>
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <div className="contact-form-row">
                                        <div className="contact-input-group">
                                            <label>Nom complet *</label>
                                            <input
                                                type="text"
                                                name="nom"
                                                placeholder="Jean Dupont"
                                                value={form.nom}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="contact-input-group">
                                            <label>Adresse email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="jean@exemple.fr"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="contact-input-group">
                                        <label>Sujet *</label>
                                        <select
                                            name="sujet"
                                            value={form.sujet}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Choisissez un sujet</option>
                                            {sujets.map((s, i) => (
                                                <option key={i} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="contact-input-group">
                                        <label>Message *</label>
                                        <textarea
                                            name="message"
                                            placeholder="Décrivez votre demande en détail…"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={6}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="contact-submit">
                                        Envoyer le message →
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* ── LIEN FAQ ── */}
                    <div className="contact-crosslink">
                        <div className="contact-crosslink-left">
                            <span className="contact-crosslink-eyebrow">Besoin d'une réponse rapide ?</span>
                            <h3 className="contact-crosslink-title">Consultez notre FAQ</h3>
                            <p className="contact-crosslink-text">
                                Retrouvez les réponses aux questions les plus fréquentes sur nos produits, livraisons et retours.
                            </p>
                        </div>
                        <Link to="/faq" className="btn-outline">
                            Voir la FAQ →
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Contact;