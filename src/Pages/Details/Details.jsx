import React, { useState, useEffect } from "react";
import { ref, push } from "firebase/database";
import { db, auth } from "../../firebase"; // Adjust the path based on your project structure

const Details = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const datas = async (e) => {
    e.preventDefault();

    try {
      if (!userId) {
        console.error("User ID not available.");
        return;
      }

      const datasRef = ref(db, `Details/${userId}`);
      const details = {
        name,
        address,
        phonenumber,
      };

      await push(datasRef, details);

    } catch (error) {
      console.error("Error performing Firebase operation:", error);
    }
  };

  return (
    <div className="sign-in-container">
      <form
        className="w-full max-w-md mx-auto flex flex-col justify-center gap-8 py-[5%]"
        onSubmit={datas}
      >
        <h1 className="text-center text-[#00df9a] text-2xl">User Details</h1>
        <input
          type="text"
          id="name"
          className="p-2 rounded-md"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="p-2 rounded-md"
          placeholder="Enter your Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          id="phonenumber"
          className="p-2 rounded-md"
          placeholder="Enter your Phone Number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />

        <button
          type="submit"
          className="bg-[#00df9a] rounded-md p-2 text-white"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Details;
