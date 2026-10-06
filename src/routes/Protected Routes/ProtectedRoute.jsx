import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {

                const response = await axios.get('https://smackbackend.onrender.com/auth/me', {
                    withCredentials: true
                });
                setUser(response.data);

                setAuthenticated(true);
            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);
    // your code here

    if (loading) {
        return <p>Checking authentication...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children(user);
}

export default ProtectedRoute;