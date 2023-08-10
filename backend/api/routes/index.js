import userRoute from './user-route.js';
import dashboardRoute from './dashboard-route.js';
import postRoute from './post-route.js';
import mediumRoute from './medium-route.js';

const registerRoutes = (app) => {
    app.use('/auth', userRoute);
    app.use('/dashboard', dashboardRoute);
    app.use('/post', postRoute);
    app.use('/medium', mediumRoute);
}

export default registerRoutes;