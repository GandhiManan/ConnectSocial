import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Grid, Container, Stack, Typography } from '@mui/material';
import { PostCard, PostsSort, PostsSearch } from '../sections/@dashboard/post';
// mock
import POSTS from '../_mock/blog';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function DashboardPage() {
  const { userid } = useParams();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    getAccessToken();
  }, [])

  const getAccessToken = async () => {
    try {
      const response = await fetch(`http://localhost:9000/auth/get-user/${userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      const accessToken = data.socialMediaAccess[0].accessToken;
      setAccessToken(accessToken)
      // const result = await accessToken.then(result => result.data);
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | ConnectSocial </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            View Posts
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <PostsSearch posts={POSTS} />
          <PostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} accessToken={accessToken} />
          ))}
        </Grid>
      </Container>
    </>
  );
}