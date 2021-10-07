import DrugsRecipieNew from "@/components/DrugsRecipieNew";
import ExplorationPatientNew from "@/components/ExplorationPatientNew";
import ImageRecipieNew from "@/components/ImageRecipieNew";
import LayoutSecondary from "@/components/LayoutSecondary";
import PhysicalExamUpdate from "@/components/PhysicalExamUpdate";
import Title from "@/components/Title";
import withAuth from "@/hocs/withAuth";
import { Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
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
    height: "auto",
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

const MedicalReview = ({ props }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id, pid, exam_id } = router.query;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <LayoutSecondary>
      <Container maxWidth="lg">
        <Title>
          <AssignmentIndIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />
          Revisión médica
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
                  <Tab label="Exm físico" {...a11yProps(0)} />
                  <Tab label="Exploración" {...a11yProps(1)} />
                  <Tab label="Imagenes" {...a11yProps(2)} />
                  <Tab label="Medicamentos" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <PhysicalExamUpdate examID={exam_id} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ExplorationPatientNew examID={exam_id} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ImageRecipieNew examID={exam_id} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <DrugsRecipieNew examID={exam_id} />
              </TabPanel>
            </Box>
          </Container>
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default withAuth(MedicalReview);
