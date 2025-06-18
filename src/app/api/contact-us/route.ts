export async function GET() {
  const option = { status: 200, headers: { "Content-Type": "text/plain" } };
  return new Response("Hello, Next.js! API", option);
}
