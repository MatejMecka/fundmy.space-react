import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function UserInfo(props) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
      <Grid item xs={12}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
    />
    </Grid>
    <Grid item xs={12} sm={6}>
            <TextField
            autoComplete="fname"
            name="first_name"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First name"
            autoFocus
            />
    </Grid>
    <Grid item xs={12} sm={6}>
        <TextField
        variant="outlined"
        required
        fullWidth
        id="lastName"
        label="Last name"
        name="last_name"
        autoComplete="lname"
        />
    </Grid>
      </Grid>
    </React.Fragment>
  );
}