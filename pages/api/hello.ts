import {
  withApiAuthRequired
} from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function hello(req, res) {
  try {
    res.json({
      message: "api is secure"
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
});
