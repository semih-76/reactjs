import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// SOUS-COMPOSANTS DE CONTENU

const MonCompte = ({ setActiveTab, stats }) => (
    <div className="ec-view-dashboard">
        <div className="welcome-banner">
            <h2>Bienvenue sur votre espace client</h2>
            <p>Gérez votre compte et suivez vos commandes</p>
        </div>

        {/* Stats — affichées seulement s'il y a des commandes */}
        {stats.totalCommandes > 0 ? (
            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-icon"></span>
                    <div>
                        <span className="stat-label">TOTAL COMMANDES</span>
                        <span className="stat-value">{stats.totalCommandes}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <span className="stat-icon"></span>
                    <div>
                        <span className="stat-label">TOTAL DÉPENSÉ</span>
                        <span className="stat-value">{stats.totalDepense} €</span>
                    </div>
                </div>
                <div className="stat-card">
                    <span className="stat-icon"></span>
                    <div>
                        <span className="stat-label">ARTICLES ACHETÉS</span>
                        <span className="stat-value">{stats.totalArticles}</span>
                    </div>
                </div>
            </div>
        ) : (
            <div className="empty-state-dashboard">
                <p>Vous n'avez pas encore passé de commande.</p>
                <Link to="/produits" className="btn-dark">Commencer mes achats</Link>
            </div>
        )}

        {/* Dernière commande — affichée seulement si elle existe */}
        {stats.derniereCommande && (
            <div className="last-order-section">
                <h3>Dernière commande</h3>
                <div className="last-order-card">
                    <div className="order-info">
                        <p>Commande du {stats.derniereCommande.date}</p>
                        <span className={`status-badge ${stats.derniereCommande.statut.toLowerCase().replace(/ /g, '-')}`}>
                            {stats.derniereCommande.statut}
                        </span>
                        <span className="order-price">{stats.derniereCommande.prix.toFixed(2)} €</span>
                    </div>
                    <button className="btn-secondary-outline" onClick={() => setActiveTab('mes-commandes')}>
                        Voir mes commandes
                    </button>
                </div>
            </div>
        )}

        <div className="quick-access">
            <h3>Accès rapides</h3>
            <div className="access-grid">
                <div className="access-card" onClick={() => setActiveTab('mes-commandes')} style={{ cursor: 'pointer' }}>
    <span className="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z"/>
        </svg>
    </span>
                    <h4>Mes commandes</h4>
                    <p>Suivez vos achats</p>
                </div>
                <div className="access-card" onClick={() => setActiveTab('mes-adresses')} style={{ cursor: 'pointer' }}>
    <span className="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
    </span>
                    <h4>Mes adresses de livraisons</h4>
                    <p>Gérez vos adresses</p>
                </div>
                <div className="access-card" onClick={() => setActiveTab('mes-informations')} style={{ cursor: 'pointer' }}>
    <span className="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
    </span>
                    <h4>Mes informations</h4>
                    <p>Modifiez vos données</p>
                </div>
            </div>
        </div>
    </div>
);

