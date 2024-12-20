import React from "react";
import { user } from "@types";

type Props = {
  users: Array<user>;
  selectUser: (user: user) => void;
};

const UserOverviewTable: React.FC<Props> = ({
  users,
  selectUser,
}: Props) => {
  return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              {/* <th scope="col">Workspace</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                onClick={() => selectUser(user)}
                role="button"
              >
                {user.profile ? (
                  <>
                    <td>{user.profile.firstname + " " + user.profile.lastname}</td>
                    <td>{user.profile.age}</td>
                </>
               ) : (
                <td colSpan={2}>No profile available</td>
              )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOverviewTable;