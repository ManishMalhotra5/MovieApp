class ApiError extends Error {
	constructor(statusCode, message = "", errors = [], stack = "") {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
		this.data = null;
		this.success = false;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export default ApiError;
