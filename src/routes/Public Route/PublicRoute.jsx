import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../backend/firebase.utils';

function PublicRoute({ children }) {

    const [user, setUser] = useState(undefined);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;

    }, []);

    if (user === undefined) {
        return null;
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;