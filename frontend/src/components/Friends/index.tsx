import { IUser } from "@/types/user";
import styles from "./styles.module.scss";
import { useSetRecoilState } from "recoil";
import userIdState from "@/stores/userId";
import selectedProfileState from "@/stores/selectedProfile";

type FriendsProps = {
  users: IUser[];
};

export default function Friends({ users }: FriendsProps) {
  const loginUserId = JSON.parse(localStorage.getItem("user") || "").user_id;
  const loginUserNickname = JSON.parse(
    localStorage.getItem("user") || ""
  ).nickname;

  const setUserId = useSetRecoilState(userIdState);
  const setSelectedProfile = useSetRecoilState(selectedProfileState);

  const onClickUser = (userId: string, nickname: string) => {
    setUserId(userId);
    setSelectedProfile(nickname);
  };

  return (
    <ul className={styles.container}>
      <li onClick={() => onClickUser(loginUserId, loginUserNickname)}>
        <p>{loginUserNickname}</p>
      </li>
      {users.map((user) => (
        <li
          key={user.user_id}
          onClick={() => onClickUser(user.user_id, user.nickname)}
        >
          <p>{user.nickname}</p>
        </li>
      ))}
    </ul>
  );
}
