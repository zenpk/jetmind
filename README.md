# JetMind

A VSCode color theme inspired by JetBrains' Dark and IdeaVim. Based on Default Dark +

![demo](https://raw.githubusercontent.com/zenpk/jetmind/main/demo.png)

NOTE: Please turn on semantic highlighting for best results!

NOTE: This theme is currently under active development and colors may change at any time. Any suggestions are welcome!

## Build

1. Add your colors to `settings.json`
2. `Ctrl+Shift+P` -> Developer: Generate Color Theme From Current Settings
3. Copy the generated JSON to `raw.json`
4. Copy the semantic color settings to `semantic.json`
5. `node build.js` -> outputs to `themes/JetMind-color-theme.json`

## Recommended Settings

```json
{
  "window.zoomLevel": 1,
  "editor.fontFamily": "'JetBrainsMonoNL Nerd Font Mono', 'JetBrains Mono'",
  "editor.fontLigatures": false,
  "editor.fontSize": 13,
  "editor.lineHeight": 22,
  "workbench.tree.indent": 16,
  "debug.console.fontSize": 13,
  "terminal.integrated.fontSize": 13
}
```
