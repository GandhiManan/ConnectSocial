import express from "express";
// import cors from "cors";
import debug from "debug";
import mongoose from "mongoose";
import registerRoutes from "./routes/index.js";

const BackendApp = express();
const log = debug("app:log");
const error = debug("app:error");

// BackendApp.use(cors());
BackendApp.use(express.json());
BackendApp.use(express.urlencoded({ extended: true }));

// passing app in routes
registerRoutes(BackendApp);
//const url = 'mongodb+srv://yashashreepatel:JklfLJWmgd3isxNw@connectsocial.k3tdcm0.mongodb.net/ConnectSocialDatabase';
const url = "mongodb://127.0.0.1/connectsocial";
mongoose.connect(url)

// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connected to MongoDB ConnectSocial Database");
// }).catch((err) => {
//     console.log("Error connecting to MongoDB: ", err);
// });
export default BackendApp;