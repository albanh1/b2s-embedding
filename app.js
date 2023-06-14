const url =
  "https://public.tableau.com/views/B2SEmbedding/Embedding?:language=en-US&:display_count=n&:origin=viz_share_link";
const containerDiv = document.getElementById("vizContainer");
let viz;
const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};
const exportpdfbutton = document.getElementById("exportPDF");
const exportpptbutton = document.getElementById("exportPPT");
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // Need to get active sheet, but this could be a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  // inspet the sheets you need to filter
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  // index of the sheet you want to filter
  const sheetToFilter = sheets[0];
  // Do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("viz filtered"));
}
exportpdfbutton.addEventListener("click", exportPDFfunction);
exportpptbutton.addEventListener("click", exportPPTfunction);
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);

document.addEventListener("DOMContentLoaded", initViz);
