
import jwt from "jsonwebtoken"
const API_KEY = "1429fffb-335d-4c41-82fd-36c90f9c3724";  
const SECRET_KEY= "e04c1d34d683ad19cf2ec85e98db8f807a8a455e32bcb76a30e44865d3fd1127"
const generateToken = () => {
  const token = jwt.sign({
    apikey:API_KEY,
    permission:['allow_join']

  }, SECRET_KEY, {
    expiresIn: "24h", // Token expiry
    algorithm: "HS256",
  });
  return token;
};

export default generateToken;
