const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");
const fs = require("fs");

function createPixelTestCaseReport(reportObject) {
  moveImagesToLocal(reportObject);
  createDiffImagesPixel(reportObject);
  const html = generateHTML(reportObject);
  fs.writeFileSync(`${reportObject.outputResults}/report.html`, html);
  fs.copyFileSync(
    "./regression_tools/index-testcase.css",
    `${reportObject.outputResults}/index.css`
  );
}

function moveImagesToLocal(reportObject) {
  reportObject.imagesToCompare.forEach((images) => {
    const basePath = `${reportObject.outputResults}/base_${images.base
      .split("/")
      .pop()}`;
    fs.copyFileSync(images.base, basePath);
    images.base = basePath;

    const rcPath = `${reportObject.outputResults}/rc_${images.rc
      .split("/")
      .pop()}`;
    fs.copyFileSync(images.rc, rcPath);
    images.rc = rcPath;
  });
}

function createDiffImagesPixel(reportObject) {
  const options = {
    threshold: 0.1,
    includeAA: true,
    alpha: 0.1,
    aaColor: [255, 0, 0],
    diffColor: [255, 0, 255],
  };

  let i = 0;
  for (const images of reportObject.imagesToCompare) {
    const img1 = PNG.sync.read(fs.readFileSync(images.base));
    const img2 = PNG.sync.read(fs.readFileSync(images.rc));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    pixelmatch(img1.data, img2.data, diff.data, width, height, options);
    fs.writeFileSync(
      `${reportObject.outputResults}/diff-${i}.png`,
      PNG.sync.write(diff)
    );
    i++;
  }
}

function generateHTML(reportObject) {
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
              .map((img, i) => generateBody(img, i))
              .join("")}
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/lightbox2/dist/js/lightbox-plus-jquery.min.js"></script>
      </body>
    </html>`;
}

function generateBody(img, i) {
  i++;
  return `
    <div class="comparison-case">
      <div class="comparison-header">Paso ${i}</div>
      <div class="row">
        <div class="col-md-4 image-container">
          <a href="${
            img.base
          }" data-lightbox="paso-${i}" data-title="Paso ${i}">
            <img src="${img.base}"/>
          </a>
          <div class="image-label">Imagen Base</div>
        </div>
        <div class="col-md-4 image-container">
          <a href="${img.rc}" data-lightbox="paso-${i}" data-title="Paso ${i}">
            <img src="${img.rc}"/>
          </a>
          <div class="image-label">Imagen RC</div>
        </div>
        <div class="col-md-4 image-container">
          <a href="diff-${
            i - 1
          }.png" data-lightbox="paso-${i}" data-title="Paso ${i}">
            <img src="diff-${i - 1}.png"/>
          </a>
          <div class="image-label">Imagen Diferencia</div>
        </div>
      </div>
    </div>`;
}

module.exports = {
  createPixelTestCaseReport,
};
