import { useEffect, useState } from 'react';
import styles from '../styles/searchuser.module.css';
import Popup from '../components/Popup';
import ReactPaginate from 'react-paginate';
import { useUser } from '@auth0/nextjs-auth0';
import { Table } from 'react-bootstrap';
import { FaSort } from 'react-icons/fa';
import Header from '../components/Header';

export default function Users() {
    const { user } = useUser();

    const [users, setUsers] = useState([]);
    const [teeups, setTeeups] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('');
    const [output, setOutput] = useState('x');
    const [isOpen, setIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [teeupPageNumber, setTeeupPageNumber] = useState(0);
    const [sorting, setSorting] = useState({ field: "", order: "" });

    useEffect(() => {
        getUsers();
    }, [query]);

    const user_headers = [{ name: "Name", field: "name", sortable: true },
    { name: "Username", field: "username", sortable: true },
    { name: "User ID", field: "id", sortable: true }, { name: "Contact", field: "value", sortable: true },
    { name: "", field: "", sortable: false }];
    const teeup_headers = [{ name: "Teeupname", field: "teeupnames", sortable: true },
    { name: "Teeup Status", field: "teeup_status", sortable: true },
    { name: "User Status", field: "user_status", sortable: true }];

    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        if (sorting.field.includes("id")) {
            users.sort(function (a, b) {
                if (a[sorting.field] < b[sorting.field]) {
                    return reversed * -1;
                }
                if (a[sorting.field] > b[sorting.field]) {
                    return reversed * 1;
                }
                return 0;
            });
        }
        else {
            users.sort(
                (a, b) =>
                    reversed * a[sorting.field]?.localeCompare(b[sorting.field])
            );
        }
    }

    if (sorting.field) {
        const reversed = sorting.order === "asc" ? 1 : -1;
        if (sorting.field.includes("id")) {
            teeups.sort(function (a, b) {
                if (a[sorting.field] < b[sorting.field]) {
                    return reversed * -1;
                }
                if (a[sorting.field] > b[sorting.field]) {
                    return reversed * 1;
                }
                return 0;
            });
        }
        else {
            teeups.sort(
                (a, b) =>
                    reversed * a[sorting.field]?.localeCompare(b[sorting.field])
            );
        }
    }

    const updateSearch = e => {
        setSearch(e.target.value)
    }

    const getSearch = e => {
        e.preventDefault()
        setQuery(search);
        setPageNumber(0);
    }

    const getUsers = async () => {
        if (query != '') {
            const res1 = await fetch(
                `http://localhost:3000/api/user/${query}`
            );
            const users = await res1.json();
            setUsers(users);
            setOutput('');
        }
    };

    const togglePopup = async (id) => {
        setIsOpen(!isOpen);
        const res2 = await fetch(
            `http://localhost:3000/api/teeup/${id}`
        );
        const teeups = await res2.json();
        setTeeups(teeups);
    }

    const usersPerPage = 20;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(users.length / usersPerPage);

    const teeupsPerPage = 10;
    const teeupPagesVisited = teeupPageNumber * teeupsPerPage;
    const teeupPageCount = Math.ceil(teeups.length / teeupsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const teeupChangePage = ({ selected }) => {
        setTeeupPageNumber(selected);
    };

    const displayUsers = (
        <div className={styles.container}>
            <div>
                <p className={styles.info}>Results ("{users.length}")</p>
            </div>
            <div>
                <Table striped bordered hover variant="light">
                    <Header
                        headers={user_headers}
                        onSorting={(field, order) =>
                            setSorting({ field, order })}
                    />
                    <tbody>
                        {users.slice(pagesVisited, pagesVisited + usersPerPage)
                            .map((user, index) => (
                                <tr key={index}>
                                    <td><p>{user.name}</p></td>
                                    <td><p>{user.username}</p></td>
                                    <td><p>{user.id}</p></td>
                                    <td><p>{user.value}</p></td>
                                    <td><button className="btn btn-dark" onClick={() => togglePopup(user.value)}>Teeups</button></td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={pageCount} onPageChange={changePage}
                    containerClassName={styles.paginationBttns} disabledClassName={styles.paginationDisbaled}
                    activeClassName={styles.paginationActive} />
            </div>
        </div>);

    if (user) {
        return (
            <div>
                <img className={styles.bg} src="bg.jpg" alt="" />

                <div>
                    <form onSubmit={getSearch} className={styles.input}>
                        <div className="input-group mb-6">
                            <input type="text" placeholder="Search by &quot;User's Name&quot; or &quot;Contact&quot;" value={search} onChange={updateSearch}
                                className="form-control" />
                            <div className="input-group-prepend">
                                <button className="input-group-text" id="">Search</button>
                            </div>
                        </div>
                    </form>
                </div>

                {query != '' && output == '' ? displayUsers : null}

                {isOpen && <Popup content={<>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>Teeups ("{teeups.length}")</p>
                    <Table bordered hover>
                        <Header
                            headers={teeup_headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })}
                        />
                        <tbody>
                            {teeups.slice(teeupPagesVisited, teeupPagesVisited + teeupsPerPage).map((teeup, index) => (
                                <tr key={index}>
                                    <td>{teeup.teeupnames}<br />
                                        <span className="badge alert-dark">{teeup.archived == "true" ? 'Archived' : 'Not Archived'}</span></td>
                                    <td>{teeup.teeup_status}</td>
                                    <td>{teeup.user_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={teeupPageCount} onPageChange={teeupChangePage}
                        containerClassName={styles.paginationBttnsteeup} disabledClassName={styles.paginationDisbaled}
                        activeClassName={styles.paginationActive} />
                </>}
                    handleClose={togglePopup}
                />}
            </div>
        )
    }
    return <p>Unauthorized</p>;
}
