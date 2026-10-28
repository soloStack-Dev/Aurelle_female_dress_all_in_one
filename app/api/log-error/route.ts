import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Local error sink for the ErrorLog convention.
 *
 * Writes one JSON line per client error to `ErrorLog/runtime-errors.log`.
 * Hosted/serverless environments may have a read-only filesystem; in that case
 * the route still returns 202 and the client ignores the failure.
 */
function clean(value: unknown, max = 4000) {
  return typeof value === "string" ? value.slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const record = {
      timestamp: new Date().toISOString(),
      context: clean(body.context, 200) || "unknown",
      message: clean(body.message, 2000) || "No message",
      digest: clean(body.digest, 200),
      url: clean(body.url, 1000),
      userAgent: clean(body.userAgent, 500),
      stack: clean(body.stack, 4000),
    };

    const directory = path.join(process.cwd(), "ErrorLog");
    await mkdir(directory, { recursive: true });
    await appendFile(
      path.join(directory, "runtime-errors.log"),
      `${JSON.stringify(record)}\n`,
      "utf8",
    );

    return Response.json({ ok: true });
  } catch {
    // Never surface logging failures to the visitor.
    return Response.json({ ok: false }, { status: 202 });
  }
}
