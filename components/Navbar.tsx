import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/homepage.module.css';

const Navbar = () => {
    const { user } = useUser();
    return (
        user ? (
            <div>
                <nav className="navbar fixed-top navbar-expand-md bg-dark">
                    <a className={styles.navbar} href="/"><img src="logo.svg" style={{ width: "130px" }} alt="" /></a>
                    <div className="collapse navbar-collapse justify-content-end mx-3 my-2" id="navbarNav">
                        {user ? (
                            <ul className="navbar-nav">
                                <li className="btn btn-outline-light ml-auto">
                                    <Link href="/api/auth/logout">Logout</Link>
                                </li>
                            </ul>
                        ) : (null)}
                    </div>
                </nav>
            </div>
        ) : null
    )
}

export default Navbar;
