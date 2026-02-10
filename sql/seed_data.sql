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
('Colombie Supremo', 'Café grains doux et équilibré, 250g', 'Café', 'Unité', 9.00, 0.055, 9.50, 70, 'paquet-marron.png', 'Colombie'),
('Kenya AA', 'Café acidulé notes agrumes, 250g', 'Café', 'Unité', 10.50, 0.055, 11.08, 60, 'paquet-blanc.png', 'Kenya'),
('Brésil Santos', 'Café moulu chocolaté, 500g', 'Café', 'Unité', 8.00, 0.055, 8.44, 90, 'paquet-marron.png', 'Brésil'),
('Guatemala Antigua', 'Café grains épicé et complexe, 250g', 'Café', 'Unité', 11.50, 0.055, 12.13, 55, 'paquet-blanc.png', 'Guatemala'),
('Sumatra Mandheling', 'Café corsé terreux, 250g', 'Café', 'Unité', 10.00, 0.055, 10.55, 65, 'paquet-marron.png', 'Indonésie'),
('Costa Rica Tarrazu', 'Café grains vif et fruité, 250g', 'Café', 'Unité', 9.50, 0.055, 10.02, 75, 'paquet-blanc.png', 'Costa Rica'),
('Yirgacheffe Bio', 'Café floral et délicat, 250g', 'Café', 'Unité', 12.50, 0.055, 13.19, 40, 'paquet-marron.png', 'Éthiopie'),
('Espresso Italien', 'Mélange traditionnel torréfié, 500g', 'Café', 'Unité', 10.50, 0.055, 11.08, 85, 'paquet-blanc.png', 'Italie'),
('Pérou Organique', 'Café bio équitable, 250g', 'Café', 'Unité', 8.50, 0.055, 8.97, 95, 'paquet-marron.png', 'Pérou'),
('Maragogype', 'Grains géants doux, 250g', 'Café', 'Unité', 13.50, 0.055, 14.24, 30, 'paquet-blanc.png', 'Mexique'),

-- 5 THÉS (TVA 5.5%)
('Thé Vert Sencha', 'Thé vert bio du Japon, 100g', 'Thé', 'Unité', 9.50, 0.055, 10.02, 30, 'paquet-vert.png', 'Japon'),
('Assam Breakfast', 'Thé noir corsé, idéal pour le matin', 'Thé', 'Unité', 8.50, 0.055, 8.97, 60, 'paquet-vert.png', 'Inde'),
('Earl Grey Royal', 'Thé noir à la bergamote, 100g', 'Thé', 'Unité', 10.50, 0.055, 11.08, 40, 'paquet-noir.png', 'Inde'),
('Rooibos Vanille', 'Sans théine, gourmand, 100g', 'Thé', 'Unité', 9.00, 0.055, 9.50, 55, 'paquet-noir.png', 'Afrique du Sud'),
('Matcha Cérémonie', 'Poudre premium pour fouet, 30g', 'Thé', 'Unité', 19.50, 0.055, 20.57, 15, 'paquet-vert.png', 'Japon'),
('Darjeeling Flush', 'Thé noir primeur délicat, 100g', 'Thé', 'Unité', 12.50, 0.055, 13.19, 35, 'paquet-noir.png', 'Inde'),
('Oolong Formose', 'Thé semi-oxydé floral, 100g', 'Thé', 'Unité', 11.50, 0.055, 12.13, 45, 'paquet-vert.png', 'Taïwan'),
('Thé Blanc Pai Mu', 'Thé délicat et raffiné, 50g', 'Thé', 'Unité', 15.00, 0.055, 15.83, 25, 'paquet-noir.png', 'Chine'),
('Pu-Erh 5 ans', 'Thé fermenté digestif, 100g', 'Thé', 'Unité', 14.50, 0.055, 15.30, 20, 'paquet-vert.png', 'Chine'),
('Jasmin Perles', 'Thé vert parfumé jasmin, 100g', 'Thé', 'Unité', 10.00, 0.055, 10.55, 50, 'paquet-noir.png', 'Chine'),
('Ceylon Pekoe', 'Thé noir vif et aromatique, 100g', 'Thé', 'Unité', 9.50, 0.055, 10.02, 65, 'paquet-vert.png', 'Sri Lanka'),
('Gunpowder Bio', 'Thé vert roulé puissant, 100g', 'Thé', 'Unité', 8.00, 0.055, 8.44, 70, 'paquet-noir.png', 'Chine'),
('Chai Masala', 'Mélange épicé traditionnel, 100g', 'Thé', 'Unité', 9.00, 0.055, 9.50, 55, 'paquet-vert.png', 'Inde'),
('Gyokuro Imperial', 'Thé vert ombré premium, 50g', 'Thé', 'Unité', 22.00, 0.055, 23.21, 15, 'paquet-noir.png', 'Japon'),
('Honeybush Citron', 'Infusion sans théine, 100g', 'Thé', 'Unité', 8.50, 0.055, 8.97, 60, 'paquet-vert.png', 'Afrique du Sud'),

-- 5 ACCESSOIRES (TVA 20%)
('Filtres Papier', 'Boîte de 100 filtres N°4', 'Accessoires', 'Unité', 3.50, 0.20, 4.20, 200, 'filtres.png', 'Allemagne'),
('Moulin à Café', 'Manuel avec meules céramique', 'Accessoires', 'Unité', 45.00, 0.20, 54.00, 10, 'moulin.png', 'Chine'),
('Théière Fonte', 'Modèle traditionnel émaillé, 0.8L', 'Accessoires', 'Unité', 42.00, 0.20, 50.40, 8, 'théière.png', 'Japon'),
('Presse Française', 'Cafetière à piston verre/inox', 'Accessoires', 'Unité', 29.00, 0.20, 34.80, 12, 'presse.png', 'France'),
('Balance Précision', 'Mesure au 0.1g près pour dosage', 'Accessoires', 'Unité', 18.50, 0.20, 22.20, 25, 'balance.png', 'Chine');