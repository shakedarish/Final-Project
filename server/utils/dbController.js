const { db } = require("./firebase.js");

const uploadData = async (req, res) => {
  const { email, password, userName } = req.body;
  const userData = {
    email,
    password,
    userName,
  };
  try {
    const emailExists = await getUser(email);
    if (emailExists === null) {
      await db.collection("users").add({
        userData,
      });
      res.send({ success: true, message: userData.userName });
    } else {
      res.send({ success: false, message: "Error - email is already exists." });
    }
  } catch (error) {
    console.error("Error on upload to firebase DB: " + error);
    res.send({ success: false, message: "Error on upload to firebase DB" });
  }
};

const checkLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await getUser(email);
    if (userData !== null && userData.password === password) {
      res.status(200).json({ success: true, message: userData.userName });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Incorrect password or email" });
    }
  } catch (error) {
    console.error("Error on checking login: " + error);
    return res
      .status(500)
      .json({ success: false, message: "Error trying to login" });
  }
};

const getUser = async (email) => {
  try {
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return null;
  }
};

module.exports = {
  uploadData,
  checkLogin,
};
