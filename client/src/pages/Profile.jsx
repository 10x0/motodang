import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return isAuthenticated ? (
		<div className="container my-4">
			<div className="row justify-content-center">
				<div className="col-md-4 bg-light p-5 border shadow">
					<div class="d-flex ">
						<div class="flex-shrink-0">
							<img
								className="rounded-circle"
								src={user.picture}
								alt={user.name}
							/>
						</div>
						<div class="flex-grow-1 ms-3">
							<h3>{user.name}</h3>
							<p>{user.email}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="container my-4">
			<div className="alert alert-danger">
				<h2>You are not logged in</h2>
			</div>
		</div>
	);
};

export default Profile;
