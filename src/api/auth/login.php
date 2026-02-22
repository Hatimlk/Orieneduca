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

if (!empty($data->email) && !empty($data->password)) {
    $query = "SELECT id, full_name, email, password_hash, role, plan FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $password_hash = $row['password_hash'];

        if (password_verify($data->password, $password_hash)) {
            // Password is correct
            $user_item = array(
                "id" => $row['id'],
                "fullName" => $row['full_name'],
                "email" => $row['email'],
                "role" => $row['role'],
                "plan" => $row['plan'],
                "token" => bin2hex(random_bytes(16)) // Simple session token simulation
            );

            http_response_code(200);
            echo json_encode(array(
                "message" => "Connexion réussie.",
                "user" => $user_item
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Mot de passe incorrect."));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Compte inexistant."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Données incomplètes."));
}
?>