// responsible for reading the http request and sending the http request
import { setResponse, setErrorResponse } from '../../api/controllers/response-handler.js'
// const accessToken = '26428e935ac7a909893c45b6f726700f4c974ba341a40d16a398b8a2211145fe7';

// Function to fetch user's articles
export const getMediumUserArticles = async (request, response) => {
  try {
    // const { accessToken } = request.body;
    const accessToken = '26428e935ac7a909893c45b6f726700f4c974ba341a40d16a398b8a2211145fe7';
    const url = 'https://api.medium.com/v1/me';
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await response.json();
    const userId = userData.data.id;

    const userUrl = `https://api.medium.com/v1/users/${userId}/publications`;
    const userResponse = await fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const articlesData = await userResponse.json();

    setResponse(articlesData.data, response);
  } catch (err) {
    setErrorResponse(500, err, response);
  }
}

// Example medium article
// const articleData = {
//   title: 'Homeless run',
//   contentFormat: 'html',
//   content: '<h1>Liverpool FC323232</h1><p>You’ll never walk alone.</p>',
//   canonicalUrl: 'http://jamietalbot.com/posts/liverpool-fc',
//   tags: ['football', 'sport', 'Liverpool'],
//   publishStatus: 'public'
// };

// Function to create user's articles
export const createMediumArticle = async (request, response) => {
  try {
    const { accessToken, articleData } = request.body;

    const url = `https://api.medium.com/v1/users/${userId}/posts`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(articleData)
    });

    if (response.status === 201) {
      const createdArticle = await response.json();
      console.log('Article created for Medium', createdArticle.data);
    } else {
      console.error('Error creating article for Medium', response.statusText);
    }
  } catch (err) {
    setErrorResponse(500, err, response);
  }
}



export async function createScheduledArticle(userID, scheduledDateTime, accessToken, articleData) {
  try {
    const url = `https://api.medium.com/v1/users/${userID}/posts`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        ...articleData,
        publishedAt: scheduledDateTime.toISOString(),
      })
    });

    if (response.status === 201) {
      const createdArticle = await response.json();
      console.log('Article scheduled:', createdArticle.data);
    } else {
      console.error('Error scheduling article:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
