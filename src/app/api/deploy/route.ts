import { handleDeploymentHook } from "../../../lib/deployment-hook";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleDeploymentHook(request, {
    secret: process.env.DEPLOY_WEBHOOK_SECRET,
    endpoint: process.env.COOLIFY_WEBHOOK_URL,
  });
}
