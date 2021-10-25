import Loading from "@/components/Loading";
import { fetcher } from "src/api/utils";
import { Button, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import ChargeInformation from "./ChargeInformation";

const columns = [
  {
    id: "created_at",
    label: "Fecha de ingreso",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "nameImageRecipie",
    label: "Pedido de imagen",
    minWidth: 15,
    backgroundColor: "#BBF0E8",
    align: "center",
    fontSize: "16px",
  },
  {
    id: "codimage",
    label: "Cantidad",
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
}));

const ImageRecipieList = ({ patientID }) => {
  const classes = useStyles();
  const router = useRouter();
  const { pid, recipie_id } = router.query;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, error } = useSWR(
    `/exploration_patients/${recipie_id}/image_recipies`,
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
export default ImageRecipieList;
