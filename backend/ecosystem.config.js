module.exports = {
  apps: [{
    name: "result-declaration-backend",
    script: "src/index.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      PORT: 5000
    }
  }]
}
