import Loading from "@/components/Loading";
import { Emergencycontacts } from "@/lib/emergencycontact";
import { Button, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import ChargeInformation from "./ChargeInformation";

const columns = [
  {
    id: "nameContact",
    label: "Nombre de contacto",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "movil",
    label: "Celular",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "landline",
    label: "Telf. fijo",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "relationShip",
    label: "Parentesco",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "bloodType",
    label: "Tipo de sangre",
    minWidth: 15,
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
    minHeight: 250,
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
  btnew: {
    textTransform: "none",
    background: "#60CCD9",
    color: "#092435",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  btnDelete: {
    backgroundColor: "#fff",
    color: "#CB3234",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
}));

const EmergencyContactList = ({ patientID }) => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (contact) => {
    try {
      await Emergencycontacts.deleteContact(
        `${id}`,
        enqueueSnackbar("Contacto eliminado", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Error al eliminar", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        //console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  const { data, error } = useSWR(
    `/patients/${patientID}/emergency_contacts`,
    fetcher
  );
  if (error)
    return (
      <div>
        <ChargeInformation />
      </div>
    );
  if (!data) return <Loading />;
  return (
    <Container maxWidth="lg" direction="row">
      <TableContainer className={classes.container}>
        <Table component="span" stickyHeader aria-label="sticky table">
          <TableHead component="span">
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
                      <Grid item>
                        <Link href={`/physicalExam/${id}`} passHref>
                          <Button
                            variant="outlined"
                            size="small"
                            className={classes.btnew}
                          >
                            Nuevo
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody component="span">
            {data.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id && typeof value === "number"
                            ? value
                            : value}{" "}
                          {column.id === "botonSelect" && column.label == "" ? (
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Grid item>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  className={classes.btnDelete}
                                  onClick={() => handleDelete(`${data.id}`)}
                                >
                                  <DeleteForeverIcon />
                                </Button>
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
    </Container>
  );
};
export default EmergencyContactList;
