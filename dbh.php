<?php

class Dbh
{
    private $dsn = "mysql:host=localhost;dbname=burgerbuddyexpressdb";
    private $dbUserName = "root";
    private $dbPassWord = "";

    public PDO $pdo;

    public function Connect()
    {
        try {
            $pdo = new PDO($this->dsn, $this->dbUserName, $this->dbPassWord);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            return null;
        }
    }
}