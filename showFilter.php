<?php

class showFilter
{
    private $filterItems;

    public function __construct($filterItems)
    {
        $this->filterItems = $filterItems;
    }
    public function showFilter()
    {
        foreach ($this->filterItems as $filterItem) {
            $htmlString = '
            <label><input type="checkbox" value="sectie' . $filterItem->getId() . '" name="category">' . $filterItem->getCategory() . '</label>
            <br>';
            echo $htmlString;
        }
    }
}