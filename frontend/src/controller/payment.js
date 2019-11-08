var Swal = require('sweetalert2');
var axios = require('axios');

module.exports = {
    /**
     * 
     * @param {string} method Axios method , see more at https://github.com/axios/axios
     * @param {string} url server url
     * @param {*} header for adding token
     * @param {*} param for adding params , sort , filter or paginate
     * @param {*} data for request data to server
     */
    PaymentAPI(method, url, header, param, data) {
        return axios({
            method: method,
            url: url,
            headers: header,
            params: param,
            data: data
        }).then(result => {
            return result
        })
    },

    /**
     * 
     * @param {*} url server url
     * @param {*} data for request data to server
     */
    PayingRequest(method,url, data,header) {
        Swal.fire({
            title: "Processing",
            text: "Please wait",
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 2000,
            onOpen: () => {
                Swal.showLoading();
            }
        })
        axios({
            method: method,
            url: url,
            data: data,
            headers:header
        }).then(result => {
            if (result.data.code != 1000) {
                Swal.fire({
                    title: "Failed!",
                    type: "error",
                    text: `${result.data.message}`,
                    showConfirmButton: true
                });

            } else {
                Swal.fire({
                    title: "Finished!",
                    type: "success",
                    text: `${result.data.message}`,
                    showConfirmButton: true
                });
            }
        })

    },


}