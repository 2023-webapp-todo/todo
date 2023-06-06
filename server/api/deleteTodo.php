<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
<?
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

// DELETE 쿼리 실행하여 해당 todo 삭제
$delete_sql = "DELETE FROM todo WHERE todo_id = '$todo_id'";

// 쿼리 실행
if ($conn->query($delete_sql) === TRUE) {
    echo "데이터 삭제가 성공적으로 수행되었습니다.";
} else {
    echo "데이터 삭제 중 오류가 발생했습니다: " . $conn->error;
}

// MySQL 연결 종료
$conn->close();

?>
