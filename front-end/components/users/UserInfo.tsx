import React from 'react';
import { user } from '@types';

type Props = {
  user: user;
};

const UserInfo: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      {user && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{user.address.street + "" + user.address.number}</td>
                <td>{user.address.postalcode + " " + user.address.city}</td>
                <td>{user.profile.phonenumber}</td>
              </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserInfo;