import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/accounts';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUser().then(data => {
      console.log('user details in dashboard are', data);
      setUserData(data)
    })
  }, [])

  const { userid } = useParams();
  const logout = (userid) => {
    navigate(`/login`, { replace: true });
  }
  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: 'eva:home-fill',
      link: `/${userid}/connect-social/app`,
    },
    {
      label: 'Profile',
      icon: 'eva:person-fill',
      link: `/${userid}/connect-social/profile`,
    },
    // {
    //   label: 'Settings',
    //   icon: 'eva:settings-2-fill',
    //   link: '/settings',
    // },
  ];
  
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

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userData.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userData.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose} to={option.link} component={RouterLink}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
          
        </MenuItem>
      </Popover>
    </>
  );
}
