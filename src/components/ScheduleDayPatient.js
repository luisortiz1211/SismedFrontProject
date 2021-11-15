import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import SearchPatient from "@/components/SearchPatient";
import Title from "@/components/Title";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import BallotIcon from "@material-ui/icons/Ballot";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import * as yup from "yup";
import { CssBaseline } from "@material-ui/core";
import { useAuth } from "src/contexts/auth";

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
    maxHeight: 440,
  },

  btnView: {
    backgroundColor: "#60CCD9",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));
const schema = yup.object().shape({
  ci: yup
    .string()
    .length(10, "Deben ser 10 dígitos")
    .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 10 dígitos")
    .max(10, "Deben ser 10 dígitos"),
});

const MedicalHistoryDetails = ({ date }) => {
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
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const { data, error } = useSWR(`/patients/${date}/schedule_days`, fetcher);
  console.log("lista de citas por paciente", data);

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
          <Paper elevation={6} style={{ margin: "20px" }}>
            <AnnounTitle>Historial de citas del paciente </AnnounTitle>

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
                      const colorLine = row.patient_id;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-2}
                          key={row.id}
                        >
                          {" "}
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
                                          href={`/scheduleDay/schedule/${row.id}`}
                                          passHref
                                        >
                                          {user.roleUser !== "ROLE_MEDIC" ? (
                                            <Button
                                              variant="outlined"
                                              size="small"
                                              className={classes.btnView}
                                              disabled={
                                                row.scheduleDayState ===
                                                "atendido"
                                              }
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
          </Paper>
        </Container>
      </CssBaseline>
    </LayoutSecondary>
  );
};
export default MedicalHistoryDetails;
