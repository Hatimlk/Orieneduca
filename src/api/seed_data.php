<?php
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// --- Seed Scholarships ---
$scholarships_json = '[
  {
    "title": "Bourse Minhaty",
    "provider": "État Marocain",
    "location": "Maroc",
    "country": "Maroc",
    "type": "Sociale",
    "value": "Non spécifié",
    "description": "Bourse nationale destinée aux étudiants issus de familles à revenus modestes.",
    "deadline": "2024-07-31",
    "eligibility": ["Nationalité Marocaine", "Revenu familial limité"],
    "target_levels": ["Bac", "Licence"],
    "image_url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80",
    "tags": ["Public", "Social", "National"],
    "criteria": {"minGrade": 10, "targetSector": "All", "socialCriteria": true}
  },
  {
    "title": "Bourse d\'Excellence Fondation OCP",
    "provider": "Fondation OCP",
    "location": "Maroc",
    "country": "Maroc",
    "type": "Excellence",
    "value": "Couverture Totale + Vie",
    "description": "Programme prestigieux pour soutenir les bacheliers brillants issus de milieux défavorisés.",
    "deadline": "2024-09-15",
    "eligibility": ["Bac Mention Très Bien", "Revenu modeste"],
    "target_levels": ["Bac"],
    "image_url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
    "tags": ["Prestige", "Ingénierie", "UM6P"],
    "criteria": {"minGrade": 16, "targetSector": "All", "socialCriteria": true, "targetCities": ["Khouribga", "Benguerir"]}
  }
]';

$scholarships = json_decode($scholarships_json, true);

foreach ($scholarships as $s) {
    $query = "INSERT INTO scholarships 
              (title, provider, location, country, type, value, description, deadline, eligibility, target_levels, image_url, tags, criteria) 
              VALUES 
              (:title, :provider, :location, :country, :type, :value, :description, :deadline, :eligibility, :target_levels, :image_url, :tags, :criteria)";

    $stmt = $db->prepare($query);

    $stmt->bindParam(':title', $s['title']);
    $stmt->bindParam(':provider', $s['provider']);
    $stmt->bindParam(':location', $s['location']);
    $stmt->bindParam(':country', $s['country']);
    $stmt->bindParam(':type', $s['type']);
    $stmt->bindParam(':value', $s['value']);
    $stmt->bindParam(':description', $s['description']);
    $stmt->bindParam(':deadline', $s['deadline']);

    $eligibility = json_encode($s['eligibility']);
    $stmt->bindParam(':eligibility', $eligibility);

    $target_levels = json_encode($s['target_levels']);
    $stmt->bindParam(':target_levels', $target_levels);

    $stmt->bindParam(':image_url', $s['image_url']);

    $tags = json_encode($s['tags']);
    $stmt->bindParam(':tags', $tags);

    $criteria = json_encode($s['criteria']);
    $stmt->bindParam(':criteria', $criteria);

    if ($stmt->execute()) {
        echo "Inserted Scholarship: " . $s['title'] . "<br>";
    } else {
        echo "Error: " . $stmt->errorInfo()[2] . "<br>";
    }
}

echo "Seeding completed!";
?>