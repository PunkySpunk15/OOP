<?php

class Filter
{
    private $id;
    private $name;

    public function __construct($id, $name, )
    {
        $this->id = $id;
        $this->name = $name;
    }
    public function getId()
    {
        return $this->id;
    }

    public function getCategory()
    {
        return $this->name;
    }

    public static function showFilterItems($db)
    {
        try {
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
            return $filterItems;
        } catch (PDOException $error) {
        }
    }
}