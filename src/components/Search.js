import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import useSWR from "swr";
import { fetcher } from "src/api/utils";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.id,
});

export default function Filter() {
  const { data, error } = useSWR(`/patients`, fetcher);
  console.log("pacientes a buscar", data);
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
    <Autocomplete
      id="filter-demo"
      options={data.data.forEach(ci)}
      getOptionLabel={(option) => option.id}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Custom filter" />}
    />
  );
}
