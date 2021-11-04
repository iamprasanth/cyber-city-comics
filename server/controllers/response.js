// Common function for returning a success response with appropriate data
exports.succesResponse = (res, data) => {
    res.status(200).json(data);
}

// Common function for returning an error response with appropriate status code & message
exports.errorResponse = (res, status, message) => {
    res.status(status).json({ message });
}
