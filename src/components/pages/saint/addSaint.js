import Layout from "../../layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap';


const AddSaint = () => {

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
                                <h1 class="m-0">Add Saint</h1>
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
                                <h3 class="card-title">Add Saint</h3>
                            </div>
                            {/* <!-- /.card-header --> */}

                            <form>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">First Name</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Firstname" />
                                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Last Name</label>
                                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Lastname" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
                                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Mobile Number</label>
                                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Mobile Number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">User Name</label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter User Name" />
                                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Password</label>
                                                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="exampleRadio">Gender</label>
                                            <div class="form-group">

                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                    <label class="form-check-label" for="inlineRadio1">Male</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                    <label class="form-check-label" for="inlineRadio2">Female</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Type</label>
                                                <select class="form-control" id="exampleFormControlSelect2">
                                                    <option>--Select--</option>
                                                    <option>Brother</option>
                                                    <option>Sister</option>
                                                    <option>Young Workings</option>
                                                    <option>College Students</option>
                                                    <option>Children</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">DOB</label>
                                                <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter User Name" />
                                                {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Age</label>
                                                <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Enter Age" maxlength="2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlTextarea1">Description</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div>
                                        <div class="row">
                                            <div class="col-sm-1">
                                                <button type="submit" class="btn btn-info" name="btnSave">Save</button>
                                            </div>
                                            <div class="col-sm-1 ml-3">
                                                <button type="button" class="btn btn-default" name="btnCancel" onClick="">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

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

export default AddSaint;