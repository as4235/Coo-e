import {
  db
} from "../../src/db";
import {
  withApiAuthRequired
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired( async (req, res) => {
  try {
    const users = await db.select("users.id").from("users").limit(10);

    res.statusCode = 200;
    return res.json(users);
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});
