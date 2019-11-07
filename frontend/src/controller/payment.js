var Swal = require('sweetalert2');
var axios = require('axios');

module.exports = {
    /**
     * This function is using for input data directly
     * @param {string} provider_name provider name
     * @example
     * data_array = [{
     *      provider_name: "Viettel",
     *      value: {
     *          data: [{ 
     *              money: "1.000 VND", 
     *              chip:"100.000 Chips",
     *              bonus:"1%"}]
     *      }
     * }]    
     */
    PaymentInput(list_input) {
        return list_input
    },

    ListPrice(url, params) {
        return axios({ method: 'get', url: url ,params: params})
            .then(result => {
                return result
            })
    },

    PayingRequest(url, data) {
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
            method: 'post',
            url: url,
            data: data
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

    }

}