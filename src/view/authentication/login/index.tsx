import { replaceEndpoint } from "hooks/useEndpoint";
import { connect } from "qbittorrent-api-v2";
import React, { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginLayout, UserInfo } from "./LoginLayout";


const Login: FC = () => {
  const navigate = useNavigate();

  const performLogin = useCallback(({ userName, password }: UserInfo) => {
    connect("", userName, password)
      .then((e) => {
        replaceEndpoint(e);
        navigate("/tasks");
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <LoginLayout onLogin={performLogin} />
  );
}


export default Login;
