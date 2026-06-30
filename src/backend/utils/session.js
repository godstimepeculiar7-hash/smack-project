// Generate or get the user's session ID
export const getSessionId = () => {

    // Try to get an existing session ID
    let sessionId = localStorage.getItem("sessionId");

    // If none exists
    if (!sessionId) {

        // Create one
        sessionId = crypto.randomUUID();

        // Save it for future visits
        localStorage.setItem("sessionId", sessionId);

    }

    // Return the session ID
    return sessionId;

};