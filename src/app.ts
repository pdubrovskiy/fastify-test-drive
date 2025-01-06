import Fastify from "fastify";

const PORT = 3000;
const fastify = Fastify({ logger: true });

async function main() {
  try {
    await fastify.listen({ port: PORT });

    fastify.log.info(`Server works on port: ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
