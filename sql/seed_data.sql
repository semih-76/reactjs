-- On nettoie la table pour éviter les erreurs d'ID
TRUNCATE TABLE articles;

-- On insère les 15 produits
INSERT INTO articles (nom_produit, description, categorie, type_vente, prix_ht, taux_tva, prix_ttc, stock, images, origine) VALUES
-- 5 CAFÉS (TVA 5.5%)
('Arabica Éthiopie', 'Café grains, notes florales, 250g', 'Café', 'Unité', 7.50, 0.055, 7.91, 100, 'paquet-marron.png', 'Éthiopie'),
('Robusta Pur', 'Café moulu corsé, idéal expresso, 500g', 'Café', 'Unité', 12.00, 0.055, 12.66, 50, 'paquet-blanc.png', 'Vietnam'),
('Moka Harrar', 'Café sauvage, notes fruits rouges, 250g', 'Café', 'Unité', 8.50, 0.055, 8.97, 80, 'paquet-blanc.png', 'Éthiopie'),
('Blue Mountain', 'Café d`exception, doux et rare, 250g', 'Café', 'Unité', 25.00, 0.055, 26.38, 20, 'paquet-marron.png', 'Jamaïque'),
('Décaféiné Eau', 'Sans solvant, arôme préservé, 500g', 'Café', 'Unité', 11.00, 0.055, 11.61, 45, 'paquet-blanc.png', 'Colombie'),

-- 5 THÉS (TVA 5.5%)
('Thé Vert Sencha', 'Thé vert bio du Japon, 100g', 'Thé', 'Unité', 9.50, 0.055, 10.02, 30, 'paquet-vert.png', 'Japon'),
('Assam Breakfast', 'Thé noir corsé, idéal pour le matin', 'Thé', 'Unité', 8.50, 0.055, 8.97, 60, 'paquet-vert.png', 'Inde'),
('Earl Grey Royal', 'Thé noir à la bergamote, 100g', 'Thé', 'Unité', 10.50, 0.055, 11.08, 40, 'paquet-noir.png', 'Inde'),
('Rooibos Vanille', 'Sans théine, gourmand, 100g', 'Thé', 'Unité', 9.00, 0.055, 9.50, 55, 'paquet-noir.png', 'Afrique du Sud'),
('Matcha Cérémonie', 'Poudre premium pour fouet, 30g', 'Thé', 'Unité', 19.50, 0.055, 20.57, 15, 'paquet-vert.png', 'Japon'),

-- 5 ACCESSOIRES (TVA 20%)
('Filtres Papier', 'Boîte de 100 filtres N°4', 'Accessoires', 'Unité', 3.50, 0.20, 4.20, 200, 'filtres.png', 'Allemagne'),
('Moulin à Café', 'Manuel avec meules céramique', 'Accessoires', 'Unité', 45.00, 0.20, 54.00, 10, 'moulin.png', 'Chine'),
('Théière Fonte', 'Modèle traditionnel émaillé, 0.8L', 'Accessoires', 'Unité', 42.00, 0.20, 50.40, 8, 'théière.png', 'Japon'),
('Presse Française', 'Cafetière à piston verre/inox', 'Accessoires', 'Unité', 29.00, 0.20, 34.80, 12, 'presse.png', 'France'),
('Balance Précision', 'Mesure au 0.1g près pour dosage', 'Accessoires', 'Unité', 18.50, 0.20, 22.20, 25, 'balance.png', 'Chine');