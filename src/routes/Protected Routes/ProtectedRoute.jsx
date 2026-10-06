import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log("Checking auth...");

                const response = await axios.get('http://localhost:5000/auth/me', {
                    withCredentials: true
                });

                console.log("Auth response:", response.data);

                setAuthenticated(true);
            } catch (error) {
                console.log("ProtectedRoute error:", error);
                setAuthenticated(false);
            } finally {
                console.log("Finished auth check");
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

    return children;
}

export default ProtectedRoute;