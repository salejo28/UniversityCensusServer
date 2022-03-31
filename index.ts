import App from "app/app";

async function main() {
  const app = new App(4000);
  await app.listen();
  await app.ProofDB();
}

if (require.main === module) {
  main();
}
