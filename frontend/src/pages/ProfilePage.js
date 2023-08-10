import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, Avatar, Container, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// mock
import account from '../_mock/accounts';
// components
import Logo from '../components/logo';
// sections
import { ProfileForm } from '../sections/profile';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const { userid } = useParams();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUser().then(data => {
      // console.log('user details in dashboard are', data);
      setUserData(data)
    })
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:9000/auth/get-user/${userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('data', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };


  const handleClick = () => {
    navigate(`/${userid}/connect-social/app`, { replace: true });
  };
  return (
    <>
      <Helmet>
        <title> Profile | ConnectSocial </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
              Back
            </LoadingButton>
            <StyledAccount sx={{ mt: 2, mb: 2 }}>
              <Avatar src={account.photoURL} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {userData.username}
                </Typography>
              </Box>
            </StyledAccount>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Edit Profile
              </Typography>
            </Divider>

            <ProfileForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
