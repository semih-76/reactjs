import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/ProductCard.jsx";

const PRODUCTS_PER_PAGE = 9;

function normalize(str) {
  if (str === null || str === undefined) {
    return "";
  }
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const ProductList = ({ limit }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";

  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedPrice, sortBy]);

  useEffect(() => {
    async function fetchProduits() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/articles",
        );
        if (response.ok === false) {
          throw new Error("Erreur HTTP " + response.status);
        }
        const data = await response.json();
        if (data.articles) {
          setProduits(data.articles);
        } else {
          setProduits([]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des produits :", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduits();
  }, []);

  function getFilteredProducts() {
    let filtered = [];
    for (let i = 0; i < produits.length; i++) {
      filtered.push(produits[i]);
    }

    if (limit) {
      return filtered.slice(0, limit);
    }

    if (selectedCategory === "promos") {
      let avecPromo = [];
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].promo_active == 1) {
          avecPromo.push(filtered[i]);
        }
      }
      filtered = avecPromo;
    } else if (selectedCategory !== "all") {
      let parCategorie = [];
      for (let i = 0; i < filtered.length; i++) {
        if (normalize(filtered[i].categorie) === normalize(selectedCategory)) {
          parCategorie.push(filtered[i]);
        }
      }
      filtered = parCategorie;
    }

    if (selectedPrice === "less20") {
      let parPrix = [];
      for (let i = 0; i < filtered.length; i++) {
        if (parseFloat(filtered[i].prix_ttc) < 20) {
          parPrix.push(filtered[i]);
        }
      }
      filtered = parPrix;
    } else if (selectedPrice === "20-40") {
      let parPrix = [];
      for (let i = 0; i < filtered.length; i++) {
        if (
          parseFloat(filtered[i].prix_ttc) >= 20 &&
          parseFloat(filtered[i].prix_ttc) <= 40
        ) {
          parPrix.push(filtered[i]);
        }
      }
      filtered = parPrix;
    } else if (selectedPrice === "more40") {
      let parPrix = [];
      for (let i = 0; i < filtered.length; i++) {
        if (parseFloat(filtered[i].prix_ttc) > 40) {
          parPrix.push(filtered[i]);
        }
      }
      filtered = parPrix;
    }

    if (sortBy === "price-asc") {
      filtered.sort(function (a, b) {
        return parseFloat(a.prix_ttc) - parseFloat(b.prix_ttc);
      });
    } else if (sortBy === "price-desc") {
      filtered.sort(function (a, b) {
        return parseFloat(b.prix_ttc) - parseFloat(a.prix_ttc);
      });
    } else if (sortBy === "name-asc") {
      filtered.sort(function (a, b) {
        return a.nom_produit.localeCompare(b.nom_produit);
      });
    } else if (sortBy === "name-desc") {
      filtered.sort(function (a, b) {
        return b.nom_produit.localeCompare(a.nom_produit);
      });
    }

    return filtered;
  }

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getPageTitle() {
    if (selectedCategory === "cafes") return "Cafés";
    if (selectedCategory === "thes") return "Thés";
    if (selectedCategory === "accessoires") return "Accessoires";
    if (selectedCategory === "promos") return "Promotions";
    return "Tous les produits";
  }

  function getPageNumbers() {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  }

  function Pagination() {
    if (totalPages <= 1) {
      return null;
    }
    return (
      <div className="pagination-wrapper">
        <div className="pagination-info">
          Page {currentPage} sur {totalPages} — {filteredProducts.length}{" "}
          produits
        </div>
        <div className="pagination-controls">
          <button
            className={
              "pagination-btn pagination-btn--prev " +
              (currentPage === 1 ? "disabled" : "")
            }
            onClick={() => {
              if (currentPage > 1) {
                handlePageChange(currentPage - 1);
              }
            }}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            ←
          </button>
          {getPageNumbers().map(function (page, index) {
            if (page === "...") {
              return (
                <span key={"ellipsis-" + index} className="pagination-ellipsis">
                  ···
                </span>
              );
            }
            return (
              <button
                key={page}
                className={
                  "pagination-btn pagination-btn--number " +
                  (currentPage === page ? "active" : "")
                }
                onClick={() => handlePageChange(page)}
                aria-label={"Page " + page}
              >
                {page}
              </button>
            );
          })}
          <button
            className={
              "pagination-btn pagination-btn--next " +
              (currentPage === totalPages ? "disabled" : "")
            }
            onClick={() => {
              if (currentPage < totalPages) {
                handlePageChange(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
          >
            →
          </button>
        </div>
      </div>
    );
  }

  if (limit) {
    if (isLoading === true) {
      return (
        <div className="products-grid-home">
          {Array.from({ length: limit }).map(function (_, i) {
            return (
              <div key={i}>
                <Skeleton height={300} />
                <div style={{ padding: "20px" }}>
                  <Skeleton height={15} width="40%" />
                  <Skeleton
                    height={20}
                    width="80%"
                    style={{ marginTop: "10px" }}
                  />
                  <Skeleton
                    height={20}
                    width="30%"
                    style={{ marginTop: "10px" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    if (error) {
      return <div className="no-products">Erreur de chargement</div>;
    }
    return (
      <div className="products-grid-home">
        {filteredProducts.map(function (product) {
          return <ProductCard key={product.ID_Article} produit={product} />;
        })}
      </div>
    );
  }

  if (isLoading === true) {
    return (
      <main className="catalog-wrapper">
        <div className="catalog-container">
          <div className="catalog-header">
            <Skeleton width={200} height={40} />
            <Skeleton width={100} height={20} style={{ marginTop: "10px" }} />
          </div>
          <div className="catalog-layout">
            <aside className="catalog-sidebar">
              <Skeleton height={300} />
            </aside>
            <div className="products-grid">
              {Array.from({ length: 6 }).map(function (_, i) {
                return (
                  <div key={i} className="catalog-product-card">
                    <Skeleton height={300} />
                    <div style={{ padding: "20px" }}>
                      <Skeleton height={15} width="40%" />
                      <Skeleton
                        height={20}
                        width="80%"
                        style={{ marginTop: "10px" }}
                      />
                      <Skeleton
                        height={20}
                        width="30%"
                        style={{ marginTop: "10px" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="catalog-wrapper">
        <div className="catalog-container">
          <div className="product-list-error">
            <div className="error-container">
              <h3>Une erreur est survenue</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="retry-button"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="catalog-wrapper">
      <div className="catalog-container">
        <div className="catalog-header">
          <h1 className="catalog-title">{getPageTitle()}</h1>
          <p className="catalog-count">{filteredProducts.length} produits</p>
        </div>

        <div className="catalog-layout">
          <aside className="catalog-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Catégorie</h3>
              <div className="filter-options">
                {[
                  { value: "all", label: "Tous les produits" },
                  { value: "thes", label: "Thés" },
                  { value: "cafes", label: "Cafés" },
                  { value: "accessoires", label: "Accessoires" },
                  { value: "promos", label: "Promotions" },
                ].map(function ({ value, label }) {
                  return (
                    <label className="filter-option" key={value}>
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === value}
                        onChange={() => setSelectedCategory(value)}
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Prix</h3>
              <div className="filter-options">
                {[
                  { value: "all", label: "Tous les prix" },
                  { value: "less20", label: "Moins de 20€" },
                  { value: "20-40", label: "20€ - 40€" },
                  { value: "more40", label: "Plus de 40€" },
                ].map(function ({ value, label }) {
                  return (
                    <label className="filter-option" key={value}>
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice === value}
                        onChange={() => setSelectedPrice(value)}
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Trier par</h3>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name-asc">Nom A-Z</option>
                <option value="name-desc">Nom Z-A</option>
              </select>
            </div>
          </aside>

          <section className="catalog-products">
            {filteredProducts.length === 0 ? (
              <div className="no-products">Aucun produit trouvé</div>
            ) : (
              <>
                <div className="products-grid">
                  {paginatedProducts.map(function (product) {
                    return (
                      <ProductCard key={product.ID_Article} produit={product} />
                    );
                  })}
                </div>
                <Pagination />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductList;
