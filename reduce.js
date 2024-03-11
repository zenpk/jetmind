const fs = require("fs").promises;
// reduce duplicated definitions
const keySettings = new Map();
const settingsKey = new Map();
fs.readFile("./raw.json", "utf8")
  .then((data) => {
    const obj = JSON.parse(data);

    // cascading settings
    obj.tokenColors.forEach((token) => {
      const scope = token.scope;
      const keys = [];
      if (typeof scope === "string") {
        keys.push(scope);
      } else {
        scope.forEach((key) => {
          keys.push(key);
        });
      }
      keys.forEach((key) => {
        keySettings.set(key, token.settings);
      });
    });

    // combine scopes
    keySettings.forEach((v, k) => {
      const objKey = JSON.stringify(v, null, 0);
      if (settingsKey.has(objKey)) {
        const value = settingsKey.get(objKey);
        let scopes = [];
        if (typeof value === "string") {
          scopes.push(value);
        } else {
          scopes = value;
        }
        scopes.push(k);
        settingsKey.set(objKey, scopes);
      } else {
        settingsKey.set(objKey, k);
      }
    });

    // replace output obj
    const combined = [];
    settingsKey.forEach((v, k) => {
      combined.push({
        scope: v,
        settings: JSON.parse(k),
      });
    });
    obj.tokenColors = combined;

    // output
    const jsonString = JSON.stringify(obj, null, 2);
    fs.writeFile("./themes/JetMind-color-theme.json", jsonString, "utf8");
  })
  .catch((e) => {
    console.log(e);
  });
