const fs = require('fs');
const path = require('path');
const toml = require('toml');
const Mustache = require('mustache');
const currentWorkDirectory = process.cwd();

function readTpl(tplName) {
  return path.resolve(currentWorkDirectory, `./tpl/${tplName}`);
}

function readPageData() {
  const dataPath = path.resolve(currentWorkDirectory, './data/podcasts.toml');
  const tomlContent = fs.readFileSync(dataPath);
  return toml.parse(tomlContent);
}

function genHtml(pageData) {
  const tplPath = readTpl('index.mustache');
  const tplContent = fs.readFileSync(tplPath, 'utf-8');
  const renderedHtml = Mustache.render(tplContent, pageData);
  // create index.html
  const indexPath = path.resolve(currentWorkDirectory, './index.html');
  fs.writeFileSync(indexPath, renderedHtml);
}

function genReadme(pageData) {
  const tplPath = readTpl('readme.mustache');
  const tplContent = fs.readFileSync(tplPath, 'utf-8');
  const renderedContent = Mustache.render(tplContent, pageData);
  // create readme.md
  fs.writeFileSync(path.resolve(currentWorkDirectory, './readme.md'), renderedContent);
}


const pageData = readPageData();

genHtml(pageData);
genReadme(pageData);