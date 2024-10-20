import { useSelector } from "react-redux";
import {
  selectAuthUsers,
  selectCurrentUser,
  selectRegisteredUsers,
} from "../redux/reducers/authentication";

const useAuth = () => {
  const registeredUsers = useSelector(selectRegisteredUsers);
  const authUsers = useSelector(selectAuthUsers);
  const user = useSelector(selectCurrentUser);

  return {
    registeredUsers,
    authUsers,
    user,
  };
};

export default useAuth;
