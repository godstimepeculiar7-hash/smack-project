function Dashboard({ user }) {
    return (
        <div>
            <h1>Welcome {user?.fullName}</h1>
            <p>{user?.email}</p>
        </div>
    );
}

export default Dashboard;