import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import withAuth from "@/hocs/withAuth";
import { Button, Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Link from "next/link";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
import { useAuth } from "src/contexts/auth";
import useSWR from "swr";

const columns = [
  {
    id: "id",
    label: "N° ",
    maxWidth: 10,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },

  {
    id: "created_at",
    label: "Fecha registro ",
    maxWidth: 10,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },

  {
    id: "patient_id",
    label: "# Historia clínica",
    minWidth: 30,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "scheduleDay",
    label: "Día",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },

  {
    id: "scheduleTime",
    label: "Inicio turno",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "userAssigned",
    label: "ID Médico",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "scheduleDayState",
    label: "Estado",
    minWidth: 50,
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
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
  },
  container: {
    minHeight: 440,
  },
  btn: {
    background: "#60CCD9",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const PatientShift = () => {
  const classes = useStyles();
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/schedule_days/all`, fetcher);
  //console.log("Citas agenda", data);
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
      <Container maxWidth="lg">
        <Title>
          {" "}
          <ListAltIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />{" "}
          Pacientes agendados
        </Title>

        <Paper elevation={6} style={{ margin: "20px" }}>
          <AnnounTitle>Registrar o cancelar agendamiento</AnnounTitle>

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
                        tabIndex={-2}
                        key={row.id}
                        style={
                          row.scheduleDayState === "atendido"
                            ? { backgroundColor: "#FFE082" }
                            : row.scheduleDayState === "pendiente"
                            ? { backgroundColor: "#FFCDD2" }
                            : row.scheduleDayState === "registrado"
                            ? { backgroundColor: "#C5E1A5" }
                            : { backgroundColor: "#FFF" }
                        }
                      >
                        {""}
                        <>
                          {columns.map((array) => {
                            const value = row[array.id];
                            return (
                              <TableCell key={array.id} align={array.align}>
                                
                                
                                
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
                                        href={`/scheduleDay/schedule/${row.schedule_day}`}
                                        passHref
                                      >
                                        {user.roleUser !== "ROLE_MEDIC" ? (
                                          <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.btn}
                                            disabled={
                                              row.scheduleDayState ===
                                              "atendido"
                                            }
                                            endIcon={<KeyboardArrowRightIcon />}
                                          >
                                            Continuar
                                          </Button>
                                        ) : (
                                          ""
                                        )}
                                      </Link>
                                    </Grid>
                                  </Grid>
                                ) : (
                                  value
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
          <Container style={{ color: "#BBF0E8", backgroundColor: "#BBF0E8" }}>
            .
          </Container>
          {/*   <TablePagination
            labelRowsPerPage="Horarios:"
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={data.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Container>
    </LayoutSecondary>
  );
};
export default withAuth(PatientShift);
