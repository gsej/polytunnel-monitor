export type PiStatus = {
  node: string;
  uptime: string;
  memory: string;
  cpu: string;
  temperature: string;
  fanspeed: string;
  disk: {
    total: string;
    used: string;
    available: string;
  };
}
