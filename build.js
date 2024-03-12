const fs = require("fs").promises;
// reduce duplicated definitions
const keySettings = new Map();
const settingsKey = new Map();
fs.readFile("./raw.json", "utf8")
  .then((data) => {
    const obj = JSON.parse(data);
    delete obj["$schema"];
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
        scopes.sort();
        settingsKey.set(objKey, scopes);
      } else {
        settingsKey.set(objKey, k);
      }
    });

    // replace output obj
    const combined = [];
    settingsKey.forEach((v, k) => {
      const settings = JSON.parse(k);
      if (Object.keys(settings).length > 0) {
        combined.push({
          scope: v,
          settings: settings,
        });
      }
    });
    obj.tokenColors = combined;
    fs.readFile("./semantic.json")
      .then((data) => {
        const semantic = JSON.parse(data);
        const outObj = { name: "JetMind", ...obj, ...semantic };
        // output
        const jsonString = JSON.stringify(outObj, null, 2);
        fs.writeFile("./themes/JetMind-color-theme.json", jsonString, "utf8");
      })
      .catch((e) => {
        console.log(e);
      });
  })
  .catch((e) => {
    console.log(e);
  });
