import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
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

export default function MessagePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/:userid/connect-social', { replace: true });
  };
  return (
    <>
      <Helmet>
        <title> Message | ConnectSocial </title>
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
              Message Page
            </LoadingButton>
            <StyledAccount sx={{ mt: 2, mb: 2 }}>
              <Avatar src={account.photoURL} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {account.displayName}
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
