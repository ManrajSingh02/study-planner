import dotenv from "dotenv";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ quiet: true });

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/db.js");

const PORT = process.env.PORT || 5007;

const startServer = async () => {
  try {
    console.log("Starting backend...");
    console.log(`Configured port: ${PORT}`);

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Backend URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
