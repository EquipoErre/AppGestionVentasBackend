import jwt_decode from 'jwt-decode';
const userMiddleware = async (req, res, next) => {
  next();
};

export default userMiddleware;