import React from "react";
import { animal } from "@types";

type Props = {
  animals: Array<animal>;
  selectAnimal: (animal: animal) => void;
  deleteAnimal: (animal: animal) => void;
};

const AnimalOverviewTable: React.FC<Props> = ({
  animals,
  selectAnimal,
  deleteAnimal,
}: Props) => {
  return (
    <>
      {animals && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Age</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, index) => (
              <tr
              key={index}
              onClick={() => selectAnimal(animal)}
              role="button"
                >
                <td>{animal.firstname}</td>
                <td>{animal.lastname}</td>
                <td>{animal.age}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAnimal(animal);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AnimalOverviewTable;
