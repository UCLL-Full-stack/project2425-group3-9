import React from "react";
import { user } from "@types";

type Props = {
  users: Array<user>;
  selectUser: (user: user) => void;
};

const WageOverviewTable: React.FC<Props> = ({
  users,
  selectUser,
}: Props) => {
  return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Employee</th>
              <th scope="col">Amount</th>
              <th scope="col">Seniority</th>
              <th scope="col">Bonus</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                onClick={() => selectUser(user)}
                role="button"
              >
                <td>{user.profile.firstname + " " + user.profile.lastname}</td>
                <td>{user.wage.amount}</td>
                <td>{user.wage.seniority}</td>
                <td>{user.wage.bonus}</td>
                <td>{user.wage.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default WageOverviewTable;