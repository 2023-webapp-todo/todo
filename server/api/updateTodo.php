<?php

$host = "localhost";
$user = "todolist";
$pw = "1234";
$dbName = "todolist_db";

// 파라미터로 전달된 값 가져오기
$todo_id = $_GET['todo_id'];

// MySQL 연결
$conn = new mysqli($host, $user, $pw, $dbName);

// 연결 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
}

// SELECT 쿼리 실행하여 해당 todo 조회
$select_sql = "SELECT * FROM todo WHERE todo_id = '$todo_id'";
$result = $conn->query($select_sql);

// 결과 처리
if ($result->num_rows > 0) {
    // 첫 번째 행 가져오기
    $row = $result->fetch_assoc();

    // 현재 checked 값 토글
    $checked = $row['checked'] ? 0 : 1;

    // UPDATE 쿼리 생성하여 checked 값 수정
    $update_sql = "UPDATE todo SET checked = '$checked' WHERE todo_id = '$todo_id'";

    // 쿼리 실행
    if ($conn->query($update_sql) === TRUE) {
        // 수정된 todo를 SELECT 쿼리로 다시 조회
        $select_sql = "SELECT * FROM todo WHERE todo_id = '$todo_id'";
        $result = $conn->query($select_sql);

        // 결과 처리
        if ($result->num_rows > 0) {
            // 결과를 담을 객체 초기화
            $todo = null;

            // 결과를 객체에 할당
            while ($row = $result->fetch_assoc()) {
                $original_date = $row['create_date'];
                $formatted_date = date('m/d/y', strtotime($original_date));

                $todo = new stdClass();
                $todo->todo_id = $row['todo_id'];
                $todo->create_date = $formatted_date;
                $todo->content = $row['content'];
                $todo->checked = $row['checked'] === "1" ? true : false;
                $todo->user_id = $row['user_id'];
            }

            // JSON 형식으로 출력
            header('Content-Type: application/json');

            // JSON 형식으로 출력
            echo json_encode($todo);
        } else {
            echo "일치하는 데이터가 없습니다.";
        }
    } else {
        echo "수정 과정에서 오류가 발생했습니다: " . $conn->error;
    }
} else {
    echo "일치하는 데이터가 없습니다.";
}

// MySQL 연결 종료
$conn->close();

?>