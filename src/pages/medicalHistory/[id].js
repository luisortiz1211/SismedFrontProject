import DrugAllergieList from "@/components/DrugAllergieList";
import EmergencyContactList from "@/components/EmergencyContactList";
import ExplorationPatientList from "@/components/ExplorationPatientList";
import FamilyHistoryList from "@/components/FamilyHistoryList";
import LayoutSecondary from "@/components/LayoutSecondary";
import PatientsInformation from "@/components/PatientUpdate";
import PersonalHistoryList from "@/components/PersonalHistoryList";
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
          <Typography component={"span"}>{children}</Typography>
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
    width: "auto",
    //padding: "15px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "40px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
  textField: {
    paddingBottom: "15px",
    color: "#414A4F",
  },
}));

const PatientDetails = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title component={"span"}>
          <BallotIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />
          Historia clínica (Información)
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
                  <Tab label="REV" {...a11yProps(5)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <PatientsInformation patientID={id} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EmergencyContactList patientID={id} />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <PersonalHistoryList patientID={id} />
              </TabPanel>

              <TabPanel value={value} index={3}>
                <FamilyHistoryList patientID={id} />
              </TabPanel>

              <TabPanel value={value} index={4}>
                <DrugAllergieList patientID={id} />
              </TabPanel>

              <TabPanel value={value} index={5}>
                <ExplorationPatientList patientID={id} />
              </TabPanel>
            </Box>
          </Container>
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default PatientDetails;
