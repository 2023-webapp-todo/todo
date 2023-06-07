<?

// MySQL 데이터베이스 연결 설정
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

// 전달받은 login_id와 password 파라미터 가져오기
$login_id = $_GET['login_id'];
$password = $_GET['password'];

// login_id가 db에 있는지 확인
$query = "SELECT * FROM user WHERE login_id = '$login_id'";
$result = $conn->query($query);

// JSON 형식으로 출력
header('Content-Type: application/json');

if ($result->num_rows == 0) {
    // login_id가 존재하지 않을 경우
    $response = array('message' => '존재하지 않는 아이디입니다');
    echo json_encode($response);
} else {
    $row = $result->fetch_assoc();
    
    // 전달받은 password와 DB의 password 비교
    if ($password !== $row['password']) {
        // 비밀번호가 일치하지 않을 경우
        $response = array('message' => '비밀번호가 일치하지 않습니다');
        echo json_encode($response);
    } else {
        // 비밀번호가 일치할 경우
        // 해당 유저의 데이터를 JSON으로 출력
        unset($row['password']); // 보안상의 이유로 password 필드 제거
        echo json_encode($row);
    }
}

$conn -> close();

?>