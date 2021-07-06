import Layout from '../components/Layout';
import { UserProvider } from '@auth0/nextjs-auth0';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

export default MyApp
