<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->fullName) &&
    !empty($data->email) &&
    !empty($data->password)
) {
    // Check if email already exists
    $check_query = "SELECT id FROM users WHERE email = :email LIMIT 1";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(':email', $data->email);
    $check_stmt->execute();

    if ($check_stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Cet email est déjà utilisé."));
        exit();
    }

    // Insert new user
    $query = "INSERT INTO users SET full_name=:name, email=:email, password_hash=:password, role='student', plan='Gratuit', created_at=:created_at";
    $stmt = $db->prepare($query);

    // Sanitize
    $name = htmlspecialchars(strip_tags($data->fullName));
    $email = htmlspecialchars(strip_tags($data->email));
    $password = password_hash($data->password, PASSWORD_BCRYPT);
    $created_at = date('Y-m-d H:i:s');

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password);
    $stmt->bindParam(":created_at", $created_at);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "Compte créé avec succès."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Impossible de créer le compte."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Données incomplètes."));
}
?>