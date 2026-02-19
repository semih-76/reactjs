import React from "react";
import { Link } from "react-router-dom";

const NotreHistoire = () => {
    return (
        <div className="histoire-wrapper">

            {/* ── HERO ── */}
            <section className="histoire-hero">
                <div className="histoire-hero-content">
                    <p className="histoire-eyebrow">Depuis 2010</p>
                    <h1 className="histoire-title">Notre Histoire</h1>
                    <p className="histoire-subtitle">
                        Une passion née de deux cultures, un hommage au thé et au café d'exception.
                    </p>
                </div>
            </section>

            {/* ── IMAGE PRINCIPALE ── */}
            <section className="histoire-image-section">
                <div className="histoire-image-container">
                    <img
                        src="/images/andreeew-hoang-8xRpVcOjP9E-unsplash.jpg"
                        alt="L'intérieur chaleureux de notre boutique CafThé"
                        className="histoire-main-image"
                    />
                    <div className="histoire-image-caption">
                        Notre première boutique — Un lieu pensé pour ralentir et savourer.
                    </div>
                </div>
            </section>

            {/* ── TEXTE INTRO ── */}
            <section className="histoire-intro">
                <div className="histoire-container">
                    <div className="histoire-intro-grid">
                        <div className="histoire-intro-left">
                            <span className="histoire-label">L'origine</span>
                            <h2 className="histoire-section-title">
                                Deux passions,<br />une seule maison.
                            </h2>
                        </div>
                        <div className="histoire-intro-right">
                            <p>
                                CafThé est née d'une conviction simple : le thé et le café méritent
                                la même attention que le grand vin. Fondée en 2010 par deux amis aux
                                parcours complémentaires — l'un torréfacteur en Éthiopie, l'autre
                                maître de thé au Japon — notre maison a choisi d'unir ces deux
                                univers sous un même toit.
                            </p>
                            <p>
                                Depuis nos débuts dans un petit atelier parisien, nous avons parcouru
                                des dizaines de terroirs à travers le monde pour sélectionner des
                                produits qui racontent une histoire, portent une âme et respectent
                                ceux qui les cultivent.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TIMELINE ── */}
            <section className="histoire-timeline-section">
                <div className="histoire-container">
                    <h2 className="histoire-section-title centered">Nos grandes étapes</h2>
                    <div className="histoire-timeline">

                        <div className="timeline-item">
                            <div className="timeline-year">2010</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>La fondation</h3>
                                <p>Ouverture de notre premier atelier-boutique à Paris, avec une sélection de 12 thés et 4 cafés d'origine.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2013</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>Label Bio & Équitable</h3>
                                <p>Obtention de notre première certification bio. Engagement formel envers le commerce équitable avec nos producteurs partenaires.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2017</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>Lancement des coffrets</h3>
                                <p>Création de nos coffrets découverte, pensés pour initier et transmettre la culture du thé et du café d'exception.</p>
                            </div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2024</div>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <h3>CafThé en ligne</h3>
                                <p>Lancement de notre boutique e-commerce pour partager nos sélections avec une clientèle nationale et internationale.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── VALEURS ── */}
            <section className="histoire-valeurs">
                <div className="histoire-container">
                    <h2 className="histoire-section-title centered">Ce qui nous anime</h2>
                    <div className="valeurs-grid">
                        <div className="valeur-card">
                            <div className="valeur-icon"></div>
                            <h3>Traçabilité totale</h3>
                            <p>Chaque produit est sourcé directement auprès du producteur. Nous connaissons le nom de celui qui l'a cultivé.</p>
                        </div>
                        <div className="valeur-card">
                            <div className="valeur-icon"></div>
                            <h3>Exigence sensorielle</h3>
                            <p>Nos sélections passent par une dégustation rigoureuse. Seul ce qui nous émeut vraiment rejoint notre catalogue.</p>
                        </div>
                        <div className="valeur-card">
                            <div className="valeur-icon"></div>
                            <h3>Éco-responsabilité</h3>
                            <p>Emballages recyclables, circuits courts, partenariats durables : notre engagement pour la planète est concret et mesuré.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="histoire-cta">
                <div className="histoire-cta-overlay">
                    <div className="histoire-container histoire-cta-inner">
                        <h2>Découvrez nos sélections</h2>
                        <p>Des produits d'exception choisis avec soin, livrés jusqu'à vous.</p>
                        <Link to="/produits" className="btn-outline">
                            Voir le catalogue →
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default NotreHistoire;