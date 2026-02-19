import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// --- SOUS-COMPOSANTS DE CONTENU ---

const MonCompte = ({ setActiveTab }) => (
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
                {/* Navigation vers l'onglet Mes commandes */}
                <button className="btn-secondary-outline" onClick={() => setActiveTab('mes-commandes')}>
                    Voir mes commandes
                </button>
            </div>
        </div>

        <div className="quick-access">
            <h3>Accès rapides</h3>
            <div className="access-grid">
                {/* Accès rapides fonctionnels */}
                <div className="access-card" onClick={() => setActiveTab('mes-commandes')} style={{ cursor: 'pointer' }}>
                    <span className="icon"></span>
                    <h4>Mes commandes</h4>
                    <p>Suivez vos achats</p>
                </div>
                <div className="access-card" onClick={() => setActiveTab('mes-adresses')} style={{ cursor: 'pointer' }}>
                    <span className="icon"></span>
                    <h4>Mes adresses</h4>
                    <p>Gérez vos adresses</p>
                </div>
                <div className="access-card" onClick={() => setActiveTab('mes-informations')} style={{ cursor: 'pointer' }}>
                    <span className="icon"></span>
                    <h4>Mes informations</h4>
                    <p>Modifiez vos données</p>
                </div>
            </div>
        </div>
    </div>
);

const MesCommandes = () => {
    const [activeFilter, setActiveFilter] = useState('Toutes');

    // Données de commandes fictives (à remplacer par des données API)
    const commandes = [
        { id: 'CMD-2026-00142', date: '15 janvier 2026', statut: 'Livrée', prix: '61.90 €' },
        { id: 'CMD-2026-00098', date: '3 janvier 2026', statut: 'Expédiée', prix: '34.50 €' },
        { id: 'CMD-2025-00321', date: '18 décembre 2025', statut: 'En préparation', prix: '89.00 €' },
        { id: 'CMD-2025-00280', date: '5 décembre 2025', statut: 'En attente', prix: '22.00 €' },
    ];

    const filtres = ['Toutes', 'En attente', 'En préparation', 'Expédiée', 'Livrée'];

    const commandesFiltrees = activeFilter === 'Toutes'
        ? commandes
        : commandes.filter(c => c.statut === activeFilter);

    return (
        <div className="ec-view-orders">
            <div className="view-header">
                <h2>Mes Commandes</h2>
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
            </div>

            {commandesFiltrees.length === 0 ? (
                <p>Aucune commande dans cette catégorie.</p>
            ) : (
                commandesFiltrees.map(cmd => (
                    <div className="order-item-card" key={cmd.id}>
                        <div className="order-card-header">
                            <span className="date">{cmd.date}</span>
                            <span className={`status-badge ${cmd.statut.toLowerCase().replace(' ', '-')}`}>{cmd.statut}</span>
                            <span className="price">{cmd.prix}</span>
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
                            {/* Commander à l'identique — CDC §4.5 */}
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
            // Modification
            setAdresses(adresses.map(a => a.id === editId ? { ...a, ...formData } : a));
            setEditId(null);
        } else {
            // Ajout
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
                <h2>Mes Adresses</h2>
                <button className="btn-add-address" onClick={() => { setShowForm(!showForm); setEditId(null); setFormData({ type: 'Domicile', nom: '', rue: '', cp: '', ville: '', pays: 'France' }); }}>
                    {showForm ? 'Annuler' : '+ Ajouter une adresse'}
                </button>
            </div>

            {/* Formulaire d'ajout / modification */}
            {showForm && (
                <form onSubmit={handleSubmit} className="address-form" style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3 style={{ marginBottom: '12px' }}>{editId ? 'Modifier l\'adresse' : 'Nouvelle adresse'}</h3>
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
                        {editId ? 'Enregistrer les modifications' : 'Ajouter l\'adresse'}
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
        // TODO : appel API PUT /clients/:id
        setMsgInfo('✅ Informations enregistrées avec succès.');
        setTimeout(() => setMsgInfo(''), 3000);
    };

    const handleSaveMdp = (e) => {
        e.preventDefault();
        if (!mdp.ancien) { setMsgMdp('❌ Veuillez saisir votre ancien mot de passe.'); return; }
        if (mdp.nouveau !== mdp.confirmation) { setMsgMdp('❌ Les nouveaux mots de passe ne correspondent pas.'); return; }
        if (mdp.nouveau.length < 8) { setMsgMdp('❌ Le mot de passe doit contenir au moins 8 caractères.'); return; }
        // TODO : appel API PUT /clients/:id/password
        setMsgMdp('✅ Mot de passe modifié avec succès.');
        setMdp({ ancien: '', nouveau: '', confirmation: '' });
        setTimeout(() => setMsgMdp(''), 3000);
    };

    const handleSupprimerCompte = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
            // TODO : appel API DELETE /clients/:id puis redirection
            alert('Compte supprimé.');
        }
    };

    return (
        <div className="ec-view-info">
            <div className="view-header">
                <h2>Mes Informations</h2>
                <p className="subtitle">Gérez vos informations personnelles et votre mot de passe</p>
            </div>

            {/* Informations personnelles */}
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

            {/* Modification du mot de passe — CDC §5.2 : validation via l'ancien */}
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

            {/* Zone dangereuse */}
            <section className="info-section danger-zone">
                <h3>Supprimer votre compte</h3>
                <p>La suppression de votre compte est définitive et irréversible.</p>
                <button className="btn-danger-outline" onClick={handleSupprimerCompte}>Supprimer mon compte</button>
            </section>
        </div>
    );
};

// --- COMPOSANT PRINCIPAL ---

const EspaceClient = () => {
    const [activeTab, setActiveTab] = useState('mon-compte');
    const navigate = useNavigate();

    // Déconnexion — CDC §4.5 / §5.1
    const handleDeconnexion = () => {
        // TODO : supprimer le token JWT (localStorage/sessionStorage/cookie)
        // localStorage.removeItem('token');
        navigate('/'); // Redirection vers l'accueil
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'mon-compte':       return <MonCompte setActiveTab={setActiveTab} />;
            case 'mes-commandes':    return <MesCommandes />;
            case 'mes-adresses':     return <MesAdresses />;
            case 'mes-informations': return <MesInformations />;
            default:                 return <MonCompte setActiveTab={setActiveTab} />;
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
                            {/* Déconnexion fonctionnelle */}
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