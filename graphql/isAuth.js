import { verify } from "jsonwebtoken";

export default function isAuth(req) {
  try {
    const payload = verify(req.cookies.auth, `${process.env.JWT_COOKIE_TOKEN}`);
    console.log("🚀 ~ file: isAuth.js ~ line 5 ~ isAuth ~ payload", payload);
    return {
      payload,
      expired: false,
      verified: true,
    };
  } catch (error) {
    console.log("🚀 ~ file: isAuth.js ~ line 9 ~ isAuth ~ error", error);
    if (error.message === "jwt expired") {
      return {
        payload: null,
        expired: true,
        verified: false,
      };
    }
    return {
      payload: null,
      expired: false,
      verified: false,
    };
  }
}
