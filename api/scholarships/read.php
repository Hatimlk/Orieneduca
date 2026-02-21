<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$type = isset($_GET['type']) ? $_GET['type'] : null;
$location = isset($_GET['location']) ? $_GET['location'] : null;
$search = isset($_GET['search']) ? $_GET['search'] : null;

$query = "SELECT * FROM scholarships WHERE 1=1";

if ($type && $type !== 'All') {
    $query .= " AND type = :type";
}
if ($location && $location !== 'All') {
    $query .= " AND location = :location";
}
if ($search) {
    $query .= " AND (title LIKE :search OR provider LIKE :search OR country LIKE :search)";
}

$stmt = $db->prepare($query);

if ($type && $type !== 'All') {
    $stmt->bindParam(':type', $type);
}
if ($location && $location !== 'All') {
    $stmt->bindParam(':location', $location);
}
if ($search) {
    $searchTerm = "%{$search}%";
    $stmt->bindParam(':search', $searchTerm);
}

$stmt->execute();
$num = $stmt->rowCount();

if ($num > 0) {
    $scholarships_arr = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $scholarship_item = array(
            "id" => $id,
            "title" => $title,
            "provider" => $provider,
            "location" => $location,
            "country" => $country,
            "type" => $type,
            "value" => $value,
            "description" => $description,
            "deadline" => $deadline,
            "eligibility" => json_decode($eligibility),
            "targetLevels" => json_decode($target_levels), // Map snake_case DB to camelCase API
            "imageUrl" => $image_url,
            "tags" => json_decode($tags),
            "criteria" => json_decode($criteria)
        );

        array_push($scholarships_arr, $scholarship_item);
    }

    http_response_code(200);
    echo json_encode($scholarships_arr);
} else {
    http_response_code(200); // Return empty array instead of 404 for search results
    echo json_encode([]);
}
?>