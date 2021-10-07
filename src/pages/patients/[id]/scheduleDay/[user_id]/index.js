import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import Layout from "@/components/Layoutmain";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { Button, Container, CssBaseline, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
import useSWR from "swr";

const columns = [
  {
    id: "schedule_id",
    label: "N°",
    minWidth: 30,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "userDay",
    label: "Día",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "startTime",
    label: "Inicio turno",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "finishTime",
    label: "Fin turno",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "availableStatus",
    label: "Hora fin",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },

  {
    id: "botonSelect",
    label: "",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "left",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  container: {
    minHeight: 440,
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

  button: {
    margin: theme.spacing(3),
  },

  btnasign: {
    textTransform: "none",
    background: "#60CCD9",
    color: "#092435",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const ScheduleShift = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id, user_id } = router.query;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/users/${user_id}}/schedule_users`, fetcher);
  //console.log("Horarios médico", data);
  if (error)
    return (
      <div>
        <ChargeInformation />
      </div>
    );
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <Layout>
      <CssBaseline />
      <Container maxWidth="lg" direction="row">
        <Title>
          {" "}
          <ListAltIcon
            style={{
              color: "#092435",
              fontSize: 40,
              position: "relative",
              top: "7px",
            }}
          />{" "}
          Horario de Citas
        </Title>
        <Paper
          className={classes.root}
          elevation={6}
          style={{ margin: "20px" }}
        >
          <AnnounTitle>
            Seleccione un horario para la cita del paciente
          </AnnounTitle>

          <TableContainer className={classes.container}>
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
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        //  tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((array) => {
                          const value = row[array.id];
                          return (
                            <TableCell key={array.id} align={array.align}>
                              {array.id === "availableStatus"
                                ? row.availableStatus === 0
                                  ? "Disponible"
                                  : "Asignado"
                                : value}
                              {array.id === "botonSelect" &&
                              array.label == "" ? (
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Grid item>
                                    <Link
                                      href={`/patients/${id}/scheduleDay/${user_id}/schedule/${row.schedule_id}`}
                                      passHref
                                    >
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.btnasign}
                                        endIcon={<AssignmentTurnedInIcon />}
                                        disabled={row.availableStatus === 1}
                                      >
                                        Asignar
                                      </Button>
                                    </Link>
                                  </Grid>
                                </Grid>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Horarios:"
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={columns.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Layout>
  );
};
export default ScheduleShift;
