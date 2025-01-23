import { buildApp } from "./app";

const port = Number(process.env.PORT) || 3000;
const app = buildApp();

async function main(): Promise<void> {
  try {
    await app.listen({ port });
    app.log.info(`Server works on port: ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
