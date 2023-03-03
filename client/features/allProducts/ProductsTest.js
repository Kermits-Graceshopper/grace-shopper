// import React, { useState } from "react";
// import axios from "axios";

// const ProductsTest = () => {
//   const [games, setGames] = useState();
//   const getAllGames = async () => {
//     await axios.get("https://api.igdb.com/v4/games", {
//         headers: {
//             'Content-Type': process.env.CLIENT_ID
//         }
//     })
//       .then((res) => (res.data ? setGames(res.data) : null));
//   };

//   return (
//     <div>
//       <button onClick={() => {
//         getAllGames();
//       }}>Get Games</button>
//       <p>Games: {games}</p>
//     </div>
//   );
// };

// export default ProductsTest;
