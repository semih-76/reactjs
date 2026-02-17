import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// --- SOUS-COMPOSANTS DE CONTENU ---

const MonCompte = () => (
    <div className="ec-view-dashboard">
        <div className="welcome-banner">
            <h2>Bienvenue sur votre espace client</h2>
            <p>Gérez votre compte et suivez vos commandes</p>
        </div>

        <div className="stats-grid">
            <div className="stat-card">
                <span className="stat-icon"></span>
                <div>
                    <span className="stat-label">TOTAL COMMANDES</span>
                    <span className="stat-value">8</span>
                </div>
            </div>
            <div className="stat-card">
                <span className="stat-icon"></span>
                <div>
                    <span className="stat-label">TOTAL DÉPENSÉ</span>
                    <span className="stat-value">248.50 €</span>
                </div>
            </div>
            <div className="stat-card">
                <span className="stat-icon"></span>
                <div>
                    <span className="stat-label">ARTICLES ACHETÉS</span>
                    <span className="stat-value">23</span>
                </div>
            </div>
        </div>

        <div className="last-order-section">
            <h3>Dernière commande</h3>
            <div className="last-order-card">
                <div className="order-info">
                    <p>Commande du 15 janvier 2026</p>
                    <span className="status-badge delivered">Livrée</span>
                    <span className="order-price">61.90 €</span>
                </div>
                <button className="btn-secondary-outline">Voir mes commandes</button>
            </div>
        </div>

        <div className="quick-access">
            <h3>Accès rapides</h3>
            <div className="access-grid">
                <div className="access-card">
                    <span className="icon"></span>
                    <h4>Mes commandes</h4>
                    <p>Suivez vos achats</p>
                </div>
                <div className="access-card">
                    <span className="icon"></span>
                    <h4>Mes adresses</h4>
                    <p>Gérez vos adresses</p>
                </div>
                <div className="access-card">
                    <span className="icon"></span>
                    <h4>Mes informations</h4>
                    <p>Modifiez vos données</p>
                </div>
            </div>
        </div>
    </div>
);

const MesCommandes = () => (
    <div className="ec-view-orders">
        <div className="view-header">
            <h2>Mes Commandes</h2>
            <div className="filter-tabs">
                <button className="active">Toutes</button>
                <button>En préparation</button>
                <button>Expédiées</button>
                <button>Livrées</button>
            </div>
        </div>

        <div className="order-item-card">
            <div className="order-card-header">
                <span className="date">15 janvier 2026</span>
                <span className="status-badge delivered">Livrée</span>
                <span className="price">61.90 €</span>
            </div>
            <p className="order-number">Commande CMD-2026-00142</p>
            <div className="order-images-preview">
                <div className="img-placeholder"></div>
                <div className="img-placeholder"></div>
            </div>
            <div className="order-actions">
                <button className="btn-outline-sm">Voir détails</button>
                <button className="btn-dark-sm">Commander à l'identique</button>
            </div>
        </div>
    </div>
);

const MesAdresses = () => (
    <div className="ec-view-addresses">
        <div className="view-header-flex">
            <h2>Mes Adresses</h2>
            <button className="btn-add-address">+ Ajouter une adresse</button>
        </div>

        <div className="address-grid">
            <div className="address-card default">
                <div className="card-top">
                    <span className="icon"> Domicile</span>
                    <span className="badge-default">Par défaut</span>
                </div>
                <p><strong>Jean Dupont</strong><br />12 rue de la Paix<br />75001 Paris<br />France</p>
                <div className="address-actions">
                    <button className="btn-link">Modifier</button>
                </div>
            </div>
        </div>
    </div>
);

const MesInformations = () => (
    <div className="ec-view-info">
        <div className="view-header">
            <h2>Mes Informations</h2>
            <p className="subtitle">Gérez vos informations personnelles et votre mot de passe</p>
        </div>

        <section className="info-section">
            <h3>Informations personnelles</h3>
            <div className="form-row">
                <div className="input-group">
                    <label>Prénom</label>
                    <input type="text" defaultValue="Jean" />
                </div>
                <div className="input-group">
                    <label>Nom</label>
                    <input type="text" defaultValue="Dupont" />
                </div>
            </div>
            <div className="input-group">
                <label>Email</label>
                <input type="email" defaultValue="jean.dupont@example.com" />
            </div>
            <div className="input-group">
                <label>Téléphone</label>
                <input type="tel" defaultValue="+33 6 12 34 56 78" />
            </div>
            <button className="btn-dark">Enregistrer les modifications</button>
        </section>

        <section className="info-section danger-zone">
            <h3>Supprimer votre compte</h3>
            <p>La suppression de votre compte est définitive et irréversible.</p>
            <button className="btn-danger-outline">Supprimer mon compte</button>
        </section>
    </div>
);

// --- COMPOSANT PRINCIPAL ---

const EspaceClient = () => {
    const [activeTab, setActiveTab] = useState('mon-compte');

    const renderContent = () => {
        switch (activeTab) {
            case 'mon-compte': return <MonCompte />;
            case 'mes-commandes': return <MesCommandes />;
            case 'mes-adresses': return <MesAdresses />;
            case 'mes-informations': return <MesInformations />;
            default: return <MonCompte />;
        }
    };

    return (
        <div className="ec-wrapper">
            <div className="ec-container">
                <h1 className="ec-main-title">Mon Espace Client</h1>

                <div className="ec-layout">
                    <aside className="ec-sidebar">
                        <nav>
                            <button className={activeTab === 'mon-compte' ? 'active' : ''} onClick={() => setActiveTab('mon-compte')}>
                                <span className="icon"></span> Mon compte
                            </button>
                            <button className={activeTab === 'mes-commandes' ? 'active' : ''} onClick={() => setActiveTab('mes-commandes')}>
                                <span className="icon"></span> Mes commandes
                            </button>
                            <button className={activeTab === 'mes-adresses' ? 'active' : ''} onClick={() => setActiveTab('mes-adresses')}>
                                <span className="icon"></span> Mes adresses
                            </button>
                            <button className={activeTab === 'mes-informations' ? 'active' : ''} onClick={() => setActiveTab('mes-informations')}>
                                <span className="icon"></span> Mes informations
                            </button>
                            <hr />
                            <button className="logout-btn">
                                <span className="icon"></span> Déconnexion
                            </button>
                        </nav>
                    </aside>

                    <section className="ec-content">
                        {renderContent()}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default EspaceClient;