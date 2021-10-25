import DrugsRecipieNew from "@/components/DrugsRecipieNew";
import ImageRecipieNew from "@/components/ImageRecipieNew";
import LayoutSecondary from "@/components/LayoutSecondary";
import Title from "@/components/Title";
import { Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
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

const MedicalImage = ({ props }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id, pid, exam_id, recipie_id } = router.query;

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
          Revisión médica (Medicación)
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
                  variant="fullWidth"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Imagen" {...a11yProps(0)} />
                  <Tab label="Medicamento" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <ImageRecipieNew examID={recipie_id} pid={pid} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <DrugsRecipieNew examID={recipie_id} pid={pid} />
              </TabPanel>
            </Box>
          </Container>
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default MedicalImage;
