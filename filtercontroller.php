<?php

class filterController
{

    private $db;
    public function __construct()
    {
        $this->createDBConnection();

        if ($_SERVER["REQUEST_METHOD"] == "GET") {
            $this->displayFilterItems();
        }
        // wat als we willen filteren op een specifieke category
    }
    function createDBConnection()
    {
        $dbh = new Dbh();
        $this->db = $dbh->Connect();
    }

    public function displayFilterItems(){
        $filterItems = Filter::showFilterItems($this->db);
        $showFilter = new showFilter($filterItems);
        $showFilter->showFilter();
    }
}