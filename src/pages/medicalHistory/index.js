import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
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
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import BallotIcon from "@material-ui/icons/Ballot";
import SendIcon from "@mui/icons-material/Send";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
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
    minWidth: 60,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "civilStatus",
    label: "Estado",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 80,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "movil",
    label: "Movil",
    minWidth: 80,
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
    minWidth: 80,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "17px",
  },
  {
    id: "botonSelect",
    label: "_",
    minWidth: 50,
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
  button: {
    fontSize: "10px",
  },
  btnView: {
    backgroundColor: "#60CCD9",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  textField: {
    paddingBottom: "15px",
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

  const [wordSearch, setWordSearch] = useState("");
  const [dataSearchPatient, setDataSearchPatient] = useState([]);

  const {
    data: patientsAllData,
    error: error2,
    mutate: mutate2,
  } = useSWR(`/patients/all`, fetcher);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const { data, error } = useSWR(`/patients`, fetcher);
  console.log("lista de pacientes en el sistema", data);

  const handleChange = (event) => {
    setWordSearch(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /*  useEffect(() => {
    if (patientsAllData) {
      const listpatients = [];
      patientsAllData.data.map((patient) => {
        patient.ci === wordSearch ? listpatients.push(patient) : "";
      });
      setDataSearchPatient(listpatients);
    }
  }, [wordSearch]);
*/

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
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Stack spacing={2} sx={{ width: 300 }}>
                {" "}
                <Autocomplete
                  freeSolo
                  id="patientsSearch"
                  disableClearable
                  options={patientsAllData.data.map((option) =>
                    option.ci.toString()
                  )}
                  renderInput={(params) => (
                    <TextField
                      id="wordSearch"
                      {...params}
                      value={wordSearch}
                      label="Cedula paciente"
                      onChange={handleChange}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      className={classes.textField}
                      //{...register("wordSearch")}
                      error={!!errors.ci}
                      helperText={errors.ci?.message}
                    />
                  )}
                />
              </Stack>
              <Button
                type="submit"
                size="small"
                style={{
                  textTransform: "none",
                  border: "10px",
                  color: "#4A92A8",
                }}
              >
                Ver...
              </Button>
            </Grid>
          </Grid>
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
      </Container>
    </LayoutSecondary>
  );
};
export default MedicalHistoryDetails;
