# ConnectSocial - A Social Media Dashboard
ConnectSocial is a comprehensive dashboard that aims to provide users with a centralized hub to manage and interact with multiple social media platforms. It allows users to streamline their social media experience by aggregating feeds, notifications, and messages from various platforms into a single interface. The dashboard provides seamless navigation between different social media accounts, enabling users to monitor and engage with their networks efficiently.

## Features as User Story
![User Story](https://github.com/neu-mis-info-6150-summer-2023/final-project-connectsocial-a-social-media-dashboard/blob/main/Project%20Diagrams/User%20Story.jpeg?raw=true)

## User Story under Milestone and Task Assignment
![Milestones](https://github.com/neu-mis-info-6150-summer-2023/final-project-connectsocial-a-social-media-dashboard/blob/main/Project%20Diagrams/User%20Story%20under%20Milestones.jpeg?raw=true)

## Object Model
![ER Diagram](https://github.com/neu-mis-info-6150-summer-2023/final-project-connectsocial-a-social-media-dashboard/blob/main/Project%20Diagrams/Object%20Model.jpeg?raw=true)

## Tech Stack
### Frontend
* HTML/CSS
* JavaScript
* React or Angular (for building the user interface)
* Redux or Context API (for state management)
* Axios (for API requests)
* UI frameworks like Material-UI, Bootstrap (for faster development)

### Backend
* Node.js (for server-side development)
* Express.js (as the web framework)
* MongoDB (as the database)
* JWT (JSON Web Tokens) for authentication
* Socket.io (for real-time notifications)
* Social media platform APIs for integration (e.g. Twitter API, Instagram API, YouTube API)

## REST APIs
1. User Registration and Authentication:
* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Log in a user.
* `POST /api/auth/logout`: Log out a user.
* `POST /api/auth/reset-password`: Reset a user's password.
* `POST /api/auth/recover-account`: Recover a locked or compromised user account.

2. Social Media Management:
* `GET /api/social-media/accounts`: Retrieve the connected social media accounts of a user.
* `POST /api/social-media/accounts/connect`: Connect a user's social media account to ConnectSocial.
* `POST /api/social-media/accounts/disconnect`: Disconnect a user's social media account from ConnectSocial.

3. Unified Dashboard:
* `GET /api/dashboard/feed`: Retrieve the personalized feed for a user.
* `GET /api/dashboard/notifications`: Retrieve notifications for a user.
* `POST /api/posts/create`: Create a new post.
* `POST /api/posts/edit`: Edit an existing post.
* `DELETE /api/posts/:id`: Delete a post.
* `POST /api/posts/like`: Like a post.
* `POST /api/posts/comment`: Add a comment to a post.

4. Messaging and Notifications:
* `GET /api/messages/inbox`: Retrieve the user's inbox messages.
* `GET /api/messages/sent`: Retrieve the user's sent messages.
* `POST /api/messages/compose`: Compose and send a new message.
* `POST /api/messages/reply`: Reply to a message.

5. Profile Management:
* `GET /api/profile/:id`: Retrieve the profile information of a user.
* `POST /api/profile/update`: Update the profile information of a user.
* `POST /api/profile/picture`: Upload a profile picture for a user.
