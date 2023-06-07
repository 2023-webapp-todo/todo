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

// login_id가 db에 있는지 확인
$query = "SELECT user_id, nickname FROM user WHERE user_id != '$user_id'";
$result = $conn->query($query);

// 결과 처리
if ($result->num_rows > 0) {
  // 결과를 담을 배열 초기화
  $users = array();

  // 결과를 배열로 변환
  while ($row = $result->fetch_assoc()) {
      $user = array(
          'user_id' => $row['user_id'],
          'nickname' => $row['nickname']
      );

      // 결과 배열에 추가
      $users[] = $user;
  }

  // JSON 형식으로 출력
  header('Content-Type: application/json');

  // JSON 형식으로 출력
  echo json_encode($users);
} else {
  exit;
}

$conn -> close();

?>