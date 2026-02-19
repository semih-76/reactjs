import React from "react";
import { Link } from "react-router-dom";

const sections = [
    {
        id: "editeur",
        number: "01",
        title: "Éditeur du site",
        table: [
            { label: "Raison sociale", value: "CafThé SAS" },
            { label: "Capital social", value: "10 000 €" },
            { label: "Siège social", value: "12 rue des Jardins, 75004 Paris, France" },
            { label: "SIRET", value: "123 456 789 00012" },
            { label: "RCS", value: "Paris B 123 456 789" },
            { label: "N° TVA intracommunautaire", value: "FR 12 123456789" },
            { label: "Directeur de la publication", value: "" },
            { label: "Contact", value: "contact@cafthe.fr" },
        ],
        content: null,
    },
    {
        id: "hebergeur",
        number: "02",
        title: "Hébergeur",
        table: [
            { label: "Société", value: "OVH SAS" },
            { label: "Adresse", value: "2 rue Kellermann, 59100 Roubaix, France" },
            { label: "Téléphone", value: "+33 9 72 10 10 07" },
            { label: "Site web", value: "www.ovhcloud.com" },
        ],
        content: null,
    },
    {
        id: "propriete",
        number: "03",
        title: "Propriété intellectuelle",
        table: null,
        content: "L'ensemble du contenu de ce site — textes, images, graphismes, logotypes, icônes, sons, logiciels — est la propriété exclusive de CafThé SAS ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de CafThé SAS. Toute exploitation non autorisée sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de Propriété Intellectuelle.",
    },
    {
        id: "donnees",
        number: "04",
        title: "Données personnelles",
        table: null,
        content: "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données. Pour exercer ces droits, contactez notre DPO à l'adresse : dpo@cafthe.fr. Les données collectées via les formulaires sont traitées par CafThé SAS pour la gestion de votre compte, le traitement de vos commandes et, avec votre consentement, l'envoi de communications commerciales. Elles ne sont jamais revendues à des tiers.",
    },
    {
        id: "cookies",
        number: "05",
        title: "Cookies",
        table: null,
        content: "Ce site utilise des cookies strictement nécessaires à son bon fonctionnement. Ces cookies ne collectent aucune donnée personnelle identifiable. Vous pouvez à tout moment les désactiver dans les paramètres de votre navigateur, ce qui peut toutefois affecter certaines fonctionnalités du site.",
    },
    {
        id: "responsabilite",
        number: "06",
        title: "Limitation de responsabilité",
        table: null,
        content: "CafThé SAS s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur ce site. Cependant, nous ne pouvons garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition. CafThé SAS décline toute responsabilité pour les dommages directs ou indirects résultant de l'accès au site ou de l'utilisation de ses contenus, ainsi que pour les contenus de sites tiers accessibles via des liens hypertextes.",
    },
];

const MentionsLegales = () => {
    return (
        <div className="legal-wrapper">

            {/* ── HERO ── */}
            <section className="legal-hero">
                <div className="legal-hero-inner">
                    <p className="legal-eyebrow">Documents officiels</p>
                    <h1 className="legal-title">Mentions Légales</h1>
                    <p className="legal-subtitle">
                        Informations légales relatives à l'éditeur et à l'utilisation du site cafthe.fr
                    </p>
                    <span className="legal-date">Dernière mise à jour : janvier 2025</span>
                </div>
            </section>

            {/* ── NAVIGATION ANCRES ── */}
            <nav className="legal-anchors">
                <div className="legal-anchors-inner">
                    {sections.map(s => (
                        <a key={s.id} href={`#${s.id}`} className="legal-anchor-link">
                            {s.title}
                        </a>
                    ))}
                </div>
            </nav>

            {/* ── SECTIONS ── */}
            <main className="legal-main">
                <div className="legal-container">
                    {sections.map((section) => (
                        <article key={section.id} id={section.id} className="legal-section">
                            <div className="legal-section-head">
                                <span className="legal-number">{section.number}</span>
                                <h2 className="legal-section-title">{section.title}</h2>
                            </div>
                            <div className="legal-section-body">
                                {section.table ? (
                                    <div className="legal-table">
                                        {section.table.map((row, i) => (
                                            <div key={i} className="legal-row">
                                                <span className="legal-row-label">{row.label}</span>
                                                <span className="legal-row-value">{row.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="legal-text">{section.content}</p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>

                {/* ── LIEN VERS CGV ── */}
                <div className="legal-crosslink">
                    <div className="legal-crosslink-content">
                        <span className="legal-crosslink-eyebrow">Document associé</span>
                        <h3 className="legal-crosslink-title">Conditions Générales de Vente</h3>
                        <p className="legal-crosslink-text">
                            Consultez nos CGV pour tout ce qui concerne vos achats, livraisons et retours.
                        </p>
                        <Link to="/cgv" className="btn-outline">
                            Consulter les CGV →
                        </Link>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default MentionsLegales;