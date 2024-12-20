import { wage } from "@types";
import { user } from "@types";



const getAllUsers = async () => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token;

    if (!token) {
      throw new Error("User is not logged in or token is missing");
    }


    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
};
  
const getUserById = async (id: string) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token;

    if (!token) {
      throw new Error("User is not logged in or token is missing");
    }

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
};

const updateUserWage = async (id: number, wage: { amount: number, seniority: number, bonus: number }) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token;

    if (!token) {
      throw new Error("User is not logged in or token is missing");
    }
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/updateWage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        wage: wage,
      }),
    });
};

const loginUser = (user: user) => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};


  

  const UserService = {
    getAllUsers,
    getUserById,
    updateUserWage,
    loginUser,
  };
  
  export default UserService;
  