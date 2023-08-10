import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmail } from 'validator'
// @mui
import { Stack, FormControlLabel, Typography, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { isEmpty } from 'lodash';
//import { addUser } from 'src/services/user-service.js';

// ----------------------------------------------------------------------

export default function SignupForm() {
  const closeForm = (userid) => {
    navigate(`/${userid}/connect-social/app`, { replace: true });
  }

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
    password: '',
  });

  const [platforms, setPlatforms] = useState([
    { platform: 'Medium', accessToken: '', checked: false },
    { platform: 'Instagram', accessToken: '', checked: false },
  ]);

  const handleCheckboxChange = (index) => (event) => {
    const newPlatforms = [...platforms];
    newPlatforms[index].checked = event.target.checked;
    setPlatforms(newPlatforms);
  };

  const handleAccessTokenChange = (index) => (event) => {
    const newPlatforms = [...platforms];
    newPlatforms[index].accessToken = event.target.value;
    setPlatforms(newPlatforms);
  };

  const saveUser = async (event) => {
    const user = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      socialMediaAccess: platforms
    }
    
    // send user to backend
    if(isEmpty(formValues.email) || isEmpty(formValues.password) || isEmpty(formValues.username)){
      alert('Please fill all the required fields.');
      event.preventDefault();
    } else {
      if (formValues._id) {
        event.preventDefault();
        user._id = formValues._id;
        return;
      } else {
        await createUser(user);
        return;
      }
    }
    
  }

  // const savePosts = async (accessToken, userid) => {
  //   try {
  //     const response = await fetch(`http://localhost:9000/medium/create?=${accessToken}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //     })
  //     const data = await response.json();
      
  //     const post = {
  //       userId: userid,
  //       platform: 'Medium',
  //       title: data.name,
  //       content: data.des
  //     }

  //     const postResponse = await fetch('http://localhost:9000/post/create', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(post)
  //     })

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const createUser = async (user) => {
    try {
      const response = await fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const data = await response.json();
      console.log(data._id);
      closeForm(data._id);
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ mt: 5 }}>
          Personal Information
        </Typography>

        <TextField fullWidth id="username" name="username" label="Username" value={formValues.username} onChange={handleInputChange} required />
        <TextField fullWidth id="email" name="email" label="Email address" required error={!isEmpty(formValues.email) && !isEmail(formValues.email)}
        value={formValues.email} onChange={handleInputChange} />

      </Stack>

      <Stack spacing={3}>
        <Typography variant="h6" sx={{ mt: 5 }}>
          Social Media Accounts
        </Typography>

        {platforms.map((platform, index) => (
          <Stack direction="row" alignItems="center" justifyContent="space-between" key={platform.platform}>
            <FormControlLabel
              control={<Checkbox checked={platform.checked} onChange={handleCheckboxChange(index)} />}
              label={`${platform.platform}:`}
            />
            <TextField
              fullWidth
              name={platform.platform}
              value={platform.accessToken}
              onChange={handleAccessTokenChange(index)}
              label={`${platform.platform} token`}
              disabled={!platform.checked}
              variant="outlined"
              margin="normal"
            />
          </Stack>
        ))}

      </Stack>

      <Stack spacing={3} sx={{ mt: 5, mb: 10 }}>
        <TextField
          id="password"
          name="password"
          label="Password"
          required
          value={formValues.password}
          onChange={handleInputChange}
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
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={saveUser}>
        Signup
      </LoadingButton>
    </>
  );
}
