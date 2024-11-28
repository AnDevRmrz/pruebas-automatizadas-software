const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");
const fs = require("fs");
const path = require("path");
const directoryInputBase = "./test-results";
const directoryOutputBase = "./vrt/output";

function createVRTReport() {
  cleanOutput();
  const directoryList = readDirectoryList(directoryInputBase);
  for (const directory of directoryList) {
    createTestCaseReport(directory);
  }
  const html = generateHTMLIndex();
  fs.writeFileSync(
    `${path.join(
      directoryOutputBase,
      "index.html"
    )}`,
    html
  );
  fs.copyFileSync(
    "./vrt/report/index.css",
    `${path.join(directoryOutputBase, 'index.css')}`
  );
}

function cleanOutput() {
  if (fs.existsSync(directoryOutputBase)) {
    fs.rmSync(directoryOutputBase, { recursive: true, force: true });
  }
}

function createTestCaseReport(directoryPath) {
  const reportObject = buildReportObject(directoryPath);
  createDiffImages(reportObject);
  const html = generateHTMLTestCase(reportObject);
  fs.writeFileSync(
    `${path.join(
      directoryOutputBase,
      reportObject.scenarioToTest,
      "report.html"
    )}`,
    html
  );
  fs.copyFileSync(
    "./vrt/report/index-testcase.css",
    `${path.join(directoryOutputBase, reportObject.scenarioToTest, 'index.css')}`
  );
}

function readDirectoryList(directoryPath) {
  return fs
    .readdirSync(directoryPath)
    .map((dir) => path.join(path.resolve(directoryPath), dir));
}

function buildReportObject(directoryPath) {
  const chromeImages = fs
    .readdirSync(path.join(directoryPath, "chromium"))
    .map((file) =>
      path.join(path.resolve(path.join(directoryPath, "chromium")), file)
    );
  const firefoxImages = fs
    .readdirSync(path.join(directoryPath, "firefox"))
    .map((file) =>
      path.join(path.resolve(path.join(directoryPath, "firefox")), file)
    );

  if (chromeImages.length !== firefoxImages.length)
    throw new Error("Chrome and Firefox Images quantity must be the same");

  imagesToCompare = [];
  for (let i = 0; i < chromeImages.length; i++) {
    imagesToCompare.push({
      chrome: chromeImages[i],
      firefox: firefoxImages[i],
      diff: "",
    });
  }

  return {
    scenarioToTest: directoryPath.split("\\").pop(),
    imagesToCompare,
  };
}

function createDiffImages(reportObject) {
  const options = {
    threshold: 0.1,
    includeAA: true,
    alpha: 0.1,
    aaColor: [255, 0, 0],
    diffColor: [255, 0, 255],
  };

  let i = 1;
  for (const images of reportObject.imagesToCompare) {
    const imgChrome = PNG.sync.read(fs.readFileSync(images.chrome));
    const imgFirefox = PNG.sync.read(fs.readFileSync(images.firefox));

    const { width, height } = imgChrome;
    const diff = new PNG({ width, height });

    pixelmatch(
      imgChrome.data,
      imgFirefox.data,
      diff.data,
      width,
      height,
      options
    );

    images.diff = path.resolve(
      `${directoryOutputBase}/${reportObject.scenarioToTest}/diff-${i++}.png`
    );

    const directory = path.dirname(images.diff);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(images.diff, PNG.sync.write(diff));
  }
}

function generateHTMLTestCase(reportObject) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reporte ${reportObject.scenarioToTest}</title>
        <link href="index.css" type="text/css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/lightbox2/dist/css/lightbox.min.css" rel="stylesheet" />
      </head>
      <body>
        <div class="container">
          <h1 class="mb-4 text-center">${reportObject.scenarioToTest}</h1>
          <div id="comparison-cases">
            ${reportObject.imagesToCompare
              .map((img, i) => generateBodyTestCase(img, i))
              .join("")}
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/lightbox2/dist/js/lightbox-plus-jquery.min.js"></script>
      </body>
    </html>`;
}

function generateBodyTestCase(img, i) {
  i++;
  return `
    <div class="comparison-case">
      <div class="comparison-header">Paso ${i}</div>
      <div class="row">
        <div class="col-md-4 image-container">
          <a href="${img.chrome}" data-lightbox="paso-${i}" data-title="Paso ${i}">
            <img src="${img.chrome}"/>
          </a>
          <div class="image-label">Chromium</div>
        </div>
        <div class="col-md-4 image-container">
          <a href="${img.firefox}" data-lightbox="paso-${i}" data-title="Paso ${i}">
            <img src="${img.firefox}"/>
          </a>
          <div class="image-label">Firefox</div>
        </div>
        <div class="col-md-4 image-container">
          <a href="${img.diff}" data-lightbox="paso-${i}" data-title="Paso ${i}">
            <img src="${img.diff}"/>
          </a>
          <div class="image-label">Diferencia</div>
        </div>
      </div>
    </div>`;
}

function generateHTMLIndex() {
  const directoryList = readDirectoryList(directoryOutputBase);
  const body = directoryList
    .map(
      (dir) =>
        `<a href="${path.join(
          dir,
          "report.html"
        )}" class="test-case-link">${dir.split("\\").pop()}</a>`
    )
    .join("");
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Test Case Index</title>
      <link href="index.css" type="text/css" rel="stylesheet">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
    </head>
    <body>
      <div class="index-container">
        <h1 class="text-center mb-4">Test Case Index</h1>
        <p>Select a test case to view its detailed comparison:</p>
        ${body}
      </div>
    </body>
  </html>`;
}

module.exports = {
  createVRTReport,
};
