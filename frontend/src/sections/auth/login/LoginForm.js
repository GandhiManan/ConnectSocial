import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { isEmpty } from 'lodash';

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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
    email: '',
    password: '',
  });

  const email = formValues.email;
  const password = formValues.password;

  const checkUser = async () => {
    const user = await getUser();
    console.log('user details in user', user, user[0].email === email, user[0].password === password, isEmpty(formValues.email), isEmpty(password))
    if (!isEmpty(formValues.email) && !isEmpty(password) && user[0].email === email && user[0].password === password) {
      closeForm(user[0]._id);
    } else if (isEmpty(email) || isEmpty(password)) {
      alert("Please fill all the fields")
    } else {
      alert("Login credentials do not match. Please try again...")
    }
  }
  
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:9000/auth/login?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      return data;
    } catch(err) {
      console.log('error while logging in', err);
    }
  }
  // const sendEmail = (event) => {
  //   event.preventDefault();

  //   emailjs.sendForm('service_mlbjdkr', 'template_h35b2vk', event.target, 'mO9nL1o9Nwlv9aY6S')
  //     .then((result) => {
  //       console.log(result.text);
  //     })
  //     .catch((error) => {
  //       console.log(error.text);
  //     });
  // };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" required value={formValues.email} onChange={handleInputChange} />

        <TextField
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={checkUser}>
        Login
      </LoadingButton>
    </>
  );
}
