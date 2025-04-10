const fs = require("fs");
const readline = require("readline");
const bcrypt = require("bcrypt");
require("dotenv").config();

const envPath = ".env";
const saltRounds = 10;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askInput = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
};

const loadEnv = () => {
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, "");
  }

  const envContent = fs.readFileSync(envPath, "utf-8");
  const envLines = envContent.split("\n");

  const envMap = {};
  for (let line of envLines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length > 0) {
      envMap[key.trim()] = rest.join("=").trim();
    }
  }

  return { envMap, envLines };
};

const saveEnv = (envLines, key, value) => {
  const keyIndex = envLines.findIndex((line) => line.startsWith(`${key}=`));
  const newLine = `${key}=${value}`;
  if (keyIndex !== -1) {
    envLines[keyIndex] = newLine;
  } else {
    envLines.push(newLine);
  }
  fs.writeFileSync(envPath, envLines.join("\n"));
};

const main = async () => {
  const { envMap, envLines } = loadEnv();

  let apiKey = envMap.APP_API_KEY;
  let hashedApiKey = envMap.APP_API_KEY_HASH;

  if (apiKey && hashedApiKey) {
    console.log(`\nAPI KEY = ${hashedApiKey}\n`);
    return;
  }

  if (!apiKey) {
    apiKey = await askInput("Masukkan API key yang ingin di-hash: ");
    rl.close();
    if (!apiKey) {
      console.log("API key tidak boleh kosong.");
      process.exit(1);
    }
    envLines.push(`APP_API_KEY=${apiKey}`);
    console.log("APP_API_KEY telah disimpan ke .env");
  } else {
    rl.close();
    console.log("APP_API_KEY ditemukan di .env");
  }

  const hashedKey = await bcrypt.hash(apiKey, saltRounds);
  saveEnv(envLines, "APP_API_KEY_HASH", hashedKey);
  console.log("APP_API_KEY_HASH berhasil disimpan ke .env");
  console.log(`\nAPI KEY = ${hashedKey}\n`);
};

module.exports = main();
