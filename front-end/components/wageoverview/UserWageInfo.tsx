import React from 'react';
import { user } from '@types';

type Props = {
  user: user;
};

const UserWageInfo: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      {user && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Seniority</th>
              <th scope="col">Bonus</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{user.wage.amount}</td>
                <td>{user.wage.seniority}</td>
                <td>{user.wage.bonus}</td>
                <td>{user.wage.total}</td>
              </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserWageInfo;