SELECT * FROM "Product";

INSERT INTO "Product" ("name", "price", "description", "image_url", "id_category", "stock")
SELECT x.name, x.price, x.description, x.image_url, x.id_category, x.stock
FROM jsonb_to_recordset(
    '[
        {
            "name": "Iphone 15",
            "description": "The best smartphone in the world",
            "price": 199.99,
            "stock": 12,
            "image_url": "https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2023/12/iPhone15_Pink_PDP_Image_Position-1__MXLA.jpg",
            "id_category": 1
        },
        {
            "name": "Samsung Galaxy S23",
            "description": "The best smartphone in the world",
            "price": 150.0,
            "stock": 12,
            "image_url": "https://images.start.com.ar/SM-S918BZKVARO-2.jpg",
            "id_category": 1
        },
        {
            "name": "Motorola Edge 40",
            "description": "The best smartphone in the world",
            "price": 179.89,
            "stock": 12,
            "image_url": "https://images.fravega.com/f1000/e8b9fbbbd0bc9cfbd89147c91f7eba3f.jpg",
            "id_category": 1
        },
        {
            "name": "Samsung Odyssey G9",
            "description": "The best monitor in the world",
            "price": 299.99,
            "stock": 12,
            "image_url": "https://images.fravega.com/f1000/c6320328a79f21e1e1cdfbc2f0d694fc.jpg",
            "id_category": 2
        },
        {
            "name": "LG UltraGear",
            "description": "The best monitor in the world",
            "price": 199.99,
            "stock": 12,
            "image_url": "https://microsites-production-latam.s3.amazonaws.com/uploads/1693227846-3.jpg",
            "id_category": 2
        },
        {
            "name": "Acer Predator",
            "description": "The best monitor in the world",
            "price": 150.0,
            "stock": 12,
            "image_url": "https://i.ebayimg.com/images/g/VDQAAOSwFbdiuT3j/s-l1200.jpg",
            "id_category": 2
        },
        {
            "name": "Razer BlackWidow V3",
            "description": "The best keyboard in the world",
            "price": 99.99,
            "stock": 12,
            "image_url": "https://front.dev.malditohard.com.ar/img/migration/TECLADO-GAMER-RAZER-BLACKWIDOW-V3-GREEN-SP.webp",
            "id_category": 3
        },
        {
            "name": "Corsair K70",
            "description": "The best keyboard in the world",
            "price": 79.99,
            "stock": 12,
            "image_url": "https://deventas.com/wp-content/uploads/2023/09/Diseno-sin-titulo-2023-11-03T001548.412.jpg",
            "id_category": 3
        },
        {
            "name": "Logitech G Pro",
            "description": "The best keyboard in the world",
            "price": 59.99,
            "stock": 12,
            "image_url": "https://promart.vteximg.com.br/arquivos/ids/4592347-1000-1000/image-fca1ec8a24324f18b6a9b48b63a6d422.jpg?v=637812687783130000",
            "id_category": 3
        },
        {
            "name": "Razer Viper",
            "description": "The best mouse in the world",
            "price": 49.99,
            "stock": 12,
            "image_url": "https://aypcomputacion.com/wp-content/uploads/2022/02/2-24.jpg",
            "id_category": 4
        },
        {
            "name": "Logitech G502 Pro",
            "description": "The best mouse in the world",
            "price": 39.99,
            "stock": 12,
            "image_url": "https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2024/02/651851_432831_01_front_zoom.jpg?fit=1000%2C1000&ssl=1",
            "id_category": 4
        },
        {
            "name": "SteelSeries Rival 3",
            "description": "The best mouse in the world",
            "price": 29.99,
            "stock": 12,
            "image_url": "https://www.phi-digital.com/wp-content/uploads/2021/11/Mouse-PC-SteelSeries-Rival-52.jpg",
            "id_category": 4
        }
    ]'::jsonb
) AS x("name" varchar, "description" varchar, "price" numeric, "stock" integer, "image_url" varchar, "id_category" integer);


SELECT  * FROM "Category";
DELETE FROM "Category";

INSERT INTO "Category" ("name", "id") VALUES ('smartphone', 1);
INSERT INTO "Category" ("name", "id") VALUES ('monitor', 2);
INSERT INTO "Category" ("name", "id") VALUES ('keyboard', 3);
INSERT INTO "Category" ("name", "id") VALUES ('mouse', 4);