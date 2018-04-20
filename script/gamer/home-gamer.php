<?php
include("vendor/autoload.php");
function userRss($owner, $maxPage) {
    $GamerHomeCreation = new wsmwason\gamer\GamerHomeCreation($owner);
    $GamerHomeCreation->setOwner($owner);
    $GamerHomeCreation->setMaxCrawlPage($maxPage);
    return $GamerHomeCreation->asXml();
}

echo userRss('hp10000p', 2);
?>
