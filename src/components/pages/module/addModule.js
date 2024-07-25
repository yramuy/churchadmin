import { useEffect, useState } from "react";
import Layout from "../../layout";
import { PostAttachmentService } from "../../api";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from "./fetchData";
import { useDispatch } from "react-redux";


const AddModule = () => {

    const [parentId, setParentId] = useState("");
    const [moduleName, setModuleName] = useState("");
    const [icon, setIcon] = useState(null);
    const [roleId, setRoleId] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isActive, setIsActive] = useState(1);
    const { moduleId } = useParams();
    const [module, setModule] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        GetModules();
    }, []);

    useEffect(() => {
        getModuleDataById();
    }, [moduleId]);

    const getModuleDataById = async () => {
        console.log("addmodule")
        if (moduleId) {
            setLoading(true);
        }

        setId(moduleId);

        try {
            const body = JSON.stringify({ id: moduleId });
            const response = await axios.post('/mobileapi/api/moduleData', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data['status'] == '200') {
                setLoading(false);
                const moduleData = response.data['ModuleData'];
                setModule(response.data['ModuleData']);
                setParentId(moduleData['parent_id']);
                setModuleName(moduleData['name']);
                setRoleId(moduleData['role_id']);
                if (response.data['ModuleData']['is_active'] == 0) {
                    setChecked(true);
                } else {
                    setChecked(false);
                }

                // navigate('/modules');
            } else {
                // navigate('/addModule');
            }
        } catch (error) {

        }
    }

    console.log("Module : ", module)

    const saveModule = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('id', id);
        formData.append('parentId', parentId);
        formData.append('moduleName', moduleName);
        formData.append('icon', icon);
        formData.append('roleId', roleId);

        try {
            const response = await axios.post('/mobileapi/api/saveModule', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data['status'] == '200') {
                navigate('/modules');
                setLoading(false);
            } else {
                setLoading(false);
                navigate('/addModule');
            }
            dispatch({ type: "MESSAGE", payload: response.data['message']});

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            navigate('/addModule');
            dispatch({ type: "MESSAGE", payload: "Internal error occured, please contact to system administator"});
        }
    }

    const handleCancel = () => {
        navigate('/modules');
    }

    const GetModules = async () => {
        const result = await fetchData(id);
        setData(result);
    }

    const handleCheckbox = (event) => {
        setIsActive(event.target.checked ? 0 : 1);
        setChecked(!checked);
    }

    console.log("isactive", isActive)


    return (
        <>
            <Layout>
                {/* <!-- Content Header (Page header) --> */}
                <div class="content-header">
                    <div class="container-fluid">
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
                        {loading && <div class="loader"></div>}
                        <div class="card card-info">
                            <div class="card-header">
                                <h3 class="card-title">{moduleId ? 'Edit' : 'Add'} Module</h3>
                            </div>
                            {/* <!-- /.card-header --> */}
                            <form class="form-horizontal" method="post" encType="multipart/form-data" id="moduleForm" onSubmit={saveModule}>
                                <div class="card-body">
                                    <input type="hidden" value={id} />
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Modules <em class="star">*</em></label>
                                        <div class="col-sm-10">
                                            <select class="form-control" id="parent_id" name="parent_id" value={parentId} onChange={(e) => setParentId(e.target.value)}>
                                                <option value="0">-- Select Module --</option>
                                                {
                                                    data.map((res) => (
                                                        <option value={res.id}>{res.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Module Name <em class="star">*</em></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="name" name="name" value={moduleName} required onChange={(e) => setModuleName(e.target.value)} />
                                        </div>
                                    </div>
                                    {moduleId && <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label"></label>
                                        <img src={module['icon_path']} alt="Description of Image" width={100} height={100} style={{ marginLeft: '10px' }} />
                                    </div>}

                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Module Icon <em class="star">*</em></label>
                                        <div class="col-sm-10">
                                            <input type="file" class="form-control" id="icon" name="icon" onChange={(e) => setIcon(e.target.files[0])} />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Roles <em class="star">*</em></label>
                                        <div class="col-sm-10">
                                            <select class="form-control" id="role_id" name="role_id" value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
                                                <option value="0">-- Select Role --</option>
                                                <option value="2">Finance</option>
                                                <option value="3">Administrative</option>
                                                <option value="4">Saint</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Is Active <em class="star">*</em></label>
                                        <div class="col-sm-10">
                                            <input type="checkbox" name="is_active" value={isActive} checked={checked} onChange={handleCheckbox} />
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer">
                                    <div>
                                        <div class="row">
                                            <div class="col-sm-1">
                                                <button type="submit" class="btn btn-info" name="btnSave">{moduleId ? 'Update' : 'Save'}</button>
                                            </div>
                                            <div class="col-sm-1 ml-3">
                                                <button type="button" class="btn btn-default" name="btnCancel" onClick={handleCancel}>Cancel</button>
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
            </Layout>
        </>
    );
};

export default AddModule;