import AnnounTitle from "@/components/AnnounTitle";
import ChargeInformation from "@/components/ChargeInformation";
import LayoutSecondary from "@/components/LayoutSecondary";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
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
import BorderColorIcon from "@material-ui/icons/BorderColor";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Link from "next/link";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
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
    id: "name",
    label: "Nombres",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "lastName",
    label: "Apellido",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "email",
    label: "Correo",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "availableStatus",
    label: "Estado",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "roleUser",
    label: "Tipo",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "botonSelect",
    label: "",
    minWidth: 100,
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
    maxHeight: 440,
  },

  button: {
    fontSize: "10px",
  },
  btnedit: {
    background: "#60CCD9",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, error } = useSWR(`/users`, fetcher);
  console.log("lista de usuarios", data);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        <Container maxWidth="lg" direction="row">
          <Title>
            <GroupAddIcon
              style={{
                color: "#092435",
                fontSize: 40,
                position: "relative",
                top: "9px",
              }}
            />{" "}
            {"  "}
            Usuarios
          </Title>

          <Paper
            className={classes.root}
            elevation={6}
            style={{ margin: "20px" }}
          >
            <AnnounTitle>Usuarios registrados en el sistema</AnnounTitle>
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
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const colorLine = row.id;
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "roleUser"
                                  ? row.roleUser === "ROLE_MEDIC"
                                    ? "Médico"
                                    : row.roleUser === "ROLE_ASSISTENT"
                                    ? "Asistente"
                                    : row.roleUser === "ROLE_ADMIN"
                                    ? "Administrador"
                                    : "No asignado"
                                  : value}

                                {column.id === "availableStatus"
                                  ? row.availableStatus === false
                                    ? "Desactivado"
                                    : "Activo"
                                  : ""}

                                {column.label == "" ? (
                                  <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                  >
                                    <Grid item>
                                      <Link
                                        href={`/users/${row.id}`}
                                        as={`/users/${row.id}`}
                                        key={row.id}
                                        passHref
                                      >
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          className={classes.btnedit}
                                          startIcon={<BorderColorIcon />}
                                        >
                                          {" "}
                                          Editar
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
              labelRowsPerPage="Usuarios:"
              rowsPerPageOptions={[10, 25]}
              component="div"
              count={data.length}
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
export default UserList;
