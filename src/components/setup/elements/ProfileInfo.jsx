import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function ProfileInfo(props) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="short_description"
            name="short_description"
            label="Short description"
            helperText="Write a sentence about yourself"
            fullWidth
            onChange={props.onChange('short_description')}
            value={props.values.short_description}
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            multiline
            label="Biography"
            helperText="Write everything about yourself here"
            fullWidth
            rows={4}
            onChange={props.onChange('description')}
            value={props.values.description}
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="twitter_profile"
            name="twitter_profile"
            label="Twitter Profile"
            helperText="What's your Twitter username?"
            fullWidth
            value={props.values.twitter_profile}
            onChange={props.onChange('twitter_profile')}
            autoComplete="shipping address-level2"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}