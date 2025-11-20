import "./src/index.js";

// graceful shutdown
const shutdown = async () => {
  logger.info('Shutting down');
  server.close();
  try {
    await prisma.$disconnect();
  } catch (e) {
    logger.error({ e }, 'prisma disconnect failed');
  }
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
