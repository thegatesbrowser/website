import fs from "node:fs";
import path from "node:path";

import mixpanel from "mixpanel";

const tokenFilePath = path.join(process.cwd(), "config", "mixpanel-token.txt");

let cachedClient: mixpanel.Mixpanel | null = null;
let tokenLoadAttempted = false;

function readToken(): string | null {
  try {
    const raw = fs.readFileSync(tokenFilePath, "utf8").trim();
    return raw.length > 0 ? raw : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export function getMixpanelClient(): mixpanel.Mixpanel | null {
  if (cachedClient) {
    return cachedClient;
  }

  if (tokenLoadAttempted) {
    return null;
  }

  tokenLoadAttempted = true;
  const token = readToken();

  if (!token) {
    console.warn("Mixpanel token not found. Skipping analytics.");
    return null;
  }

  cachedClient = mixpanel.init(token, {
    protocol: "https",
  });

  return cachedClient;
}

export type MixpanelEvent = {
  distinct_id?: string;
  event: string;
  properties?: Record<string, unknown>;
};

export async function trackEvent({ event, distinct_id, properties }: MixpanelEvent): Promise<void> {
  const client = getMixpanelClient();

  if (!client) {
    return;
  }

  const payload: Record<string, unknown> = {
    ...properties,
  };

  if (distinct_id) {
    payload.distinct_id = distinct_id;
  }

  await new Promise<void>((resolve) => {
    client.track(event, payload, (err) => {
      if (err) {
        console.error("Mixpanel track error", err);
      }
      resolve();
    });
  });
}

