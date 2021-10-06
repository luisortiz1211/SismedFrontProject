import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { fetcher } from "src/api/utils";
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
import AddIcon from "@material-ui/icons/Add";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import { useAuth } from "src/contexts/auth";

const columns = [
  {
    id: "schedule_id",
    label: "N°",
    minWidth: 30,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "userDay",
    label: "Día",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "startTime",
    label: "Hora inicio",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "finishTime",
    label: "Hora fin",
    minWidth: 50,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "availableStatus",
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
  button: {
    margin: theme.spacing(3),
  },
  btnadd: {
    color: "#092435",
    backgroundColor: "#fff",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnedit: {
    color: "#092435",
    backgroundColor: "#60CCD9",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const index = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
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

  const { data, error } = useSWR(`/users/${id}/schedule_users`, fetcher);
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
    <LayoutSecondary>
      <CssBaseline />
      <Container maxWidth="lg" direction="row">
        <Title>
          <LibraryBooksIcon
            style={{
              color: "#092435",
              fontSize: 35,
              position: "relative",
              top: "6px",
            }}
          />
          {"  "}Agenda de médico
        </Title>
        <Paper
          className={classes.root}
          elevation={6}
          style={{ margin: "20px" }}
        >
          <AnnounTitle>
            Horarios establecidos en el usuario (Agregar y modificar){" "}
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
                      {user.roleUser === "ROLE_ADMIN" ? (
                        column.id === "botonSelect" ? (
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Link
                              href={`/userSchedule/schedulenew/${id}/`}
                              as={`/userSchedule/schedulenew/${id}/`}
                              passHref
                            >
                              <Button
                                variant="outlined"
                                size="small"
                                className={classes.btnadd}
                                startIcon={<AddIcon />}
                              >
                                Añadir
                              </Button>
                            </Link>
                          </Grid>
                        ) : (
                          "_"
                        )
                      ) : (
                        ""
                      )}
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
                        tabIndex={-1}
                        key={row.schedule_id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id && typeof value === "number"
                                ? column.id === "availableStatus"
                                  ? row.availableStatus === 0
                                    ? "Disponible"
                                    : "Asignado"
                                  : value
                                : value}

                              {user.roleUser === "ROLE_ADMIN" ? (
                                column.id === "botonSelect" &&
                                column.label == "" ? (
                                  <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Grid item>
                                      <Link
                                        //es el numero de id en horarios usuarios
                                        href={`/userSchedule/scheduleupdate/${row.schedule_id}`}
                                      >
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          className={classes.btnedit}
                                        >
                                          <BorderColorIcon />
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
    </LayoutSecondary>
  );
};
export default index;
