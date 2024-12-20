
import AnimalService from "@services/AnimalService";
import UserService from "@services/UserService";
import { useState } from "react";

const AnimalAdminPost: React.FC = () => {
    const [Firstname, setFirstName] = useState<string>("");
    const [Lastname, setLastName] = useState<string>("");
    const [Age, setAge] = useState<number>(0);
    const [UserId, setUserId] = useState<number>(0);
    const [errors, setErrors] = useState<string[]>([]); 
    const [successMessage, setSuccessMessage] = useState<string>("");


const handleClick = async() => {

    const validationErrors: string[] = [];

    if (!Firstname) validationErrors.push("Firstname veld moet ingevuld worden");
    if (!Lastname) validationErrors.push("Lastname veld moet ingevuld worden");
    if (!Age || Age === 0) validationErrors.push("Age veld moet ingevuld worden");
    if (Age < 0) validationErrors.push("Age mag niet negatief zijn");
    if (!UserId) validationErrors.push("UserId veld moet ingevuld worden");

    if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const UserIdString = UserId.toString();
      const existingUser = await UserService.getUserById(UserIdString);
  
      if (!existingUser) {
        setErrors([`No user with userId ${UserId} found`]);
        return;
      }

      const animal = {
        firstname: Firstname,
        lastname: Lastname,
        age: Age,
        userid: UserId,
      };

      try {
        await AnimalService.postAnimal(animal);
        setErrors([]);
        setSuccessMessage("Animal successfully added!");
      } catch (error) {
        console.error("Error during postAnimal:", error);
        setErrors(["Er is een fout opgetreden bij het versturen van de gegevens."]);
      }
};

return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Age</th>
            <th scope="col">userId</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="Firstname"
                placeholder="Firstname"
                value={Firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                name="Lastname"
                placeholder="Lastname"
                value={Lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                name="Age"
                placeholder="Age"
                value={Age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </td>
            <td>
              <input
                type="number"
                name="UserId"
                placeholder="UserId"
                value={UserId}
                onChange={(e) => setUserId(Number(e.target.value))}
              />
            </td>
            <td>
              <button type="button" onClick={handleClick}>
                Submit!
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {errors.length > 0 && (
        <div style={{ color: "red" }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      {successMessage && (
        <div style={{ color: "green", marginTop: "10px" }}>
          <p>{successMessage}</p>
        </div>
      )}
    </>
  );
};

export default AnimalAdminPost;