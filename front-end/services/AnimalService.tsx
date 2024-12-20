const getAllAnimals = async () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token;

    if (!token) {
      throw new Error("User is not logged in or token is missing");
    }

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/animals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
};

const AnimalService = {
    getAllAnimals,
};
  
export default AnimalService;
  