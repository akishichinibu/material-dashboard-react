import React, { FC, useEffect, useState } from "react"

export const AuthProvider: FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {

  }, []);

  if (isLogin) {
    return <>{children}</>
  }

  return <></>
}
