export async function GET() {
  const url = process.env.SUPABASE_URL || "";
  try {
    const u = new URL(url);
    return Response.json({
      ok: true,
      host: u.hostname,
      port: u.port,
      pathname: u.pathname,
      hasSsl: u.searchParams.get("sslmode"),
      pgbouncer: u.searchParams.get("pgbouncer"),
      connection_limit: u.searchParams.get("connection_limit"),
    });
  } catch {
    return Response.json({ ok: false, raw: url.slice(0, 40) + "..." }, { status: 200 });
  }
}
