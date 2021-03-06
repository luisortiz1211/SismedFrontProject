import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import SearchPatient from "@/components/SearchPatient";
import Title from "@/components/Title";
import withAuth from "@/hocs/withAuth";
import { Button, Grid } from "@material-ui/core";
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
import AddIcon from "@material-ui/icons/Add";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
import { useAuth } from "src/contexts/auth";
import useSWR from "swr";
import { CssBaseline } from "@material-ui/core";
import SearchToRequest from "@/components/SearchTorequest";

const columns = [
  {
    id: "patient_id",
    label: "N°",
    minWidth: 5,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "ci",
    label: "Cédula",
    minWidth: 5,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },

  {
    id: "name",
    label: "Nombres",
    minWidth: 60,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "lastName",
    label: "Apellidos",
    minWidth: 60,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "sex",
    label: "Sexo",
    minWidth: 60,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "civilStatus",
    label: "Estado",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "movil",
    label: "Movil",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },

  {
    id: "address",
    label: "Dirección",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "botonSelect",
    label: "",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
];
const useStyles = makeStyles({
  root: {
    height: "auto",
  },
  container: {
    maxHeight: 440,
  },

  button: {
    fontSize: "10px",
  },
  btnnew: {
    background: "#ffff",
    color: "#092435",
    margin: "5px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnagn: {
    background: "#60CCD9",
    color: "#092435",
    margin: "5px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
});

const PatientsList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { user } = useAuth();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/patients/all`, fetcher);
  console.log("lista de pacientes", data);
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
    <LayoutSecondary>
      <CssBaseline>
        <Container maxWidth="lg">
          <Title>
            <PeopleOutlineIcon
              style={{
                color: "#092435",
                fontSize: 40,
                position: "relative",
                top: "7px",
              }}
            />{" "}
            {"  "} Buscar pacientes
          </Title>
          <>
            <SearchToRequest />
          </>
          <Paper
            elevation={6}
            style={{ margin: "20px" }}
            sx={{ width: "100%", overflow: "hidden" }}
          >
            <AnnounTitle>
              Buscar si el paciente existe en la base de datos antes de agendar
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
                        {column.id === "botonSelect" ? (
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Link
                              href={`/patients/patientsnew/`}
                              as={`/patients/patientsnew/`}
                              passHref
                            >
                              <Button
                                variant="outlined"
                                size="small"
                                className={classes.btnnew}
                              >
                                Nuevo
                                <AddIcon />
                              </Button>
                            </Link>
                          </Grid>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.data
                    .slice()
                    .reverse()
                    .map((row) => {
                      const colorLine = row.patient_id;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-2}
                          key={row.patient_id}
                          style={
                            colorLine % 2 == 0
                              ? { backgroundColor: "#BBF0E8" }
                              : { backgroundColor: "#fff" }
                          }
                        >
                          {" "}
                          <>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id && typeof value === "number"
                                    ? column.id === "sex"
                                      ? row.sex === 1
                                        ? "Masculino"
                                        : "Femenino"
                                      : value
                                    : value && column.id === "civilStatus"
                                    ? row.civilStatus === "1"
                                      ? "Soltero"
                                      : row.civilStatus === "2"
                                      ? "Casado"
                                      : row.civilStatus === "3"
                                      ? "Divordiado"
                                      : row.civilStatus === "4"
                                      ? "Unión libre"
                                      : "Montepio"
                                    : value}
                                  <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    {user.roleUser === "ROLE_ASSISTENT" ? (
                                      column.id === "botonSelect" &&
                                      column.label == "" ? (
                                        <Grid item>
                                          <Link
                                            href={`/patients/${row.patient_id}`}
                                            as={`/patients/${row.patient_id}`}
                                            key={row.patient_id}
                                            passHref
                                          >
                                            <Button
                                              variant="outlined"
                                              size="small"
                                              className={classes.btnagn}
                                              endIcon={<SendIcon />}
                                            >
                                              Agendar
                                            </Button>
                                          </Link>
                                        </Grid>
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </Grid>
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
            {/*     <TablePagination
            labelRowsPerPage="Pacientes:"
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={data.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
            <Container style={{ color: "#BBF0E8", backgroundColor: "#BBF0E8" }}>
              .
            </Container>
          </Paper>
        </Container>
      </CssBaseline>
    </LayoutSecondary>
  );
};
export default withAuth(PatientsList);
