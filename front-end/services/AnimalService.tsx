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

const postAnimal = async (animal: { firstname: string; lastname: string ; age: number, userid: number} ) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token;

  if (!token) {
    throw new Error("User is not logged in or token is missing");
  }


  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname: animal.firstname,
        lastname: animal.lastname,
        age: animal.age,
        userid: animal.userid,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    const data = await response.json();
    console.log('Animal successfully added:', data);
  } catch (error) {
    console.error("Error during postAnimal:", error);
    throw error;
  }
};

const AnimalService = {
    getAllAnimals,
    postAnimal,
};
  
export default AnimalService;
  