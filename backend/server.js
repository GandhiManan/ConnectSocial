import BackendApp from "./api/backend-app.js";

const port = 9000;
BackendApp.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});