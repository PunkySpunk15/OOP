<?php

class Product
{
    private $id;
    private $name;
    private $description;
    private $price;
    private $img;
    private $category;

    public function __construct($name, $description, $price, $img, $category = null, $id = null)
    {
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->img = $img;
        $this->category = $category;
        $this->id = $id;
    }

    public function getProductName()
    {
        return $this->name;
    }

    public function getDescription()
    {
        return $this->description;
    }
    public function getImg()
    {
        return $this->img;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function getCategory()
    {
        return $this->category;
    }
    public function getId()
    {
        return $this->id;
    }

    public function setProductName($name)
    {
        $this->name = $name;
    }

    public static function getAllProducts($db)
    {
        try {
            $query = $db->prepare("
        SELECT
            id,
            name,
            description,
            image,
            price,
            category_id
        FROM
            product
        ORDER BY
            category_id;");

            $query->execute();
            $results = $query->fetchAll(PDO::FETCH_ASSOC);

            $products = [];
            foreach ($results as $product) {
                $products[] = new Product(
                    $product['name'],
                    $product['description'],
                    $product['price'],
                    $product['image'],
                    $product['category_id'],
                    $product['id'],
                );
            }

            $query = $db->prepare("
            SELECT id, name
            FROM category;");
            $query->execute();
            $results = $query->fetchAll(PDO::FETCH_ASSOC);

            $filterItems = [];
            foreach ($results as $filterItem) {
                $filterItems[] = new Filter(
                    $filterItem['id'],
                    $filterItem['name']
                );
            }

            $returnData = [];
            $returnData['products'] = $products;
            $returnData['categories'] = $filterItems;

            return $returnData;
        } catch (PDOException $error) {
            echo "Error :" . $error->getMessage();
        }

    }
    public static function getSpecificCategory($db, $categoryName)
    {
        try {
            $query = $db->prepare("
        SELECT
            product.id,
            product.name,
            description,
            image,
            price,
            category.name AS category
        FROM
            `product`
        LEFT JOIN `category` ON product.category_id = category.id
        WHERE category.name = " . $categoryName . ";");

            $query->execute();
            $results = $query->fetchAll(PDO::FETCH_ASSOC);

            $products = [];
            foreach ($results as $product) {
                $products[] = new Product(
                    $product['name'],
                    $product['description'],
                    $product['price'],
                    $product['image'],
                    $product['category'],
                    $product['id'],
                );
            }

            return $products;
        } catch (PDOException $error) {
            echo $error->getMessage();
        }
    }

    public static function getProductById(PDO $db, $productId)
    {
        try {
            $query = $db->prepare("SELECT * FROM product WHERE id = 1");
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);
            
            $product = new Product(
                $result['name'],
                $result['description'],
                $result['price'],
                $result['image'],
                $result['category_id'],
                // $result['id']
            );
            return $product;
        }catch(PDOException $ex){
            echo $ex->getMessage();
            return $ex->getMessage();
        }
    }
    // leuke challenge: zorg voor een nieuwe functie 
    //die alle producten van een specifieke category kan ophalen.
}