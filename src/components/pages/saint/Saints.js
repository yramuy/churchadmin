import Layout from "../../layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap';


const Saints = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [status, setStatus] = useState(0);
    const [checkboxIds, setCheckboxIds] = useState([]);
    // const [array, setArray] = useState([]);
    const dispatch = useDispatch();

    return (
        <>
            <Layout>
                {/* <!-- Content Header (Page header) --> */}
                <div class="content-header">
                    <div class="container-fluid">
                        {loading && <div class="loader"></div>}
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0">Saints</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Saints</li>
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
                                <h3 class="card-title">Saint List</h3>
                            </div>
                            {/* <!-- /.card-header --> */}
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <select class="form-control" value={status} onChange="">
                                            <option value="">-- Select Status --</option>
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>

                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        {status == 1 && <a class="btn btn-success" onClick="">Active Saint</a>}
                                    </div>
                                    <div class="col-sm-6">
                                        <a class="btn btn-primary float-right" href="/addSaint">Add Saint</a>
                                    </div>
                                </div>
                                <table id="example1" class="table table-bordered table-striped mt-2">
                                    <thead>
                                        <tr>
                                            {status == 1 && <th></th>}
                                            <th>Saint ID</th>
                                            <th>Name</th>
                                            <th>Parent</th>
                                            <th>Role</th>
                                            <th>Icon</th>
                                            {status == 0 && <th>Actions</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        

                                    </tbody>
                                </table>
                            </div>
                            {/* <!-- /.card-body --> */}
                        </div>
                    </div>
                </section>
                {/* <!-- /.content --> */}

                <Modal show={showModal} onHide="">
                    <Modal.Header>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick="">
                            Close
                        </Button>
                        <Button variant="danger" onClick="">
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>


            </Layout>
        </>
    );
};

export default Saints;