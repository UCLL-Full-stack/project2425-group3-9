const getAllAnimals = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/animals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
};

const AnimalService = {
    getAllAnimals,
};
  
export default AnimalService;
  