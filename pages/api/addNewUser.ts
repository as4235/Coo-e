import {
  db
} from "../../src/db";
import {
  withApiAuthRequired
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  try {
    const userid = req.body.userid;
    const teeupid = req.body.teeupid;

    const user = await db.select('id').from('users').where('id', '=', userid);
    const exist = await db.select('teeupid').from('teeup_users').where('teeupid', '=', teeupid).where('usersid', '=', userid);

    if (user[0] !== undefined) {
      if (exist[0] == undefined) {
        await db.into('teeup_users')
          .insert({ teeupid: teeupid, usersid: userid });

        res.statusCode = 200;
        return res.json({ message: "User Added to Teeup" });
      } else {
        return res.json({ message: "User already part of the Teeup" });
      }
    } else {
      return res.json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});
