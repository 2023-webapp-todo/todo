<?
    $host = "localhost";
    $user = "todolist";
    $pw = "1234";
    $dbName = "todolist_db";


    // 파라미터로 전달된 값 가져오기
$user_id = $_GET['user_id'];
$checked = $_GET['checked'] === "true" ? 1 : 0; // true면 1, false면 0으로 변환
$content = $_GET['content'];
$received_create_date = $_GET['create_date'];

// create_date 값을 변환하기 위한 strtotime() 함수 사용
$create_date = date('Y-m-d', strtotime($received_create_date));


// MySQL 연결
$conn = new mysqli($host, $user, $pw, $dbName);

// 연결 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
}

// INSERT 쿼리 생성
$sql = "INSERT INTO todo (user_id, checked, content, create_date) VALUES ('$user_id', '$checked', '$content', '$create_date')";

// 쿼리 실행
if ($conn->query($sql) === TRUE) {
    // 새로 추가된 todo의 ID를 가져옴
    $new_todo_id = $conn->insert_id;

    // SELECT 쿼리 실행하여 새로 추가된 todo 조회
    $select_sql = "SELECT * FROM todo WHERE todo_id = '$new_todo_id'";
    $result = $conn->query($select_sql);

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
        echo "일치하는 데이터가 없습니다.";
    }
} else {
    echo "삽입 과정에서 오류가 발생했습니다: " . $conn->error;
}

// MySQL 연결 종료
$conn->close();

?>
