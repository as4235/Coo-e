import {
  db
} from "../../../src/db";
import {
  withApiAuthRequired
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  try {
    const {
      query
    } = req.query;
    const value = '%' + query + '%'

    const users = await db.select("users.id", "users.firstname", "users.lastname",
      "users.name", "users.username", "contact_mechanism.value", "users.avatar", "user_type.value as usertype")
      .from("users")
      .join('user_contact_mechanism', 'users.id', 'user_contact_mechanism.userid')
      .join('contact_mechanism', 'contact_mechanism.id', 'user_contact_mechanism.contactmechanismid')
      .join('user_type', 'user_type.id', 'users.usertype')
      .where('contact_mechanism.value', "ilike", value)
      .orWhere('users.name', 'ilike', value).limit(10);

    res.statusCode = 200;
    return res.json(users);
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});
