<?php

$host = "localhost";
$user = "todolist";
$pw = "1234";
$dbName = "todolist_db";

// MySQL 연결
$conn = new mysqli($host, $user, $pw, $dbName);

// 연결 확인
if ($conn->connect_error) {
    die("MySQL 연결 실패: " . $conn->connect_error);
}

// GET 
$login_id = $_GET['login_id'];
$password = $_GET['password'];
$nickname = $_GET['nickname'];

// 쿼리 실행
$sql = "INSERT INTO user (login_id, password, nickname) VALUES ('$login_id', '$password', '$nickname')";

if ($conn->query($sql) === TRUE) {
    // 새로 추가된 사용자의 ID 가져오기
    $new_user_id = $conn->insert_id;

    // 새로 추가된 사용자 조회
    $select_sql = "SELECT * FROM user WHERE user_id = '$new_user_id'";
    $result = $conn->query($select_sql);

    // 결과가 있는 경우
    if ($result->num_rows > 0) {
        // 결과를 담을 객체 초기화
        $user = new stdClass();

        // 결과 반복하여 객체에 값 할당
        while ($row = $result->fetch_assoc()) {
            $user->login_id = $row['login_id'];
            $user->password = $row['password'];
            $user->nickname = $row['nickname'];
        }

        // JSON 형식으로 출력
        header('Content-Type: application/json');

        // JSON 변환 후 출력
        echo json_encode($user);
    } else {
        echo "삽입 과정에서 오류가 발생했습니다: " . $conn->error;
    }
} else {
    echo "삽입 과정에서 오류가 발생했습니다: " . $conn->error;
}

$conn->close();

?>