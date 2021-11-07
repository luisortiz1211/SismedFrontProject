import Loading from "@/components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { Backdrop, Button, Fade, Grid, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { fetcher } from "src/api/utils";
import useSWR from "swr";
import * as yup from "yup";

const schema = yup.object().shape({
  ci: yup
    .string()
    .length(10, "Deben ser 10 dígitos")
    .matches(/^[0-9]+$/, "Ingrese solo números, exactamente 10 dígitos")
    .max(10, "Deben ser 10 dígitos"),
});
const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#60CCD9",
    color: "#414A4F",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#4A92A8",
    },
  },
  textField: {
    border: "15px",
    color: "#414A4F",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mpaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SearchPatient = () => {
  const classes = useStyles();
  const [wordSearch, setWordSearch] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar("");
  const [open, setOpen] = useState(false);

  const { data, error } = useSWR("/searching/" + wordSearch, fetcher);
  console.log("Respuesta", data);

  const onSearch = async (values) => {
    setWordSearch(values.ci);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (error) {
    enqueueSnackbar("No se encuentra al paciente", {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  }
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <form onSubmit={handleSubmit(onSearch)}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          style={{ paddingTop: "10px" }}
        >
          <Grid item>
            <Controller
              name="ci"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Buscar paciente"
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  error={!!errors.ci}
                />
              )}
            />
            <p>{errors.ci?.message}</p>
          </Grid>
          <Grid item>
            {" "}
            <IconButton
              type="submit"
              aria-label="search"
              onClick={handleOpen}
              style={{
                textTransform: "none",
                position: "realive",
                bottom: "5px",
              }}
              className={classes.submit}
            >
              <SearchIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
        </Grid>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.mpaper}>
              {data.length === 1 ? <p>{data.ci + "---"}</p> : "No se encontro "}

              <Button
                variant="contained"
                type="submit"
                size="small"
                onClick={handleClose}
                style={{ backgroundColor: "#60CCD9", color: "#092435" }}
              >
                Ver historia clínica
              </Button>
            </div>
          </Fade>
        </Modal>
      </form>
    </>
  );
};
export default SearchPatient;
