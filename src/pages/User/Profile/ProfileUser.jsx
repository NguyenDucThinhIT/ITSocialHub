import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import Profile from "./Profile";

function ProfileUser() {
  const isEdit = useSelector((state) => state.auth.isEdit);

  return <>{isEdit ? <EditProfile /> : <Profile />}</>;
}

export default ProfileUser;
