import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
const Profile = () => {
  const [updateValue, setUpdateValue] = useState({
    firstName: 'firstName',
    lastName: 'lastName',
    designation: 'designation',
    mobileNumber: 'mobileNumber',
    emailAddress: 'emailAddress',
  })
  const currentUserAPI = (() => {
    const axiosCall = axios({
      method: "get",
      url: 'http://localhost:5000/v1/users/currentUser',
      headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') },
    }).then((response) => {
      setUpdateValue({ ...response.data.user })
      console.log(response);
    });
    axiosCall.catch((e) => {
      alert(e)
    });
  });
  useEffect(() => {
    currentUserAPI();
  }, []);

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUpdateValue({ ...updateValue, [name]: value })
    console.log(e, value, name);
  }

  function cancelButton(e) {
    e.preventDefault();
    currentUserAPI();
  }

  function profileSumbit(e) {
    e.preventDefault();
    const axiosCall = axios({
      method: "patch",
      url: 'http://localhost:5000/v1/users/currentUser',
      data: {
        firstName: updateValue.firstName,
        lastName: updateValue.lastName,
        designation: updateValue.designation,
        mobileNumber: updateValue.mobileNumber,
        emailAddress: updateValue.emailAddress,
      },
      headers: { Authorization: "Bearer " + localStorage.getItem('accessToken') },
    }).then((response) => {
      alert('Update Done');
    });
    axiosCall.catch((e) => {
      alert(e)
    });
  }
  return (
    <Grid>
      <Card style={{ padding: "20px 5px", margin: "0 auto" }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            Basic Information
          </Typography>
          <form>
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} item>
                <TextField placeholder="Enter first name" onChange={handleInput} label="First Name" variant="outlined" name="firstName" value={updateValue.firstName} fullWidth required />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField placeholder="Enter last name" onChange={handleInput} label="Last Name" variant="outlined" name="lastName" value={updateValue.lastName} fullWidth required />
              </Grid>
              <Grid xs={12} sm={6} item  >
                <TextField type="email" placeholder="Enter email" onChange={handleInput} label="Email" variant="outlined" name="emailAddress" value={updateValue.emailAddress} InputProps={{
                  readOnly: true,
                }} fullWidth required />
              </Grid>
              <Grid xs={12} sm={6} item >
                <TextField type="number" placeholder="Enter phone number" onChange={handleInput} label="Phone" variant="outlined" name="mobileNumber" value={updateValue.mobileNumber} fullWidth required />
              </Grid>

              {/* //backup */}
              <Grid xs={12} sm={6} item>
                <TextField placeholder="Enter Organization" label="Organization" onChange={handleInput} variant="outlined" value={updateValue.Designation} InputProps={{
                  readOnly: true,
                }} fullWidth required />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField placeholder="Enter Designation" label="Designation" onChange={handleInput} variant="outlined" name="designation" value={updateValue.designation} fullWidth required />
              </Grid>

              {/* //backup */}
              {/* <Grid xs={12} sm={6} item>
                <TextField placeholder="Enter Role" label="Role" onChange={handleInput} variant="outlined" InputProps={{
                  readOnly: true,
                }} fullWidth required />
              </Grid> */}

              <Grid xs={5} sm={2} item >
                <Button type="button" variant="contained" color="primary" onClick={cancelButton} >Cancel</Button>
              </Grid>
              <Grid xs={5} sm={2} item >
                <Button type="button" variant="contained" onClick={profileSumbit} color="primary" >Submit</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Profile;
