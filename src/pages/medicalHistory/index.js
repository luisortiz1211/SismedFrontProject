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

const columns = [
  {
    id: "patient_id",
    label: "N°",
    minWidth: 5,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "name",
    label: "Nombres",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "lastName",
    label: "Apellidos",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "sex",
    label: "Sexo",
    minWidth: 40,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },

  {
    id: "email",
    label: "Email",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "movil",
    label: "Movil",
    minWidth: 40,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "address",
    label: "Dirección",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "city",
    label: "Ciudad",
    minWidth: 40,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "botonSelect",
    label: "_",
    minWidth: 40,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
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

const MedicalHistoryDetails = () => {
  const classes = useStyles();

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

  const { data, error } = useSWR(`/patients/all`, fetcher);
  console.log("lista de pacientes en el sistema", data);

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
          <BallotIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />{" "}
          {"  "}Historia clínica
        </Title>
        <>
          <SearchPatient />
        </>
        <Paper elevation={6} style={{ margin: "20px" }}>
          <AnnounTitle>Visualizar la historia médica del paciente</AnnounTitle>
       
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
                        key={row.patient_id}
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

                                {column.id === "botonSelect" &&
                                column.label == "_" ? (
                                  <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Grid item>
                                      <Link
                                        href={`/medicalHistory/${row.patient_id}`}
                                        as={`/medicalHistory/${row.patient_id}`}
                                        key={row.patient_id}
                                        passHref
                                      >
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          className={classes.btnView}
                                          endIcon={<SendIcon />}
                                        >
                                          Ver
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
    </LayoutSecondary>
  );
};
export default MedicalHistoryDetails;
