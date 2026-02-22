<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$city = isset($_GET['city']) ? $_GET['city'] : null;
$type = isset($_GET['type']) ? $_GET['type'] : null;

$query = "SELECT * FROM schools WHERE 1=1";

if ($city && $city !== 'All') {
    $query .= " AND city = :city";
}
if ($type && $type !== 'All') {
    $query .= " AND type = :type"; // Post-Bac vs Post-Prepa
}

$stmt = $db->prepare($query);

if ($city && $city !== 'All') {
    $stmt->bindParam(':city', $city);
}
if ($type && $type !== 'All') {
    $stmt->bindParam(':type', $type);
}

$stmt->execute();
$num = $stmt->rowCount();

if ($num > 0) {
    $schools_arr = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $school_item = array(
            "id" => $id,
            "name" => $name,
            "category" => $category,
            "type" => $type,
            "city" => $city,
            "description" => $description,
            "logoUrl" => $logo_url,
            "websiteUrl" => $website_url,
            "thresholds" => json_decode($thresholds)
        );

        array_push($schools_arr, $school_item);
    }

    http_response_code(200);
    echo json_encode($schools_arr);
} else {
    http_response_code(200);
    echo json_encode([]);
}
?>