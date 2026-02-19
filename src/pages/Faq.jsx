import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        id: "commandes",
        label: "Commandes",
        faqs: [
            {
                q: "Comment passer une commande ?",
                a: "Ajoutez les produits souhaités à votre panier, puis suivez les étapes de validation : identification, adresse de livraison, mode de paiement. Vous recevrez un email de confirmation dès que votre commande sera enregistrée."
            },
            {
                q: "Puis-je modifier ou annuler ma commande ?",
                a: "Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant sa validation, à condition qu'elle n'ait pas encore été préparée. Contactez-nous rapidement par email à contact@cafthe.fr en précisant votre numéro de commande."
            },
            {
                q: "Comment suivre ma commande ?",
                a: "Dès l'expédition de votre commande, vous recevrez un email contenant un numéro de suivi. Vous pouvez également consulter l'état de vos commandes depuis votre espace client, rubrique « Mes commandes »."
            },
            {
                q: "Les produits sont-ils disponibles en boutique ?",
                a: "Oui, notre boutique au 12 rue des Jardins, Paris 4e, propose l'ensemble de notre catalogue. Les stocks boutique et en ligne sont distincts ; un produit disponible en ligne peut être en rupture en boutique et inversement."
            },
        ]
    },
    {
        id: "livraison",
        label: "Livraison",
        faqs: [
            {
                q: "Quels sont les délais de livraison ?",
                a: "En France métropolitaine, comptez 2 à 5 jours ouvrés. Pour l'Union Européenne, les délais sont de 5 à 10 jours ouvrés. Ces délais sont indicatifs et peuvent varier selon la disponibilité des transporteurs."
            },
            {
                q: "La livraison est-elle offerte ?",
                a: "La livraison est offerte pour toute commande supérieure à 49 €. En dessous de ce montant, les frais de livraison sont calculés selon le poids et la destination, et vous sont indiqués avant la validation finale."
            },
            {
                q: "Livrez-vous à l'international ?",
                a: "Nous livrons actuellement dans les pays de l'Union Européenne. Pour toute demande de livraison hors UE, contactez-nous directement à contact@cafthe.fr afin que nous étudiions la faisabilité."
            },
            {
                q: "Que faire si mon colis est endommagé ?",
                a: "Signalez tout dommage dans les 72 heures suivant la livraison par email à contact@cafthe.fr, en joignant des photos du colis et des produits abîmés. Nous procéderons à un remplacement ou un remboursement selon votre préférence."
            },
        ]
    },
    {
        id: "produits",
        label: "Produits",
        faqs: [
            {
                q: "Vos produits sont-ils certifiés bio ?",
                a: "Une grande partie de notre gamme est certifiée Agriculture Biologique (AB). Cette information est clairement indiquée sur chaque fiche produit. Nous travaillons en étroite collaboration avec nos producteurs pour étendre cette certification à l'ensemble de notre catalogue."
            },
            {
                q: "Comment conserver mes thés et cafés ?",
                a: "Conservez vos thés et cafés à l'abri de la lumière, de l'humidité et des odeurs, dans un contenant hermétique. Évitez de les placer près de sources de chaleur. Le thé se conserve 24 mois et le café torréfié 12 mois dans de bonnes conditions."
            },
            {
                q: "Proposez-vous des coffrets cadeaux ?",
                a: "Oui ! Nous proposons une sélection de coffrets découverte thé, café et mixtes, disponibles en ligne et en boutique. Vous pouvez également composer votre propre coffret en nous contactant directement pour les commandes sur mesure."
            },
            {
                q: "Les descriptions de goût sont-elles fiables ?",
                a: "Nos descriptions aromatiques sont établies par nos soins lors de séances de dégustation rigoureuses. Elles reflètent la perception de nos experts, mais le ressenti gustatif reste personnel. N'hésitez pas à consulter nos conseillers en boutique ou par téléphone."
            },
        ]
    },
    {
        id: "retours",
        label: "Retours & Remboursements",
        faqs: [
            {
                q: "Quel est le délai pour retourner un produit ?",
                a: "Vous disposez de 14 jours calendaires à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motif. Les produits alimentaires ouverts sont exclus de ce droit pour des raisons d'hygiène."
            },
            {
                q: "Comment initier un retour ?",
                a: "Envoyez un email à contact@cafthe.fr avec votre numéro de commande et le ou les produits concernés. Nous vous transmettrons les instructions de retour. Les frais de retour sont à votre charge, sauf en cas de produit défectueux ou d'erreur de notre part."
            },
            {
                q: "Sous quel délai suis-je remboursé(e) ?",
                a: "Le remboursement est effectué dans les 14 jours suivant la réception de votre retour, par le même moyen de paiement que celui utilisé lors de la commande. Vous recevrez un email de confirmation dès que le remboursement est initié."
            },
        ]
    },
    {
        id: "compte",
        label: "Mon compte",
        faqs: [
            {
                q: "Comment créer un compte ?",
                a: "Cliquez sur l'icône de profil en haut à droite, puis sur « Créer un compte ». Renseignez vos informations et validez. La création de compte vous permet de suivre vos commandes, gérer vos adresses et accéder à votre historique d'achats."
            },
            {
                q: "J'ai oublié mon mot de passe, que faire ?",
                a: "Sur la page de connexion, cliquez sur « Mot de passe oublié ». Saisissez votre adresse email et vous recevrez un lien de réinitialisation valable 24 heures. Si vous ne recevez pas l'email, vérifiez vos spams."
            },
            {
                q: "Comment supprimer mon compte ?",
                a: "Vous pouvez demander la suppression de votre compte depuis votre espace client, rubrique « Mes informations », section « Zone de danger ». La suppression est définitive et entraîne l'effacement de toutes vos données personnelles."
            },
        ]
    },
];

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState("commandes");
    const [openIndex, setOpenIndex] = useState(null);

    const currentFaqs = categories.find(c => c.id === activeCategory)?.faqs || [];

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <div className="faq-wrapper">

            {/* ── HERO ── */}
            <section className="faq-hero">
                <div className="faq-hero-inner">
                    <p className="faq-eyebrow">Centre d'aide</p>
                    <h1 className="faq-title">Questions fréquentes</h1>
                    <p className="faq-subtitle">
                        Tout ce que vous devez savoir sur nos produits, livraisons et services.
                    </p>
                </div>
            </section>

            <main className="faq-main">
                <div className="faq-container">

                    {/* ── TABS CATÉGORIES ── */}
                    <nav className="faq-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`faq-tab ${activeCategory === cat.id ? "active" : ""}`}
                                onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </nav>

                    {/* ── ACCORDÉON ── */}
                    <div className="faq-list">
                        {currentFaqs.map((item, i) => (
                            <div
                                key={i}
                                className={`faq-item ${openIndex === i ? "faq-item--open" : ""}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggle(i)}
                                    aria-expanded={openIndex === i}
                                >
                                    <span>{item.q}</span>
                                    <span className="faq-icon">{openIndex === i ? "−" : "+"}</span>
                                </button>
                                <div className="faq-answer">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── CROSSLINK CONTACT ── */}
                    <div className="faq-crosslink">
                        <div className="faq-crosslink-left">
                            <span className="faq-crosslink-eyebrow">Vous n'avez pas trouvé votre réponse ?</span>
                            <h3 className="faq-crosslink-title">Contactez notre équipe</h3>
                            <p className="faq-crosslink-text">
                                Notre équipe est disponible du lundi au vendredi de 9h à 18h pour répondre à toutes vos questions.
                            </p>
                        </div>
                        <Link to="/contact" className="btn-outline">
                            Nous contacter →
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default FAQ;