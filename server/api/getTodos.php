<?
    $host = "localhost";
    $user = "todolist";
    $pw = "1234";
    $dbName = "todolist_db";
// 파라미터로 전달된 user_id 가져오기
$user_id = $_GET['user_id'];

// MySQL 연결
$conn = new mysqli($host, $user, $pw, $dbName);

// 연결 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
}

// 쿼리 생성
$sql = "SELECT * FROM todo WHERE user_id = '$user_id'";

// 쿼리 실행
$result = $conn->query($sql);

// 결과 처리
if ($result->num_rows > 0) {
    // 결과를 담을 배열 초기화
    $todos = array();

    // 결과를 배열로 변환
    while ($row = $result->fetch_assoc()) {
        $original_date = $row['create_date'];
        $formatted_date = date('m/d/y', strtotime($original_date));

        $todo = array(
            'todo_id' => $row['todo_id'],
            'create_date' => $formatted_date,
            'content' => $row['content'],
            'checked' => $row['checked'] === "1" ? true : false,
            'user_id' => $row['user_id']
        );

        // 결과 배열에 추가
        $todos[] = $todo;  
    }

    

    // JSON 형식으로 출력
    header('Content-Type: application/json');

    // JSON 형식으로 출력
    echo json_encode($todos);
} else {
    echo json_encode(array());
}

// MySQL 연결 종료
$conn->close();
    
?>
