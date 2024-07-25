import axios from "axios";

export const fetchData = async (status) => {
    console.log("Status : ",status)
    try {
         const body = JSON.stringify({
            status: status
         });
        const response = await axios.post("/mobileapi/api/modules", body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const data = response.data;
        const mdata = data.modules;

        // sessionStorage.setItem('message', data.message);
        return mdata;
    } catch (error) {
        console.error('Fetch data failed:', error);
        throw error;
    }
};