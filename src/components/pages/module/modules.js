import Layout from "../../layout";
import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap';


const Modules = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [status, setStatus] = useState(0);
    const [checkboxIds, setCheckboxIds] = useState([]);
    // const [array, setArray] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        GetModules();
    }, [status]);

    const GetModules = async () => {

        const response = await fetchData(status);
        setData(response);
        console.log("response", response)
        setLoading(false);
    }

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const deleteItem = async () => {
        setLoading(true);
        setShowModal(false);
        const body = JSON.stringify({
            id: deleteId
        });

        try {
            const response = await axios.post('/mobileapi/api/deleteModule', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data['status'] == '200') {
                GetModules();
                setLoading(false);
                dispatch({ type: "MESSAGE", payload: response.data['message'] });
            } else {
                setLoading(false);
            }

            navigate('/modules');

        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            dispatch({ type: "MESSAGE", payload: "Internal error occured, please contact to system administator" });
        }
    }

    const handleStatus = (value) => {
        setStatus(value);
    }

    const handleCheckBox = (id) => {
        setCheckboxIds((prevCheckboxIds) => {
            // unckecked checkbox
            if (prevCheckboxIds.includes(id)) {
                return prevCheckboxIds.filter((checkboxId) => checkboxId !== id);
            } else {
                //ckecked checkbox
                return [...prevCheckboxIds, id];
            }
        });
    }

    console.log(checkboxIds)

    const handleActiveModule = async () => {
        setLoading(true);
        const body = JSON.stringify({
            inActiveIds: checkboxIds
        });

        console.log(body);

        const response = await axios.post('/mobileapi/api/activeModule', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data['status'] == '200') {
            // window.location.reload();
            GetModules();
            setLoading(false);
            dispatch({ type: "MESSAGE", payload: response.data['message'] });
            // sessionStorage.setItem("message", response.data['message']);
        } else {
            setLoading(false);
        }

        console.log("Body : ", body)
    }

    return (
        <>
            <Layout>
                {/* <!-- Content Header (Page header) --> */}
                <div class="content-header">
                    <div class="container-fluid">
                        {loading && <div class="loader"></div>}
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0">Modules</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Modules</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Main content --> */}
                <section class="content">
                    <div class="container-fluid">
                        <div class="card card-info">
                            <div class="card-header">
                                <h3 class="card-title">Module List</h3>
                            </div>
                            {/* <!-- /.card-header --> */}
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <select class="form-control" value={status} onChange={(e) => handleStatus(e.target.value)}>
                                            <option value="">-- Select Status --</option>
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>

                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        {status == 1 && <a class="btn btn-success" onClick={handleActiveModule}>Active Module</a>}
                                    </div>
                                    <div class="col-sm-6">
                                        <a class="btn btn-primary float-right" href="/addModule">Add Module</a>
                                    </div>
                                </div>
                                <table id="example1" class="table table-bordered table-striped mt-2">
                                    <thead>
                                        <tr>
                                            {status == 1 && <th></th>}
                                            <th>Module ID</th>
                                            <th>Name</th>
                                            <th>Parent</th>
                                            <th>Role</th>
                                            <th>Icon</th>
                                            {status == 0 && <th>Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.length > 0 ? data.map((res) => (
                                                <tr key={res.id}>
                                                    {status == 1 && <td><input type="checkbox" value={res.id} onChange={() => handleCheckBox(res.id)} checked={checkboxIds.includes(res.id)} /></td>}
                                                    <td>{res.id}</td>
                                                    <td>{res.name}</td>
                                                    <td>{res.parent_name == '' ? '--' : res.parent_name}</td>
                                                    <td>{res.role_name}</td>
                                                    <td>{res.iconName}</td>
                                                    {status == 0 && <td>
                                                        <a href={`/addModule/${res.id}`} class="btn btn-info"><i class="fas fa-edit"></i></a>
                                                        <a href="#" class="btn btn-danger ml-2" onClick={() => handleDelete(res.id)}><i class="fas fa-trash"></i></a>
                                                    </td>}
                                                </tr>
                                            )) : (<tr><td colspan="6">No records found!</td></tr>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                            {/* <!-- /.card-body --> */}
                        </div>
                    </div>
                </section>
                {/* <!-- /.content --> */}

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={deleteItem}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>


            </Layout>
        </>
    );
};

export default Modules;