const errorCode = {
    "200": "OK",

    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "408": "Request Timeout",
    "409": "Conflict",

    "500": "Internal Server Error",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
};
class ErrorCode {
    CheckingError(codeNum, mess = "" | {}) {
        if (errorCode.hasOwnProperty(codeNum)) {
            if (mess == "") return {
                errCode: Number(codeNum),
                message: errorCode[codeNum]
            }
            return {
                errCode: Number(codeNum),
                message: mess
            }
        } else {
            return {
                errCode: codeNum,
                message: mess
            }
        }
    }
}
module.exports = new ErrorCode(); 