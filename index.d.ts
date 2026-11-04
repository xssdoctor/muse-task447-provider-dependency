export interface ProviderHealthResult {
  text: string;
  status: number;
}

export function runProviderHealth(): Promise<ProviderHealthResult>;
