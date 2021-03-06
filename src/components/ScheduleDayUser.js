import ChargeInformation from "@/components/ChargeInformation";
import Loading from "@/components/Loading";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import { CssBaseline } from "@material-ui/core";

const columns = [
  {
    id: "id",
    label: "N°",
    minWidth: 30,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "name",
    label: "Nombres",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "lastName",
    label: "Apellido",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "email",
    label: "Correo",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "17px",
  },
  {
    id: "availableStatus",
    label: "Estado",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "roleUser",
    label: "Rol",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
    fontSize: "16px",
  },
  {
    id: "botonSelect",
    label: "",
    minWidth: 100,
    backgroundColor: "#BBF0E8",
    align: "left",
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
  btnschedule: {
    textTransform: "none",
    background: "#60CCD9",
    color: "#092435",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

//mostrar lista de usuarios para agendamiento
const ScheduleDayUser = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const { data, error } = useSWR(`/users`, fetcher);
  //console.log("listas de medicos para agendamiento", data);
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
    <>
      <CssBaseline>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((array) => {
                        const value = row[array.id];
                        return row.roleUser === "ROLE_MEDIC" ? (
                          <TableCell key={array.id} align={array.align}>
                            {array.id === "availableStatus"
                              ? row.availableStatus === false
                                ? "Desactivado"
                                : "Activo"
                              : ""}
                            {array.id === "roleUser"
                              ? row.roleUser === "ROLE_MEDIC"
                                ? "Médico"
                                : "No asignado"
                              : value}

                            {array.label == "" ? (
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Link
                                    //direccionar para asignar un horario a un paciente
                                    href={`/patients/${id}/scheduleDay/${row.id}`}
                                    as={`/patients/${id}/scheduleDay/${row.id}`}
                                    passHref
                                  >
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      className={classes.btnschedule}
                                      endIcon={<ScheduleSendIcon />}
                                      disabled={row.availableStatus === false}
                                    >
                                      Ver horario
                                    </Button>
                                  </Link>
                                </Grid>
                              </Grid>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        ) : (
                          ""
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
      </CssBaseline>
    </>
  );
};
export default ScheduleDayUser;
