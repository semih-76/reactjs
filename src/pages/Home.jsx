import React from "react";
import ProductList from "./ProductList.jsx";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="home-container">

            <section className="hero">
                <div className="hero-content">
                    <h1>L'art du thé et du café</h1>
                    <p>Découvrez notre collection premium de thés et cafés d'exception, sélectionnées avec soin.</p>
                </div>
            </section>


            <section className="products">
                <h2> Nos produits phares</h2>
                <p className="subtitle">Nos sélections coup de cœur pour découvrir l'excellence</p>

                {/* On passe une prop "limit" si tu veux gérer le slice dans ProductList */}
                <ProductList limit={3} />

                <div className="all-products">
                    <Link to="/catalogue" className="btn-outline">
                        Voir tous les produits  →
                    </Link>
                </div>
            </section>


            <section className="engagements">
                <h2>Nos engagements</h2>
                <p className="subtitle">Une démarche responsable pour un avenir durable</p>
                <div className="engagement-cards">
                    <div className="card">
                        <div className="icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                            </svg>
                        </div>
                        <h3>100% Bio & Équitable</h3>
                        <p>Tous nos produits sont issus de l'agriculture biologique et du commerce équitable</p>
                    </div>

                    <div className="card">
                        <div className="icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <path d="M12,2C11.5,2 11,2.19 10.59,2.59L2.59,10.59C1.8,11.37 1.8,12.63 2.59,13.41L10.59,21.41C11.37,22.2 12.63,22.2 13.41,21.41L21.41,13.41C22.2,12.63 22.2,11.37 21.41,10.59L13.41,2.59C13,2.19 12.5,2 12,2M12,4L20,12L12,20L4,12"/>
                            </svg>
                        </div>
                        <h3>Emballages Recyclables</h3>
                        <p>Packaging écoresponsable pour préserver notre planète</p>
                    </div>

                    <div className="card">
                        <div className="icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97"/>
                            </svg>
                        </div>
                        <h3>Qualité Premium</h3>
                        <p>Sélection rigoureuse des meilleurs terroirs et producteurs du monde</p>
                    </div>
                </div>
            </section>
            <section className="join-community">
                <div className="joincafthe">
                    <img src="/images/joincafthe.png"></img>
                </div>
            </section>
        </div>
    );
};

export default Home;