import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('http://localhost:5000/auth/me', {
                withCredentials: true
            });

            setUser(response.data);
        };

        getUser();
    }, []);

    return (
        <div>
            <h1>Welcome {user?.fullName}</h1>
            <p>{user?.email}</p>
        </div>
    );
}

export default Dashboard;