import React, { useEffect, useState } from 'react';
import { user } from '@types';
import UserService from '@services/UserService';

type Props = {
  user: user;
};


const UserWageInfo: React.FC<Props> = ({ user }: Props) => {
    const [newAmount, setNewAmount] = useState<number>(user.wage.amount);
    const [newSeniority, setNewSeniority] = useState<number>(user.wage.seniority);
    const [newBonus, setNewBonus] = useState<number>(user.wage.bonus);

    useEffect(() => {
      setNewAmount(user.wage.amount);
      setNewSeniority(user.wage.seniority);
      setNewBonus(user.wage.bonus);
    }, [user]);

const handleClick = async() => {
    const wage = {
      amount: newAmount,
      seniority: newSeniority,
      bonus: newBonus
    };

    try {
      await UserService.updateUserWage(user.id, wage);
      window.location.reload();
    } catch (error) {
      throw new Error("error tijdens het event om wage van een user aan te passen");
    }
    }

  return (
    <>
      {user && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Employee</th>
              <th scope="col">Amount</th>
              <th scope="col">Seniority</th>
              <th scope="col">Bonus</th>
              
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{user.profile.firstname + " " + user.profile.lastname}</td>
                <td>
                <input type="number" name="amountField" placeholder={String(user.wage.amount)} value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))} />
                </td>
                <td>
                <input type="number" name="seniorityFiels" placeholder={String(user.wage.seniority)} value={newSeniority}
                    onChange={(e) => setNewSeniority(Number(e.target.value))}/>
                </td>
                <td>
                <input type="number" name="bonusField" placeholder={String(user.wage.bonus)} value={newBonus}
                    onChange={(e) => setNewBonus(Number(e.target.value))} />
                </td>
                <td><button type="button" onClick={handleClick} >Submit!</button></td>
              </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserWageInfo;