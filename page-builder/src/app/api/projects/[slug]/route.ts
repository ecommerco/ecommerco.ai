import { promises as fs } from "fs";
import path from "path";

function safeSlug(input: string) {
  const trimmed = (input || "").trim();
  const normalized = trimmed.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-");
  return normalized || "home";
}

function getProjectPath(slug: string) {
  const dataDir = path.join(process.cwd(), ".data", "projects");
  const filename = `${safeSlug(slug)}.json`;
  return { dataDir, filePath: path.join(dataDir, filename) };
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { dataDir, filePath } = getProjectPath(params.slug);
  await fs.mkdir(dataDir, { recursive: true });

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return Response.json(JSON.parse(raw));
  } catch {
    return Response.json({});
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { dataDir, filePath } = getProjectPath(params.slug);
  await fs.mkdir(dataDir, { recursive: true });

  const data = await req.json();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  return Response.json({ ok: true });
}
