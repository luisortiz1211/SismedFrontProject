import DrugAllergieNew from "@/components/DrugAllergieNew";
import DrugsRecipieNew from "@/components/DrugsRecipieNew";
import EmergencyContactNew from "@/components/EmergencyContactNew";
import ExplorationPatientNew from "@/components/ExplorationPatientNew";
import FamilyHistoryNew from "@/components/FamilyHistoryNew";
import ImageRecipieNew from "@/components/ImageRecipieNew";
import LayoutSecondary from "@/components/LayoutSecondary";
import PatientsInformation from "@/components/PatientUpdate";
import PersonalHistoryNew from "@/components/PersonalHistoryNew";
import PhysicalExamNew from "@/components/PhysicalExamNew";
import Title from "@/components/Title";
import withAuth from "@/hocs/withAuth";
import { Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import BallotIcon from "@material-ui/icons/Ballot";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    //padding: "15px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },

  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },
}));

const patientDetails = ({ props }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <LayoutSecondary>
      <Container>
        <Title>
          <BallotIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />
          Historia clínica (Nuevo)
          {/*   Ingreso desde historia medica para añadir sin cita
           */}
        </Title>
        <Paper elevation={6} style={{ padding: "10px", margin: "20px" }}>
          <Container>
            <Box className={classes.root}>
              <Box sx={{ borderBottom: 2, borderColor: "#fff" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons
                  aria-label="visible arrows tabs example"
                  sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                      "&.Mui-disabled": { opacity: 0.9 },
                    },
                  }}
                >
                  <Tab label="Datos" {...a11yProps(0)} />
                  <Tab label="Contactos" {...a11yProps(1)} />
                  <Tab label="APP" {...a11yProps(2)} />
                  <Tab label="APF" {...a11yProps(3)} />
                  <Tab label="Alergias" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <PatientsInformation
                  patientID={id}
                  component={"span"}
                  variant={"body2"}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EmergencyContactNew />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <PersonalHistoryNew />
              </TabPanel>

              <TabPanel value={value} index={3}>
                <FamilyHistoryNew />
              </TabPanel>

              <TabPanel value={value} index={4}>
                <DrugAllergieNew />
              </TabPanel>
            </Box>
          </Container>
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default withAuth(patientDetails);
