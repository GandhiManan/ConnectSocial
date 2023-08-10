import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Select, MenuItem, Stack, OutlinedInput, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import {createScheduledArticle } from '../../../backend/accounts/controllers/medium-controller';
//date and time
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// ----------------------------------------------------------------------
 const articleData = {
   title: 'Homeless run',
   contentFormat: 'html',
   content: '<h1>Liverpool FC323232</h1><p>You’ll never walk alone.</p>',
   canonicalUrl: 'http://jamietalbot.com/posts/liverpool-fc',
   tags: ['football', 'sport', 'Liverpool'],
   publishStatus: 'public'
 };
const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

const accessToken='25cf415dbf28864949cd388a8e8c1cdf6cec86fe512da5ee7dd7172ce0370733f';
/*
async function createScheduledArticle(userID, scheduledDateTime) {
  try {
    const url = `https://api.medium.com/v1/users/${userID}/posts`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      body: JSON.stringify({
        ...articleData,
        publishedAt: scheduledDateTime.toISOString(),
      })
    });

    if (response.ok) {
      const createdArticle = await response.json();
      console.log('Article scheduled:', createdArticle.data);
    } else {
      console.error('Error scheduling article:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
*/
export default function SchedulingForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/:userid/connect-social', { replace: true });
  };

  const [platform, setPlatform] = useState('');

  const handleChange = (event) => {
    setPlatform(event.target.value);
  };
  const articleData = {
    title: 'Homeless run',
    contentFormat: 'html',
    content: '<h1>Liverpool FC323232</h1><p>You’ll never walk alone.</p>',
    canonicalUrl: 'http://jamietalbot.com/posts/liverpool-fc',
    tags: ['football', 'sport', 'Liverpool'],
    publishStatus: 'public'
  };
  const userID = '1f6b7a89857bf57e92a6a253f3a0741de976b066a10c602de91a910ae2e8c4d95';
  const accessToken="25cf415dbf28864949cd388a8e8c1cdf6cec86fe512da5ee7dd7172ce0370733f";

  async function getUserData() {
    const url = 'https://api.medium.com/v1/me';
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await response.json();
    console.log(userData);
    return userData.data;
  }

  return (
    <>
      <Helmet>
        <title> Scheduling | ConnectSocial </title>
      </Helmet>
      <StyledContent>
        <Typography variant="h4" gutterBottom>
          Make a New Post
        </Typography>

        <Stack spacing={3}>
          <Select
            id="platforms"
            name="platfroms"
            input={<OutlinedInput label="Select platform" />}
            onChange={handleChange}
          >
            <MenuItem key="twitter" value="twitter"> Twitter </MenuItem>
            <MenuItem key="instagram" value="instagram"> Instagram </MenuItem>
            <MenuItem key="medium" value="medium"> Medium </MenuItem>
          </Select>

          <TextField fullWidth name="title" label="Add title" />
          <TextField fullWidth multiline rows={4} name="content" label="Write content" />
          <TextField fullWidth name="imageurl" label="Add image url" />
          <TextField fullWidth name="tags" label="Add tags (coma(,) seperated)" />
        </Stack>

        <Stack spacing={3} sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mt: 5 }}>
            Select Date and Time to post
          </Typography>

          <Stack spacing={3} direction="row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Pick up date" />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker label="Pick up time" />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>

        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={getUserData()}>
          Schedule
        </LoadingButton>
     
      </StyledContent>
    </>
  );
}
