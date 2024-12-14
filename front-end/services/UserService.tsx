import { wage } from "@types";

const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
  };
  
  const getUserById = async (id: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
  };

  // const updateUserWage = async (id: number, wage : wage) => {
  //   return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/updateWage", {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: id,
  //       wage: wage,
  //     }),
  //   });
  // };

  const updateUserWage = async (id: number, wage: { amount: number, seniority: number, bonus: number }) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/updateWage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        wage: wage,
      }),
    });
  };
  

  const UserService = {
    getAllUsers,
    getUserById,
    updateUserWage,
  };
  
  export default UserService;
  