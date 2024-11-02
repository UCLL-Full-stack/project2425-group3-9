const getAllUsers = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
  };
  
//   const getLecturerById = async (id: string) => {
//     return fetch(process.env.NEXT_PUBLIC_API_URL + "/lecturers/" + id, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     })
//   };
  const LecturerService = {
    getAllUsers,
    // getLecturerById,
  };
  
  export default LecturerService;
  