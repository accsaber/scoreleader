export default function jsonResponse(
	object: Parameters<typeof JSON.stringify>[0],
) {
	return new Response(JSON.stringify(object, undefined, 2), {
		headers: {
			"content-type": "application/json",
		},
	});
}
