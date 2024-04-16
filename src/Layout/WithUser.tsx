import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../reducers/auth.reducers";
import { useFetchUser } from "../hooks/useFetchUser";

type WithHeaderProps = {
  children?: JSX.Element;
};

const WithUser: React.FC<WithHeaderProps> = ({ children }) => {
  const user = useSelector(getUser);
  const [fetchUserStatus, fetchUser] = useFetchUser();

  useEffect(() => {
    if (!user && !fetchUserStatus.loading) {
      fetchUser();
    }
  }, []);

  return <>{children}</>;
};

export default WithUser;
