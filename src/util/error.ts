export default class ErrorResponse {
	status = 500;
	errorMessage = "Internal Server Error";

	constructor(status: number, message: string) {
		this.status = status;
		this.errorMessage = message;
	}
}
