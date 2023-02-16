import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// import { Card, Checkbox, Grid, TextField, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  // username: '',          //comment - original data saved for backup
  remember: true,
  
  // role: '',              //comment - previously for role
  firstName: '',
  lastName: '',
  mobileNumber: '',
  designation: '',
  organizationName: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be 8 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [selectedRole, setSelectedRole] = useState("");                  //comment - previously for role

  const handleFormSubmit = (values) => {
    // values.role = selectedRole;                                          //comment - previously for role
    setLoading(true);

    try {
      // register(values.email, values.username, values.password);          //comment - original data saved for backup
      // register(values.email, values.password, values.role, values.firstName, values.lastName, values.mobileNumber, values.designation);          //comment - previously for role
      register(values.email, values.password, values.firstName, values.lastName, values.mobileNumber, values.designation, values.organizationName, );
      navigate('/');
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // const handleRoleChange = (e) => {                                        //comment - previously for role
  //   setSelectedRole(e.target.value);
  // }
  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    {/* <TextField                              //comment - original data saved for backup
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    /> */}
                    {/* <FormControl                                      //comment - previously for role
                      fullWidth
                      size="small"
                      sx={{ mb: 3 }}
                    >
                      <InputLabel id="role-select-label">Role</InputLabel>
                      <Select
                        labelId="role-select-label"
                        id="role-select"
                        value={selectedRole}
                        label="Role"
                        onChange={(e) => handleRoleChange(e)}
                      >
                        <MenuItem value="candidate">Candidate</MenuItem>
                        <MenuItem value="recruiter">Recruiter</MenuItem>
                      </Select>
                    </FormControl> */}
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="organizationName"
                      label="Organization Name *"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.organizationName}
                      onChange={handleChange}
                      helperText={touched.organizationName && errors.organizationName}
                      error={Boolean(errors.organizationName && touched.organizationName)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="firstName"
                      label="First Name *"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.firstName}
                      onChange={handleChange}
                      helperText={touched.firstName && errors.firstName}
                      error={Boolean(errors.firstName && touched.firstName)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="lastName"
                      label="Last Name *"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.lastName}
                      onChange={handleChange}
                      helperText={touched.lastName && errors.lastName}
                      error={Boolean(errors.lastName && touched.lastName)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      name="mobileNumber"
                      label="Mobile Number *"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.mobileNumber}
                      onChange={handleChange}
                      helperText={touched.mobileNumber && errors.mobileNumber}
                      error={Boolean(errors.mobileNumber && touched.mobileNumber)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email *"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password *"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="designation"
                      label="Designation *"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.designation}
                      onChange={handleChange}
                      helperText={touched.designation && errors.designation}
                      error={Boolean(errors.designation && touched.designation)}
                      sx={{ mb: 3 }}
                    />
                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Regiser
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
