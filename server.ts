import express from "express";
import { createServer as createViteServer } from "vite";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/research/run", (req, res) => {
    const lastRunFile = path.join(process.cwd(), "src/tools/output/last-run.txt");
    const statusFile = path.join(process.cwd(), "src/tools/output/research-status.json");
    
    // Check if it was run today
    if (fs.existsSync(lastRunFile)) {
      const lastRun = fs.readFileSync(lastRunFile, "utf-8");
      const lastRunDate = new Date(lastRun).toDateString();
      const today = new Date().toDateString();
      
      if (lastRunDate === today) {
        return res.status(429).json({ error: "Research job has already been run today." });
      }
    }

    if (fs.existsSync(statusFile)) {
      const status = JSON.parse(fs.readFileSync(statusFile, "utf-8"));
      if (status.status === "running") {
        return res.status(429).json({ error: "Research job is already running." });
      }
    }

    fs.writeFileSync(statusFile, JSON.stringify({ status: "running", startedAt: new Date().toISOString() }));

    // Run the research script asynchronously
    const scriptPath = path.join(process.cwd(), "src/tools/research.js");
    
    exec(`node ${scriptPath} --apply`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        fs.writeFileSync(statusFile, JSON.stringify({ status: "error", error: error.message, finishedAt: new Date().toISOString() }));
        return;
      }
      
      // Update last run time
      fs.writeFileSync(lastRunFile, new Date().toISOString());
      fs.writeFileSync(statusFile, JSON.stringify({ status: "success", finishedAt: new Date().toISOString() }));
    });
    
    res.json({ status: "started", message: "Research job started in the background." });
  });

  app.get("/api/research/status", (req, res) => {
    const statusFile = path.join(process.cwd(), "src/tools/output/research-status.json");
    if (fs.existsSync(statusFile)) {
      const status = JSON.parse(fs.readFileSync(statusFile, "utf-8"));
      res.json(status);
    } else {
      res.json({ status: "idle" });
    }
  });

  app.post("/api/submissions", (req, res) => {
    try {
      const submissionsFile = path.join(process.cwd(), "src/data/submissions.json");
      let submissions = [];
      
      if (fs.existsSync(submissionsFile)) {
        submissions = JSON.parse(fs.readFileSync(submissionsFile, "utf-8"));
      }
      
      const newSubmission = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        status: "pending",
        ...req.body
      };
      
      submissions.push(newSubmission);
      fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));
      
      res.json({ success: true, submission: newSubmission });
    } catch (error) {
      console.error("Error saving submission:", error);
      res.status(500).json({ error: "Failed to save submission" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
