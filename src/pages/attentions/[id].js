import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import withAuth from "@/hocs/withAuth";
import { Button, CssBaseline, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
import { useAuth } from "src/contexts/auth";
import useSWR from "swr";

const columns = [
  {
    id: "id",
    label: "N°",
    minWidth: 10,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },

  {
    id: "created_at",
    label: "Fecha",
    minWidth: 10,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "patient_id",
    label: "# Historia clínica",
    minWidth: 10,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "scheduleDay",
    label: "Día",
    minWidth: 30,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "scheduleTime",
    label: "Hora inicio",
    minWidth: 30,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "userAssigned",
    label: "Médico",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "user_id",
    label: "Ingreso",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "scheduleDayState",
    label: "Estado",
    minWidth: 130,
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
  btnexplo: {
    backgroundColor: "#60CCD9",
    color: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const AttentionsDetails = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // añadir paginacion

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/users/${id}/schedule_days`, fetcher);
  //console.log("Lista pacientes asignados", data);
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
    <div>
      <CssBaseline>
        <Container direction="row">
          <Title>
            <LibraryBooksIcon
              style={{
                color: "#092435",
                fontSize: 35,
                position: "relative",
                top: "6px",
              }}
            />
            {"  "}Lista de agendamiento
          </Title>
          <Paper
            className={classes.root}
            elevation={6}
            style={{ margin: "20px" }}
          >
            <AnnounTitle>
              Seleccione un paciente para visualizar su examen físico{" "}
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
                    .slice()
                    .reverse()
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          style={
                            row.scheduleDayState === "atendido"
                              ? { backgroundColor: "#FFE082" }
                              : row.scheduleDayState === "pendiente"
                              ? { backgroundColor: "#FFF" }
                              : row.scheduleDayState === "registrado"
                              ? { backgroundColor: "#C5E1A5" }
                              : { backgroundColor: "#FFCDD2" }
                          }
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id && typeof value === "number"
                                  ? value
                                  : value}{" "}
                                {user.roleUser === "ROLE_MEDIC" ? (
                                  column.id === "botonSelect" &&
                                  column.label == "_" ? (
                                    <Grid
                                      container
                                      direction="row"
                                      alignItems="center"
                                      justifyContent="center"
                                      spacing={2}
                                    >
                                      <Grid item>
                                        <Link
                                          href={`/reviewAttention/${row.schedule_day}/patient/${row.patient_id}`}
                                          passHref
                                        >
                                          <Button
                                            variant="outlined"
                                            size="small"
                                            disabled={
                                              row.scheduleDayState ===
                                                "cancelado" ||
                                              row.scheduleDayState ===
                                                "atendido"
                                            }
                                            className={classes.btnexplo}
                                          >
                                            <DomainVerificationIcon />
                                          </Button>
                                        </Link>
                                      </Grid>
                                    </Grid>
                                  ) : (
                                    ""
                                  )
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
              labelRowsPerPage="Usuarios:"
              rowsPerPageOptions={[10, 25]}
              component="div"
              count={data.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      </CssBaseline>
    </div>
  );
};
export default withAuth(AttentionsDetails);
