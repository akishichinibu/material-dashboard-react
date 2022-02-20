import React, { ChangeEvent, FC, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";


// Material Dashboard 2 React components
import MDBox_ from "components/MDBox";
import MDTypography_ from "components/MDTypography";
import MDInput_ from "components/MDInput";
import MDButton_ from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

const MDBox = MDBox_ as FC<any>;
const MDTypography = MDTypography_ as FC<any>;
const MDInput = MDInput_ as FC<any>;
const MDButton = MDButton_ as FC<any>;


export interface UserInfo {
  userName: string;
  password: string;
}


interface LoginLayoutProps {
  onLogin: (info: UserInfo) => void;
}


export const LoginLayout: FC<LoginLayoutProps> = ({ onLogin }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ userName: "", password: "" });

  return (
    <BasicLayout image={bgImage}>
      <Card>

        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={3} px={3}>
          <MDBox 
          component="form" 
          role="form" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const label = e.target.getAttribute("label");
            setUserInfo({
              ...userInfo,
              [label]: e.target.value,
            });
          }}>

            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton onClick={() => onLogin(userInfo)} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>

        </MDBox>
      </Card>
    </BasicLayout>
  );
}
