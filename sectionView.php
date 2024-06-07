<?php
//
class sectionView
{
    private $products;
    private $categories;

    public function __construct($products, $categories)
    {
        $this->products = $products;
        $this->categories = $categories;
    }

    public function showView()
    {
        $htmlString = "";

        // per categorie welke producten deze categorie hebben
        foreach ($this->categories as $category) {
            $htmlString .= '<section id="' . $category->getCategory() . '>
            <h1 class="subtitle">' . $category->getCategory() . '</h1>';

            foreach ($this->products as $product) {
                if ($product->getCategory() == $category->getId()) {
                    // hier doe je htmlstring voor het product zelf
                    $htmlString .=
                        '<div class="item">
            <div class="left-items">
            <div class="left-devide-top">
                <div class="name">
                    <h2>' . $product->getProductName() . '</h2>
                </div>
                <div class="beschrijving">
                    <p>' . $product->getDescription() . '</p>
                </div>
            </div>
            <div class="left-devide-bottom">
                <div class="prijs">
                    <h3>€' . $product->getPrice() . '</h3>
                </div>
            </div>
            </div>
            <div class="right-items">
                <img src="' . $product->getImg() . '">
                    <div class="plus">
                    <button class="addToCart">
                        <i class="fa-solid fa-plus" id="addProduct"  data-id="' . $product->getId() . '"></i>
                            </button>
                            </div>
                        </div>
                </div>';
                }
            }
            $htmlString .= "</section>";
        }
        echo $htmlString;
    }
}