const MesCommandes = ({ commandes, loading }) => {
    const [activeFilter, setActiveFilter] = useState('Toutes');

    const filtres = ['Toutes', 'En attente', 'En préparation', 'Expédiée', 'Livrée'];

    const commandesFiltrees = activeFilter === 'Toutes'
        ? commandes
        : commandes.filter(c => c.statut === activeFilter);

    if (loading) {
        return (
            <div className="ec-view-orders">
                <h2>Mes Commandes</h2>
                <p>Chargement...</p>
            </div>
        );
    }

    return (
        <div className="ec-view-orders">
            <div className="view-header">
                <h2>Mes Commandes</h2>
                {/* Filtres affichés seulement s'il y a des commandes */}
                {commandes.length > 0 && (
                    <div className="filter-tabs">
                        {filtres.map(f => (
                            <button
                                key={f}
                                className={activeFilter === f ? 'active' : ''}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Aucune commande du tout */}
            {commandes.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon"></span>
                    <h3>Aucune commande pour le moment</h3>
                    <p>Vos commandes apparaîtront ici une fois que vous aurez effectué un achat.</p>
                    <Link to="/produits" className="btn-dark">Découvrir la boutique</Link>
                </div>
            ) : commandesFiltrees.length === 0 ? (
                /* Filtre actif mais aucun résultat */
                <p>Aucune commande dans cette catégorie.</p>
            ) : (
                commandesFiltrees.map(cmd => (
                    <div className="order-item-card" key={cmd.id}>
                        <div className="order-card-header">
                            <span className="date">{cmd.date}</span>
                            <span className={`status-badge ${cmd.statut.toLowerCase().replace(/ /g, '-')}`}>{cmd.statut}</span>
                            <span className="price">{cmd.prix.toFixed(2)} €</span>
                        </div>
                        <p className="order-number">Commande {cmd.id}</p>
                        <div className="order-images-preview">
                            <div className="img-placeholder"></div>
                            <div className="img-placeholder"></div>
                        </div>
                        <div className="order-actions">
                            <button className="btn-outline-sm" onClick={() => alert(`Détails de la commande ${cmd.id}`)}>
                                Voir détails
                            </button>
                            <button className="btn-dark-sm" onClick={() => alert(`Commande ${cmd.id} ajoutée au panier`)}>
                                Commander à l'identique
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

const MesAdresses = () => {
    const [adresses, setAdresses] = useState([
        { id: 1, type: 'Domicile', nom: 'Jean Dupont', rue: '12 rue de la Paix', cp: '75001', ville: 'Paris', pays: 'France', defaut: true }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ type: 'Domicile', nom: '', rue: '', cp: '', ville: '', pays: 'France' });
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId !== null) {
            setAdresses(adresses.map(a => a.id === editId ? { ...a, ...formData } : a));
            setEditId(null);
        } else {
            const nouvelleAdresse = { ...formData, id: Date.now(), defaut: adresses.length === 0 };
            setAdresses([...adresses, nouvelleAdresse]);
        }
        setFormData({ type: 'Domicile', nom: '', rue: '', cp: '', ville: '', pays: 'France' });
        setShowForm(false);
    };

    const handleEdit = (adresse) => {
        setFormData({ type: adresse.type, nom: adresse.nom, rue: adresse.rue, cp: adresse.cp, ville: adresse.ville, pays: adresse.pays });
        setEditId(adresse.id);
        setShowForm(true);
    };

    const handleSupprimer = (id) => {
        if (window.confirm('Supprimer cette adresse ?')) {
            setAdresses(adresses.filter(a => a.id !== id));
        }
    };

    return (
        <div className="ec-view-addresses">
            <div className="view-header-flex">
                <h2>Mes Adresses de livraisons</h2>
                <button className="btn-add-address" onClick={() => { setShowForm(!showForm); setEditId(null); setFormData({ type: 'Domicile', nom: '', rue: '', cp: '', ville: '', pays: 'France' }); }}>
                    {showForm ? 'Annuler' : '+ Ajouter une adresse'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="address-form" style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3 style={{ marginBottom: '12px' }}>{editId ? "Modifier l'adresse" : 'Nouvelle adresse'}</h3>
                    <div className="form-row">
                        <div className="input-group">
                            <label>Type</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option>Domicile</option>
                                <option>Travail</option>
                                <option>Autre</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Nom complet *</label>
                            <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Rue *</label>
                        <input type="text" name="rue" value={formData.rue} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <div className="input-group">
                            <label>Code postal *</label>
                            <input type="text" name="cp" value={formData.cp} onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Ville *</label>
                            <input type="text" name="ville" value={formData.ville} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Pays</label>
                        <input type="text" name="pays" value={formData.pays} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn-dark" style={{ marginTop: '12px' }}>
                        {editId ? 'Enregistrer les modifications' : "Ajouter l'adresse"}
                    </button>
                </form>
            )}

            <div className="address-grid">
                {adresses.map(adresse => (
                    <div className={`address-card ${adresse.defaut ? 'default' : ''}`} key={adresse.id}>
                        <div className="card-top">
                            <span className="icon"> {adresse.type}</span>
                            {adresse.defaut && <span className="badge-default">Par défaut</span>}
                        </div>
                        <p>
                            <strong>{adresse.nom}</strong><br />
                            {adresse.rue}<br />
                            {adresse.cp} {adresse.ville}<br />
                            {adresse.pays}
                        </p>
                        <div className="address-actions">
                            <button className="btn-link" onClick={() => handleEdit(adresse)}>Modifier</button>
                            {!adresse.defaut && (
                                <button className="btn-link" style={{ color: 'red' }} onClick={() => handleSupprimer(adresse.id)}>
                                    Supprimer
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MesInformations = () => {
    const [formData, setFormData] = useState({
        prenom: 'Jean', nom: 'Dupont', email: 'jean.dupont@example.com', telephone: '+33 6 12 34 56 78'
    });
    const [mdp, setMdp] = useState({ ancien: '', nouveau: '', confirmation: '' });
    const [msgInfo, setMsgInfo] = useState('');
    const [msgMdp, setMsgMdp] = useState('');

    const handleInfoChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleMdpChange = (e) => setMdp({ ...mdp, [e.target.name]: e.target.value });

    const handleSaveInfo = (e) => {
        e.preventDefault();
        setMsgInfo('✅ Informations enregistrées avec succès.');
        setTimeout(() => setMsgInfo(''), 3000);
    };

    const handleSaveMdp = (e) => {
        e.preventDefault();
        if (!mdp.ancien) { setMsgMdp('❌ Veuillez saisir votre ancien mot de passe.'); return; }
        if (mdp.nouveau !== mdp.confirmation) { setMsgMdp('❌ Les nouveaux mots de passe ne correspondent pas.'); return; }
        if (mdp.nouveau.length < 8) { setMsgMdp('❌ Le mot de passe doit contenir au moins 8 caractères.'); return; }
        setMsgMdp('✅ Mot de passe modifié avec succès.');
        setMdp({ ancien: '', nouveau: '', confirmation: '' });
        setTimeout(() => setMsgMdp(''), 3000);
    };

    const handleSupprimerCompte = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
            alert('Compte supprimé.');
        }
    };

    return (
        <div className="ec-view-info">
            <div className="view-header">
                <h2>Mes Informations</h2>
                <p className="subtitle">Gérez vos informations personnelles et votre mot de passe</p>
            </div>

            <section className="info-section">
                <h3>Informations personnelles</h3>
                <form onSubmit={handleSaveInfo}>
                    <div className="form-row">
                        <div className="input-group">
                            <label>Prénom</label>
                            <input type="text" name="prenom" value={formData.prenom} onChange={handleInfoChange} />
                        </div>
                        <div className="input-group">
                            <label>Nom</label>
                            <input type="text" name="nom" value={formData.nom} onChange={handleInfoChange} />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInfoChange} />
                    </div>
                    <div className="input-group">
                        <label>Téléphone</label>
                        <input type="tel" name="telephone" value={formData.telephone} onChange={handleInfoChange} />
                    </div>
                    {msgInfo && <p style={{ color: 'green', marginBottom: '8px' }}>{msgInfo}</p>}
                    <button type="submit" className="btn-dark">Enregistrer les modifications</button>
                </form>
            </section>

            <section className="info-section">
                <h3>Modifier le mot de passe</h3>
                <form onSubmit={handleSaveMdp}>
                    <div className="input-group">
                        <label>Ancien mot de passe *</label>
                        <input type="password" name="ancien" value={mdp.ancien} onChange={handleMdpChange} required />
                    </div>
                    <div className="input-group">
                        <label>Nouveau mot de passe *</label>
                        <input type="password" name="nouveau" value={mdp.nouveau} onChange={handleMdpChange} required />
                    </div>
                    <div className="input-group">
                        <label>Confirmer le nouveau mot de passe *</label>
                        <input type="password" name="confirmation" value={mdp.confirmation} onChange={handleMdpChange} required />
                    </div>
                    {msgMdp && <p style={{ color: msgMdp.startsWith('✅') ? 'green' : 'red', marginBottom: '8px' }}>{msgMdp}</p>}
                    <button type="submit" className="btn-dark">Modifier le mot de passe</button>
                </form>
            </section>

            <section className="info-section danger-zone">
                <h3>Supprimer votre compte</h3>
                <p>La suppression de votre compte est définitive et irréversible.</p>
                <button className="btn-danger-outline" onClick={handleSupprimerCompte}>Supprimer mon compte</button>
            </section>
        </div>
    );
};


// COMPOSANT PRINCIPAL

const EspaceClient = () => {
    const [activeTab, setActiveTab] = useState('mon-compte');
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                setLoading(true);

                const token = localStorage.getItem('token');
                const response = await fetch('/api/commandes', {
                    headers: {
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                        'Content-Type': 'application/json',
                    },
                });

                // Si l'API n'existe pas encore ou renvoie une erreur, on ne plante pas
                if (!response.ok) {
                    console.warn(`API commandes : ${response.status} ${response.statusText}`);
                    setCommandes([]);
                    return;
                }

                const data = await response.json();

                // Garde-fou : on s'assure que c'est bien un tableau avant de stocker
                setCommandes(Array.isArray(data) ? data : []);

            } catch (error) {
                console.error('Erreur lors du chargement des commandes :', error);
                setCommandes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCommandes();
    }, []);

    // Stats calculées — sécurisées grâce au Array.isArray dans le fetch
    const stats = {
        totalCommandes:   commandes.length,
        totalDepense:     commandes.reduce((sum, c) => sum + (c.prix ?? 0), 0).toFixed(2),
        totalArticles:    commandes.reduce((sum, c) => sum + (c.articles ?? 0), 0),
        derniereCommande: commandes.length > 0 ? commandes[0] : null,
    };

    const handleDeconnexion = () => {
        // Supprimer le token du localStorage
        localStorage.removeItem('token');

        // Supprimer également d'autres données utilisateur si vous en avez
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        // Ajoutez d'autres clés si nécessaire

        // Rediriger vers la page d'accueil
        navigate('/');

        // Optionnel : forcer le rechargement de la page pour réinitialiser l'état
        window.location.reload();
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'mon-compte':       return <MonCompte setActiveTab={setActiveTab} stats={stats} />;
            case 'mes-commandes':    return <MesCommandes commandes={commandes} loading={loading} />;
            case 'mes-adresses':     return <MesAdresses />;
            case 'mes-informations': return <MesInformations />;
            default:                 return <MonCompte setActiveTab={setActiveTab} stats={stats} />;
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
                            <button className="logout-btn" onClick={handleDeconnexion}>
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