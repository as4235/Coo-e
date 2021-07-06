import { useEffect, useState } from 'react';
import styles from '../styles/searchTeeups.module.css';
import Popup from '../components/Popup';
import UserRemove from '../components/UserRemoveConfirmation';
import Profile from '../components/Profile';
import ReactPaginate from 'react-paginate';
import { useUser } from '@auth0/nextjs-auth0';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { Table, Container, Row, Col, Button, Collapse, Dropdown, ButtonGroup } from 'react-bootstrap';
import Header from '../components/Header';
import moment from 'moment';

toast.configure()
export default function Teeups() {
    const { user } = useUser();

    const removeNotify = () => {
        toast.dark('User Removed Succesfully!', { position: toast.POSITION.TOP_CENTER });
    }

    const userAddedNotify = (message) => {
        toast.dark(Object.values(message) + '.', { position: toast.POSITION.TOP_CENTER });
        setMessage('');
    }

    const [users, setUsers] = useState([]);
    const [teeups, setTeeups] = useState([]);
    const [search, setSearch] = useState("");
    const [teeupname, setTeeupname] = useState("");
    const [query, setQuery] = useState('');
    const [userid, setUserid] = useState('');
    const [teeupid, setTeeupid] = useState('');
    const [profile, setProfile] = useState([]);
    const [profileteeup, setProfileteeup] = useState([]);
    const [message, setMessage] = useState('');
    const [output, setOutput] = useState('x');
    const [isOpen, setIsOpen] = useState(false);
    const [IsActivated, setIsActivated] = useState(false);
    const [IsOn, setIsOn] = useState(false);
    const [profileopen, setProfileopen] = useState(false);
    const [delconfirm, setDelconfirm] = useState(false);
    const [addconfirm, setAddconfirm] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [profilePageNumber, setProfilePageNumber] = useState(0);
    const [userPageNumber, setUserPageNumber] = useState(0);
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [username, setUsername] = useState("");
    const [result, setResult] = useState([]);
    const [searchoption, setSearchoption] = useState('');

    useEffect(() => {
        getTeeups();
        searchUsers();
    }, [query, username]);

    const user_headers = [{ name: "Participants", field: "participants", sortable: true },
    { name: "User Status", field: "user_status", sortable: false }, { name: "", field: "", sortable: false }];
    const teeup_headers = [{ name: "Teeupname", field: "teeupname", sortable: true }, { name: "Teeup ID", field: "teeupid", sortable: true },
    { name: "Created By", field: "createdby", sortable: true }, { name: "Created At", field: "createdat", sortable: true },
    { name: "Status", field: "teeupstatus", sortable: true },
    { name: "", field: "", sortable: false }];
    const profileteeup_headers = [{ name: "Teeupname", field: "teeupnames", sortable: true },
    { name: "Status", field: "status", sortable: true }];

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
            profileteeup.sort(function (a, b) {
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
            profileteeup.sort(
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
        ;
    }

    const searchUsers = async () => {
        if (username != "") {
            const res1 = await fetch(
                `http://localhost:3000/api/usersearch/${username}`
            );
            const searchusers = await res1.json();
            setResult(searchusers);
        }
    };

    const getTeeups = async () => {
        if (query != '') {
            if (searchoption == '1') {
                const res1 = await fetch(
                    `http://localhost:3000/api/teeupsByName/${query}`
                );
                const teeups = await res1.json();
                setTeeups(teeups);
                setOutput('');
                setSearchoption('');
            }
            else if (searchoption == '2') {
                const res1 = await fetch(
                    `http://localhost:3000/api/teeupsByTeeupId/${query}`
                );
                const teeups = await res1.json();
                setTeeups(teeups);
                setOutput('');
                setSearchoption('');
            }
            else if (searchoption == '3') {
                const res1 = await fetch(
                    `http://localhost:3000/api/teeupsByCreatedby/${query}`
                );
                const teeups = await res1.json();
                setTeeups(teeups);
                setOutput('');
                setSearchoption('');
            } else {
                const res1 = await fetch(
                    `http://localhost:3000/api/teeups/${query}`
                );
                const teeups = await res1.json();
                setTeeups(teeups);
                setOutput('');
                setSearchoption('');
            }
        }
    };

    const getUsers = async (teeupid) => {
        const res2 = await fetch(
            `http://localhost:3000/api/teeup_users/${teeupid}`
        );
        const users = await res2.json();
        setUsers(users);
    }

    const getProfileteeup = async (id) => {
        const res2 = await fetch(
            `http://localhost:3000/api/teeup/${id}`
        );
        const profileteeup = await res2.json();
        setProfileteeup(profileteeup);
    }

    const deleteUser = async (teeupid, userid) => {
        const body = { teeupid, userid };
        await fetch("http://localhost:3000/api/delete_user", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        getUsers(teeupid);
        removeNotify();
    }

    const addUser = async () => {
        const body = { teeupid, userid };
        const res3 = await fetch("http://localhost:3000/api/addNewUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const message = await res3.json();
        setMessage(message);
        setUserid('');
        getUsers(teeupid);
        setAddconfirm(false);
        userAddedNotify(message);
    }

    const togglePopup = async () => {
        setIsOpen(!isOpen);
        setUsers([]);
    }

    const toggleUserRemove = async () => {
        setIsActivated(!IsActivated);
    }

    const toggleUserProfile = async (id) => {
        setIsOn(!IsOn);
        const res5 = await fetch(
            `http://localhost:3000/api/profile/${id}`
        );
        const profile = await res5.json();
        setProfile(profile);
    }

    const checkinput = async () => {
        if (userid != '') {
            setAddconfirm(true);
        } else {
            setAddconfirm(false);
        }
    }

    const teeupsPerPage = 20;
    const pagesVisited = pageNumber * teeupsPerPage;
    const pageCount = Math.ceil(teeups.length / teeupsPerPage);

    const profilePerPage = 8;
    const profilePagesVisited = profilePageNumber * profilePerPage;
    const profilePageCount = Math.ceil(profileteeup.length / profilePerPage);

    const userPerPage = 8;
    const userPagesVisited = userPageNumber * userPerPage;
    const userPageCount = Math.ceil(users.length / userPerPage);


    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const profileChangePage = ({ selected }) => {
        setProfilePageNumber(selected);
    };

    const userChangePage = ({ selected }) => {
        setUserPageNumber(selected);
    };

    const displayTeeups = (
        <div className={styles.container}>
            <div>
                <p className={styles.info}>Results ("{teeups.length}")</p>
            </div>
            <div>
                <Table striped bordered hover variant="light">
                    <Header
                        headers={teeup_headers}
                        onSorting={(field, order) =>
                            setSorting({ field, order })}
                    />
                    <tbody>
                        {teeups.slice(pagesVisited, pagesVisited + teeupsPerPage)
                            .map((teeup, index) => (
                                <tr key={index}>
                                    <td><p>{teeup.teeupname}<br />
                                        <span className="badge alert-dark">{teeup.archived == "true" ? 'Archived' : 'Not Archived'}</span></p></td>
                                    <td><p>{teeup.teeupid}</p></td>
                                    <td><p>{teeup.createdby}</p></td>
                                    <td><p>{moment(`${teeup.createdat}`).format('MM/DD/YYYY - HH:MM:SS')}</p></td>
                                    <td><p>{teeup.teeupstatus}</p></td>
                                    <td onClick={() => setTeeupname(teeup.teeupname)}><button className="btn btn-dark"
                                        onClick={() => getUsers(teeup.teeupid) && togglePopup() && setTeeupid(teeup.teeupid)}>Participants</button></td>
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
                            <input type="text" placeholder="Search by &quot;Teeup Name&quot;, &quot;Teeup ID&quot; or &quot;Created By&quot;"
                                value={search} onChange={updateSearch}
                                className="form-control" />
                            <div className="input-group-prepend">
                                <Dropdown as={ButtonGroup}>
                                    <button className="input-group-text" id="">Search</button>

                                    <Dropdown.Toggle split variant="light" id="dropdown-split-basic" className="input-group-text" />

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={e => setSearchoption('1')}>Teeupname</Dropdown.Item>
                                        <Dropdown.Item onClick={e => setSearchoption('2')}>Teeup ID</Dropdown.Item>
                                        <Dropdown.Item onClick={e => setSearchoption('3')}>Created By</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </form>
                </div>

                {query != '' && output == '' ? displayTeeups : null}

                {isOpen && <Popup content={<>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>Participants ("{users.length}")</p>
                    <Table className="table table-hover">
                        <Header
                            headers={user_headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })}
                        />
                        <tbody>
                            {users.slice(userPagesVisited, userPagesVisited + userPerPage).map((user, index) => (
                                <tr key={index}>
                                    <td onClick={() => toggleUserProfile(user.value)}>{user.org == false ? user.participants : <p>{user.participants}&nbsp;
                                    <span className="badge alert-dark">Organiser</span></p>}</td>
                                    <td>{user.user_status}</td>
                                    <td>{user.org == true ? null :
                                        <p className={styles.delete}><button className="btn btn-danger btn-block"
                                            onClick={() => setDelconfirm(true)}>Remove User</button></p>}</td>
                                    <Modal className={styles.modal} isOpen={delconfirm} ariaHideApp={false} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
                                        <h3>Remove User?</h3>
                                        <p>Are you sure you want to remove the user?</p>
                                        <button className="btn btn-danger" onClick={() => deleteUser(user.teeupid, user.userid) && setDelconfirm(false)}>Yes</button>
                                            &nbsp;<button className="btn btn-secondary" onClick={() => setDelconfirm(false)}>Cancel</button>
                                    </Modal>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={userPageCount} onPageChange={userChangePage}
                        containerClassName={styles.paginationBttnsteeup} disabledClassName={styles.paginationDisbaled}
                        activeClassName={styles.paginationActive} />
                    <div className="d-flex justify-content-center"><button className="btn btn-success"
                        onClick={() => { toggleUserRemove(); setUsername('') }}>Add User</button></div>
                </>}
                    handleClose={togglePopup}
                />}

                {IsActivated && <UserRemove content={<div>
                    <div className="input-group mb-6" style={{ marginTop: "50px" }}>
                        <input type="text" placeholder="Search by &quot;Name&quot; or &quot;Contact&quot; to add User" className="form-control"
                            value={username} onChange={e => setUsername(e.target.value)} />
                        <button className="input-group-text btn btn-success" onClick={() => checkinput()}>Add</button>
                    </div>
                    <div className="container">
                        {username != '' && result != [] ?
                            <Table bordered hover>
                                <tbody>
                                    {result.map((user, index) => (
                                        <tr key={index} className={styles.search}>
                                            <td tabIndex={1} onClick={() => { setUserid(user.id) }}><b>{user.name}</b> | <b>ID:</b> {user.id} | <b>Contact:</b> {user.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> : null}
                    </div>
                    <Modal className={styles.modal} isOpen={addconfirm} ariaHideApp={false} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.4)' } }}>
                        <h3>Add User?</h3>
                        <p>Confirm to add the User.</p>
                        <button className="btn btn-success" onClick={(e) => { addUser(); e.preventDefault(); setResult([]); setUsername("") }}>Yes</button>
                        &nbsp;<button className="btn btn-secondary" onClick={() => setAddconfirm(false)}>Cancel</button>
                    </Modal>
                </div>}
                    handleClose={toggleUserRemove}
                />}

                {IsOn && <Profile content={<>
                    {profile.map((user, index) => (
                        <Container key={index}>
                            <Row className={styles.title}>
                                <Col><h3>Profile</h3></Col>
                            </Row>
                            <Row className={styles.first}>
                                <Col className={styles.username}>
                                    <img className={styles.avatar} src={user.avatar == "" ? "blank.png" : user.avatar} />
                                        &nbsp;&nbsp;{user.name}
                                </Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col className={styles.head}>User ID:</Col>
                                <Col className={styles.col}>{user.id}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col className={styles.head}>Full Name:</Col>
                                <Col className={styles.col}>{user.firstname}&nbsp;{user.lastname}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col className={styles.head}>User Name:</Col>
                                <Col className={styles.col}>{user.username}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col className={styles.head}>Contact:</Col>
                                <Col className={styles.col} {...getProfileteeup(user.value)}>{user.value}</Col>
                            </Row>
                            <Row className={styles.row}>
                                <Col className={styles.head}>type:</Col>
                                <Col className={styles.col}>{user.usertype}</Col>
                            </Row>
                            <Row>
                                <Col className={styles.teeupbttn}><Button className="btn btn-dark" onClick={() => setProfileopen(!profileopen)}
                                    aria-controls="example-collapse-text" aria-expanded={profileopen}>Show Teeups</Button></Col>
                            </Row>
                        </Container>
                    ))}
                    <Collapse in={profileopen}>
                        <div id="example-collapse-text">
                            <Table bordered hover>
                                <Header
                                    headers={profileteeup_headers}
                                    onSorting={(field, order) =>
                                        setSorting({ field, order })}
                                />
                                <tbody>
                                    {profileteeup.slice(profilePagesVisited, profilePagesVisited + profilePerPage).map((user, index) => (
                                        <tr key={index}>
                                            <td className={styles.col}><p>{user.teeupnames}</p></td>
                                            <td><p>{user.status}</p></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <ReactPaginate previousLabel={"Previous"} nextLabel={"Next"} pageCount={profilePageCount} onPageChange={profileChangePage}
                                containerClassName={styles.paginationBttnsteeup} disabledClassName={styles.paginationDisbaled}
                                activeClassName={styles.paginationActive} />
                        </div>
                    </Collapse>
                </>}
                    handleClose={toggleUserProfile}
                />}
            </div>
        )
    }
    return <p>Unauthorized</p>;
}
