import Loading from "@/components/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Backdrop,
  Button,
  Fade,
  Grid,
  Modal,
  CssBaseline,
} from "@material-ui/core";
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
import {
  Card,
  Box,
  CardActions,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import Link from "next/link";
import { useAuth } from "src/contexts/auth";

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
  btncancelar: {
    display: "flex",
    justifyAlign: "right",
    color: "#ffff",
    backgroundColor: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#092435",
    },
  },
  btnhistory: {
    display: "flex",
    justifyAlign: "right",
    backgroundColor: "#60CCD9",
    color: "#092435",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#BBF0E8",
      color: "#092435",
    },
  },
}));

const SearchToRequest = () => {
  const classes = useStyles();
  const { user } = useAuth();

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
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
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
      <CssBaseline>
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
                {data.length === 1 ? (
                  <>
                    <Card sx={{ minWidth: 275 }} style={{ color: "#092435" }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {bull} # Historia Clínica : {data[0].id}
                        </Typography>
                        <Divider
                          light
                          style={{
                            backgroundColor: "#60CCD9",
                            color: "#092435",
                          }}
                        />
                        <Typography variant="h6" component="div">
                          {bull}
                          {data[0].name} / {data[0].lastName}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {bull}Ci : {data[0].ci}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {bull}Fecha de nacimiento : {data[0].birthay}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {bull}Email : {data[0].email}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {bull}Celular : {data[0].movil}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {bull}Telf fijo : {data[0].landline}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {bull}Dirección : {data[0].address}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {bull}Nacionalidad : {data[0].nationality}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                          {bull}Ciudad : {data[0].city}
                        </Typography>
                        <Divider
                          light
                          style={{
                            backgroundColor: "#60CCD9",
                            color: "#092435",
                          }}
                        />
                      </CardContent>
                      <CardActions>
                        {user.roleUser === "ROLE_ASSISTENT" ? (
                          <>
                            <Grid
                              container
                              direction="row"
                              justifyContent="space-around"
                              alignItems="center"
                            >
                              <Grid item>
                                <Link
                                  href={`/patients/${data[0].id}`}
                                  as={`/patients/${data[0].id}`}
                                  key={data[0].id}
                                  passHref
                                >
                                  <Button
                                    size="small"
                                    variant="contained"
                                    className={classes.btnhistory}
                                  >
                                    Agendar
                                  </Button>
                                </Link>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          ""
                        )}
                        <Grid item>
                          <Button
                            size="small"
                            variant="contained"
                            type="submit"
                            onClick={handleClose}
                            className={classes.btncancelar}
                          >
                            Cancelar
                          </Button>
                        </Grid>
                      </CardActions>
                    </Card>
                  </>
                ) : (
                  <Card sx={{ minWidth: 275 }} style={{ color: "#092435" }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        No se encontro el Ci {bull} intente nuevamente.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        type="submit"
                        onClick={handleClose}
                        className={classes.btncancelar}
                      >
                        Cancelar
                      </Button>
                    </CardActions>
                  </Card>
                )}
              </div>
            </Fade>
          </Modal>
        </form>
      </CssBaseline>
    </>
  );
};
export default SearchToRequest;
