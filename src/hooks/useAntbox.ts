import { NodeServiceClient } from "@/deps";

export default function useAntbox() {
  const antboxUrl = process.env.ANTBOX_URL ?? "";
  const antboxTenant = process.env.ANTBOX_TENANT ?? "";

  const nodeServiceClient = new NodeServiceClient({ url: antboxUrl, tenant: antboxTenant });

  return { nodeServiceClient };
}
