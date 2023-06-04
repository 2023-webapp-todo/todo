import useCheckInput from "@/hooks/useCheckInput";
import useInput from "@/hooks/useInput";
import onKeydown from "@/utils/onKeyDown";
import { SignUpAPI } from "@/services/user";
import { Form } from "@/types/form";
import { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import styles from "./styles.module.scss";

export default function SignUp() {
  const authState = useOutletContext();
  const navigate = useNavigate();
  const [formDisabled, setFormDisabled] = useState(true);
  const [email, emailHandler] = useInput("");
  const [password, passwordHandler] = useInput("");
  const [nickname, nicknameHandler] = useInput("");
  const emailErrorState = useCheckInput(email, /.*@.*/g);
  const passwordErrorState = useCheckInput(password, /^.{8,}$/g);
  const nicknameErrorState = useCheckInput(nickname, /\b\w{3,}\b/);

  const handleSubmit = async () => {
    const form: Form = {
      email,
      password,
    };
    const response = await SignUpAPI(form);
    if (response) {
      alert("회원가입에 성공하였습니다.");
      navigate("/signin");
    }
  };

  // keydown 이벤트가 일어날 때 실행할 핸들러
  const keydownHandler = () => {
    if (formDisabled) return;
    handleSubmit();
  };

  useEffect(() => {
    if (!emailErrorState && !passwordErrorState) {
      setFormDisabled(false);
    } else {
      setFormDisabled(true);
    }
  }, [emailErrorState, passwordErrorState]);

  if (authState) {
    return <Navigate to="/todo" />;
  }
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>회원가입</h1>
      <form className={styles.formWrapper}>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            data-testid="email-input"
            type="text"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={emailHandler}
          />
          <p className={styles.errorMessage}>
            {emailErrorState && "@를 포함해야 합니다."}
          </p>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">패스워드</label>
          <input
            id="password"
            data-testid="password-input"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={passwordHandler}
            onKeyDown={(e) => onKeydown(e, keydownHandler)}
          />
          <p className={styles.errorMessage}>
            {passwordErrorState && "8자 이상이어야 합니다."}
          </p>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="password">닉네임</label>
          <input
            id="nickname"
            data-testid="nickname-input"
            type="text"
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChange={nicknameHandler}
            onKeyDown={(e) => onKeydown(e, keydownHandler)}
          />
          <p className={styles.errorMessage}>
            {nicknameErrorState && "3자 이상이어야 합니다."}
          </p>
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={handleSubmit}
          data-testid="signup-button"
          disabled={formDisabled}
        >
          회원가입
        </button>
        <span className={styles.subContainer}>
          <p>이미 회원이신가요?</p>
          <Link to="/signin">로그인</Link>
        </span>
      </form>
    </div>
  );
}
