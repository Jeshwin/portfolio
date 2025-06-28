export async function GET(request: Request) {
    return Response.json({test: "works!"}, {status: 200});
}
