import Loading from "@/components/Loading";
import { Button, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import { Paper } from "@material-ui/core";

import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
import useSWR from "swr";

const columns = [
  {
    id: "created_at",
    label: "Fecha ingreso",
    minWidth: 20,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },

  {
    id: "diagnosisExplo",
    label: "Diagnóstico",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "treatmentExplo",
    label: "Tratamiento",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "commentExplo",
    label: "Comentario",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "botonSelect",
    label: "_",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  container: {
    minHeight: 250,
  },

  button: {
    fontSize: "10px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

  formControl: {
    minWidth: 300,
    paddingBottom: "15px",
    color: "#414A4F",
    paddingRight: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  mpaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(3),
  },
  rightIcon: {
    marginLeft: theme.spacing(2),
  },
  btnview: {
    textTransform: "none",
    background: "#60CCD9",
    color: "#092435",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

export default function ExplorationPatients({ patientID }) {
  const classes = useStyles();
  const router = useRouter();
  const { id, explo_id } = router.query;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, error } = useSWR(
    `/patients/${patientID}/exploration_patients`,
    fetcher
  );
  //console.log("exploraciones del paciente", data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (error)
    return <div> No se puede mostrar las exploraciones del paciente</div>;
  if (!data) return <Loading />;
  // render data
  return (
    <Paper direction="row">
      <TableContainer component="div" className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: column.backgroundColor,
                    fontSize: column.fontSize,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const colorLine = row.explorationPatient_id;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-2}
                    key={row.explorationPatient_id}
                  >
                    {" "}
                    <>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id && typeof value === "number"
                              ? value
                              : value}

                            {column.id === "botonSelect" &&
                            column.label == "_" ? (
                              <Grid
                                component={"span"}
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Grid item>
                                  <Button
                                    href={`/medicalHistory/${id}/physicalExam/${row.physicalExam_id}`}
                                    variant="outlined"
                                    size="small"
                                    className={classes.btnview}
                                    startIcon={<FindInPageIcon />}
                                  >
                                    Historia
                                  </Button>
                                </Grid>
                              </Grid>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        );
                      })}
                    </>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Pacientes:"
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={data.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
