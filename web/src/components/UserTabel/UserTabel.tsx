import { useEffect, useState } from "react";
import aws from "aws-sdk";
import "./UserTabel.css";
import { cognitoClient } from "../../main";

const UserTabel = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users to display per page

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const cognitoIdentityServiceProvider =
        new aws.CognitoIdentityServiceProvider();
      const listUsersParams = {
        UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
      };

      const data = await cognitoIdentityServiceProvider
        .listUsers(listUsersParams)
        .promise();
      setUserList(data.Users || []);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  // Calculate total number of pages based on usersPerPage
  const totalPages = Math.ceil(userList.length / usersPerPage);

  // Paginate user list
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Delete user function
  const deleteUser = async (username: string) => {
    if (
      window.confirm(`Are you sure you want to delete the user ${username}?`)
    ) {
      try {
        // Implement the AWS SDK delete user logic here
        const deleteUserParams = {
          UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
          Username: username,
        };
        await cognitoClient
          .adminDeleteUser(deleteUserParams)
          .promise();
        alert(`User ${username} deleted successfully`);
        // Refresh the user list after deletion
        fetchUserList();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(`Error deleting user ${username}`);
      }
    }
  };

  return (
    <>
      <div className="title">
        <p>Users</p>
      </div>
      <div className="tabel">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.Username}>
                <td>{user.Username}</td>
                <td>{getUserEmail(user)}</td>
                <td>
                  {
                    user.Attributes?.find(
                      (attr: { Name: string }) => attr.Name === "sub"
                    )?.Value
                  }
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => deleteUser(user.Username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <table>
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              className="pageNumber"
              key={index}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </span>
          ))}
        </table>
      </div>
    </>
  );
};

// Helper function to get user email
const getUserEmail = (user: any): string | undefined => {
  const emailAttribute = user.Attributes?.find((attr) => attr.Name === "email");
  return emailAttribute?.Value;
};

export default UserTabel;
