import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField } from '@mui/material';
import { themeColors } from '../../components/MatxTheme/themeColors';
import { Box, styled } from '@mui/system';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const ErrorMsg = styled(Box)(() => ({
    color: '#FF3D57',
    fontSize: '0.75rem',
    letterSpacing: '0.03333em',
    margin: '3px 14px 0px',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital change password credentials
const initialValues = {
  password: '',
  confirmPassword: '',
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const textError = themeColors.errorColor;
  const [loading, setLoading] = useState(false);
  const [confirmFlag, setConfirmFlag] = useState(false);

  const { confirmPassword } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    setConfirmFlag(false);
    try {
        if( values.password === values.confirmPassword) {
          navigate('/');
          await confirmPassword(values.password);
        } else {
          setConfirmFlag(true);
          values.password  = "";
          values.confirmPassword = "";
          setLoading(false);
        }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="New Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                      sx={{ mb: 1.5 }}
                    />

                    {confirmFlag === true && <ErrorMsg textcolor={textError}>Password doesn't matched</ErrorMsg>}
                    
                    <LoadingButton 
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                    >
                        Save Changes
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default ResetPassword;