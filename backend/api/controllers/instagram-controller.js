// Function to fetch media data from Instagram
async function fetchMediaData() {
    const mediaEndpoint = "https://graph.instagram.com/v11.0/6489289474503051/media?fields=id,caption,media_type,media_url,permalink&access_token=IGQVJYSGNoc2E5dTJ6cWd4ekVvZADNtOVl6dFZAIMTI2MDlHX3FYakxwRkxfa3ZAiczFSVHFMZAi1EcEVzUlJxR3FaUXFvSEYxTWdwN3dxdmtLd2RCejRKcWpXQTYzMTk1eTdRWkp0eEJRZAVNwZATU3TFNQVQZDZD";
    
    try {
        const response = await fetch(mediaEndpoint);
        const data = await response.json();
        console.log("Media Data:", data);
    } catch (error) {
        console.error("Error fetching media data:", error);
    }
  }
  
  // Function to fetch user data from Instagram
  async function fetchUserData() {
    const userEndpoint = "https://graph.instagram.com/v11.0/me?fields=id,username,media&access_token=IGQVJYSGNoc2E5dTJ6cWd4ekVvZADNtOVl6dFZAIMTI2MDlHX3FYakxwRkxfa3ZAiczFSVHFMZAi1EcEVzUlJxR3FaUXFvSEYxTWdwN3dxdmtLd2RCejRKcWpXQTYzMTk1eTdRWkp0eEJRZAVNwZATU3TFNQVQZDZD";
    
    try {
        const response = await fetch(userEndpoint);
        const data = await response.json();
        console.log("User Data:", data);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
  }
  
  // Call the functions to fetch data
  fetchMediaData();
  fetchUserData();