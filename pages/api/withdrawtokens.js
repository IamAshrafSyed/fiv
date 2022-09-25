export default function handler(req, res) {
	if (req.method === "GET") {
		res.status(200).send("success");
	}
	if (req.method === "POST") {
		const { address } = req.body;
		const { value } = req.body;
		res.status(200).json({
			message: "success",
			method: "POST",
			address,
			value,
		});
		console.log(value);
	}
}
