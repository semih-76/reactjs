import React from "react";
import { Link } from "react-router-dom";

const sections = [
    {
        id: "objet",
        number: "01",
        title: "Objet et champ d'application",
        content: "Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes conclues entre CafThé SAS, ci-après dénommée « le Vendeur », et toute personne physique majeure effectuant un achat sur le site cafthe.fr, ci-après dénommée « le Client ». Toute commande passée sur le site implique l'acceptation sans réserve des présentes CGV. Le Vendeur se réserve le droit de les modifier à tout moment ; les CGV applicables sont celles en vigueur au moment de la commande.",
    },
    {
        id: "produits",
        number: "02",
        title: "Produits et disponibilité",
        content: "Les produits proposés à la vente sont ceux décrits sur le site au moment de la commande. CafThé SAS s'efforce de présenter les caractéristiques essentielles des produits avec la plus grande exactitude possible. Les photographies sont fournies à titre illustratif. En cas d'indisponibilité d'un produit après validation de la commande, le Client en sera informé par email dans les meilleurs délais et pourra choisir entre un remboursement intégral ou un échange avec un produit équivalent.",
    },
    {
        id: "prix",
        number: "03",
        title: "Prix",
        content: "Les prix sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison. CafThé SAS se réserve le droit de modifier ses prix à tout moment. Les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande. Les frais de livraison sont indiqués avant la validation définitive de la commande. La livraison est offerte pour toute commande supérieure à 49 €.",
    },
    {
        id: "commande",
        number: "04",
        title: "Processus de commande",
        content: "Le Client sélectionne les produits souhaités, les ajoute à son panier puis procède au règlement. La commande est définitivement validée après confirmation du paiement. Un email de confirmation récapitulant le détail de la commande est envoyé au Client dans les minutes suivant la validation. CafThé SAS se réserve le droit d'annuler ou de refuser toute commande d'un Client avec lequel un litige relatif au paiement d'une commande antérieure existerait.",
    },
    {
        id: "paiement",
        number: "05",
        title: "Paiement",
        content: "Le paiement s'effectue en ligne, au moment de la commande, par carte bancaire (Visa, Mastercard, American Express) ou via PayPal. Les transactions sont sécurisées par un protocole SSL. Les données bancaires du Client ne transitent pas sur les serveurs de CafThé SAS. En cas de paiement par carte bancaire, le compte du Client est débité au moment de la validation de la commande.",
    },
    {
        id: "livraison",
        number: "06",
        title: "Livraison",
        content: "Les commandes sont expédiées en France métropolitaine et dans les pays de l'Union Européenne. Les délais de livraison sont donnés à titre indicatif : 2 à 5 jours ouvrés pour la France métropolitaine, 5 à 10 jours ouvrés pour l'Union Européenne. En cas de retard de livraison imputable au transporteur, CafThé SAS ne saurait être tenu responsable. Le Client dispose d'un délai de 72 heures à compter de la livraison pour signaler tout colis endommagé ou manquant.",
    },
    {
        id: "retractation",
        number: "07",
        title: "Droit de rétractation",
        content: "Conformément à l'article L221-18 du Code de la consommation, le Client dispose d'un délai de 14 jours calendaires à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités. Les produits alimentaires ouverts ou dont le sceau a été brisé sont exclus du droit de rétractation pour des raisons d'hygiène et de sécurité alimentaire. Pour exercer ce droit, le Client doit notifier sa décision à contact@cafthe.fr.",
    },
    {
        id: "retours",
        number: "08",
        title: "Retours et remboursements",
        content: "Les retours doivent être effectués dans leur état d'origine, complets et dans leur emballage d'origine. Les frais de retour sont à la charge du Client, sauf en cas de produit défectueux ou d'erreur de notre part. Le remboursement est effectué dans un délai de 14 jours à compter de la réception des produits retournés, par le même moyen de paiement que celui utilisé lors de la commande. Les produits alimentaires ne peuvent être retournés une fois ouverts.",
    },
    {
        id: "garanties",
        number: "09",
        title: "Garanties légales",
        content: "Tous nos produits bénéficient de la garantie légale de conformité (articles L217-4 et suivants du Code de la consommation) et de la garantie légale contre les vices cachés (articles 1641 et suivants du Code civil). En cas de défaut de conformité, le Client peut choisir entre la réparation ou le remplacement du produit. En cas de vice caché, le Client peut choisir entre la résolution de la vente ou une réduction du prix d'achat.",
    },
    {
        id: "litiges",
        number: "10",
        title: "Litiges et droit applicable",
        content: "Les présentes CGV sont soumises au droit français. En cas de litige, le Client s'adressera en priorité à CafThé SAS pour obtenir une solution amiable. À défaut d'accord, le Client peut recourir à la médiation via la plateforme européenne de règlement en ligne des litiges accessible à l'adresse : https://ec.europa.eu/consumers/odr. En dernier recours, les tribunaux français seront seuls compétents.",
    },
];

const CGV = () => {
    return (
        <div className="legal-wrapper">

            {/* ── HERO ── */}
            <section className="legal-hero cgv-hero">
                <div className="legal-hero-inner">
                    <p className="legal-eyebrow">Documents officiels</p>
                    <h1 className="legal-title">Conditions Générales de Vente</h1>
                    <p className="legal-subtitle">
                        Règles régissant l'ensemble des transactions effectuées sur cafthe.fr
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
                                <p className="legal-text">{section.content}</p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* ── LIEN VERS MENTIONS LÉGALES ── */}
                <div className="legal-crosslink">
                    <div className="legal-crosslink-content">
                        <span className="legal-crosslink-eyebrow">Document associé</span>
                        <h3 className="legal-crosslink-title">Mentions Légales</h3>
                        <p className="legal-crosslink-text">
                            Consultez nos mentions légales pour les informations relatives à l'éditeur du site.
                        </p>
                        <Link to="/mentions-legales" className="btn-outline">
                            Consulter les mentions légales →
                        </Link>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default CGV;