import React from "react";
import { animal, user } from "@types";

type Props = {
    animal : animal;
    users: Array<user>;
};

const OwneInfo: React.FC<Props> = ({
  animal,
  users,
}: Props) => {

    const findOwnerOfAnimal = (users: user[], animalName: string): user | undefined => {
        return users.find((user) =>
          user.animals.some((a) => a.firstname.toLowerCase() === animalName.toLowerCase())
        );
      };
      
    const owner = findOwnerOfAnimal(users, animal.firstname);
    return (
    <>   
      {owner && (
        <div>
            <h2>Additional information about {animal.firstname} and owner</h2>
            <p>{animal.firstname}  {animal.lastname} is {animal.age} old. <br /> 
                The Owner of {animal.firstname} is {owner.profile.firstname} {owner.profile.lastname}. <br />
                His/her phone number is {owner.profile.phonenumber}. <br />
                His/her address is {owner.address.street} {owner.address.city} {owner.address.postalcode} {owner.address.state} {owner.address.country}.</p> 
        </div>
      )}
      {!owner && (
        <div>
            <p>No owner found of {animal.firstname}</p>
        </div>
      )}
    </>
  );
};


export default OwneInfo;
