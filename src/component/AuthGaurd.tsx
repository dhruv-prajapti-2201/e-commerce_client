import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


type props={
    Component:React.ComponentType
}

const AuthGuard = ({ Component }:props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) {
      navigate("/signin");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component />;
};

export default AuthGuard;