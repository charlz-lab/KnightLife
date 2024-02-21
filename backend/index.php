<?php
require __DIR__ . "/inc/bootstrap.php";
header("Access-Control-Allow-Origin: *");
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
$objFeedController = new UserController();
$strMethodName = $uri[4] . 'Action';
$objFeedController->{$strMethodName}();
?>