<?php

class productController
{

    private $db;
    public function __construct()
    {
        $this->createDBConnection();

        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            if (key_exists("category", $_GET)) {
                $this->displaySpecificCategory();
            } else {
                $this->displayAllProducts();
            }
        }
        // wat als we willen filteren op een specifieke category
    }
    function createDBConnection()
    {
        $dbh = new Dbh();
        $this->db = $dbh->Connect();
    }

    function displayAllProducts()
    {
        $data = Product::getAllProducts($this->db);
        // var_dump($data);
        $sectionView = new sectionView($data['products'], $data['categories']);
        $sectionView->showView();
    }

    public function displaySpecificCategory()
    {
        $categoryName = $_GET['category'];
        $products = Product::getSpecificCategory($this->db, $categoryName);
        $sectionView = new sectionView($products, $categories);
        $sectionView->showView();
    }
    // display products for specific category
    // $products = Product::getProductByCategory($this->db, $categoryName);
    // $sectionView = new sectionView($products);
    // $sectionView->showView();   
}