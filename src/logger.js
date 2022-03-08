import bunyan from "bunyan";

const logger = bunyan.createLogger({
	name: "API",
	hostname: "localhost",
});

export default logger;
