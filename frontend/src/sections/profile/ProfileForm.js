import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Stack, FormControlLabel, Typography, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import { set } from 'lodash';

// ----------------------------------------------------------------------

export default function ProfileForm() {
  const { userid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser().then(data => {
      console.log('inside useeffect data', data);
      setUserData(data)
      setPlatforms(data.socialMediaAccess)
    })
  }, [])

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({});
  const [platforms, setPlatforms] = useState([]);


  const handleClick = () => {
    navigate(`/${userid}/connect-social/app`, { replace: true });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleCheckboxChange = (index) => (event) => {
    const newPlatforms = [...platforms];
    newPlatforms[index].checked = event.target.checked;
    setPlatforms(newPlatforms);
  };

  const handleAccessTokenChange = (event, index) => {
    const newPlatforms = [...platforms];
    newPlatforms[index].accessToken = event.target.value;
    setPlatforms(newPlatforms);
  };

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

  const updateUser = async () => {
    console.log('in save', platforms)
    try {
      platforms.forEach(platform => delete platform._id)
      console.log('platform', platforms);
      const updatedData = {
        socialMediaAccess: platforms
      }
      console.log('updatedData',updatedData);
      const response = await fetch(`http://localhost:9000/auth/get-user/${userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData) 
      });
      const data = await response.json();
      window.location.reload();
      console.log('data', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {userData &&
        <>
          <Stack spacing={3}>
            <Typography variant="h6" sx={{ mt: 5 }}>
              Personal Information
            </Typography>

            <TextField fullWidth name="username" value={userData.username} disabled/>
            <TextField fullWidth name="email" value={userData.email} disabled />

          </Stack>

          <Stack spacing={3}>
            <Typography variant="h6" sx={{ mt: 5 }}>
              Social Media Accounts
            </Typography>

            {platforms.map((platform, index) => {
              console.log('platform', platform.platform);
          return (
            <Stack direction="row" alignItems="center" justifyContent="space-between" key={platform.platform}>
              <FormControlLabel
                control={<Checkbox checked={platform.checked} onChange={handleCheckboxChange(index)} />}
                label={`${platform.platform}:`}
              />
              <TextField
                fullWidth
                disabled={!platform.checked}
                defaultValue={platform.accessToken}
                variant="outlined"
                margin="normal"
                onChange={(e) => handleAccessTokenChange(e, index)}
              />
            </Stack>
          )
        })}

          </Stack>

          <Stack spacing={3} sx={{ mt: 5, mb: 10 }}>
            {/* <TextField
              disabled
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}

              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> */}
          </Stack>

          <Stack spacing={2} direction="row">
            <LoadingButton fullWidth size="large" type="submit" variant="contained" color="success" onClick={updateUser}>
              Save Changes
            </LoadingButton>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" color="error" onClick={handleClick}>
              Discard
            </LoadingButton>

          </Stack>
        </>}

    </>
  );
}