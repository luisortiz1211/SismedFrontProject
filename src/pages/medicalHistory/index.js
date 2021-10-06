import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
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
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import SearchBar from "material-ui-search-bar";
import BallotIcon from "@material-ui/icons/Ballot";

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
  btnView: {
    backgroundColor: "#60CCD9",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
});

const index = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState(columns);
  const [searched, setSearched] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, error } = useSWR(`/patients`, fetcher);
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

  const requestSearch = (searchedVal) => {
    const filteredRows = data.data.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

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
        <Paper elevation={6} style={{ margin: "20px" }}>
          <SearchBar
            onChange={() => console.log("onChange")}
            onRequestSearch={() => console.log("onRequestSearch")}
            style={{
              margin: "0 auto",
              maxWidth: 800,
            }}
            //buscar paciente en construcción
          />
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
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
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
export default index;
