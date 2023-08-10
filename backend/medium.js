import { MongoClient } from 'mongodb';
import fetch from 'node-fetch';

const mongoURI = 'mongodb://0.0.0.0:27017/';
const dbName = 'ConnectSocial';

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const accessToken = '25cf415dbf28864949cd388a8e8c1cdf6cec86fe512da5ee7dd7172ce0370733f';

async function saveUserDataToMongo(userData) {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const userDataCollection = db.collection('userData');

    // Insert the user data into the collection
    const result = await userDataCollection.insertOne(userData);
    console.log('User data saved to MongoDB:', result.insertedId);
  } catch (error) {
    console.error('Error saving user data to MongoDB:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

async function getUserData() {
  const url = 'https://api.medium.com/v1/me';
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userData = await response.json();
  return userData.data;
}

const articleData = {
  title: 'Homeless run',
  contentFormat: 'html',
  content: '<h1>Liverpool FC323232</h1><p>You’ll never walk alone.</p>',
  canonicalUrl: 'http://jamietalbot.com/posts/liverpool-fc',
  tags: ['football', 'sport', 'Liverpool'],
  publishStatus: 'public'
};

async function createScheduledArticle(userID, scheduledDateTime) {
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

async function getUserArticles(userID) {
  console.log("medium api")
  const url = `https://api.medium.com/v1/users/${userID}/publications`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const articlesData = await response.json();
  return articlesData.data;
}

async function main() {
  try {
    const userData = await getUserData();
    console.log('User Data:', userData);
    await saveUserDataToMongo(userData);
    const userID = userData.id;
    console.log("User ID is:", userID);

    const scheduledDateTime = new Date('2023-08-09T15:14:00Z'); // Adjust the scheduled time
    createScheduledArticle(userID, scheduledDateTime);
    console.log('Article Scheduled for:', scheduledDateTime);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
