/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox_ from "components/MDBox";
import MDTypography_ from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { useTorrents } from "state";
import { useWidth } from "hooks/useWidth";
import { Torrent } from "qbittorrent-api-v2";
import { fileSizePretties } from "utils";

const MDBox = MDBox_ as FC<any>;
const MDTypography = MDTypography_ as FC<any>;


const TaskInfo: FC<{ torrent: Torrent }> = ({ torrent: { name } }) => {
  return (
    <div style={{ width: "100%" }}>{name}</div>
  )
}


const MobileTaskInfo: FC<{ torrent: Torrent }> = ({ torrent: { name, size } }) => {
  return (
    <div style={{
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignContent: "flex-start",
    }}>
      <div style={{ width: "100%" }}>{name}</div>
      <div style={{ width: "100%" }}>{fileSizePretties(size)}</div>
    </div>
  )
}


const Tasks: FC = () => {
  const isMobile = useWidth();
  const torrents = useTorrents();

  const columns = isMobile ? [
    { Header: "Task", accessor: "task", width: "30%", align: "left" },
  ] : [
    { Header: "Task", accessor: "task", width: "30%", align: "left" },
    { Header: "downloaded", accessor: "downloaded", width: "5%", align: "left" },
    { Header: "progress", accessor: "progress", width: "5%", align: "left" },
    { Header: "dlspeed", accessor: "dlspeed", width: "5%", align: "left" },
  ];

  const rows = torrents.map((t) => {
    if (isMobile) {
      return {
        task: <MobileTaskInfo torrent={t} />,
      }
    } else {
      return {
        ...t,
        task: <TaskInfo torrent={t} />,
        progress: `${t.progress * 100} %`,
        dlspeed: `${fileSizePretties(t.dlspeed)}/s`,
      }
    }
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>

              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows, }}
                  isSorted={false}
                  entriesPerPage={25}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>

            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Tasks;
