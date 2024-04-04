$(document).ready(function () {
  let spacingUnit = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--spacing-unit"
    )
  ); // get --spacing-unit value
  spacingUnit = spacingUnit * 1.4;
  let counter = 0;
  let numSlides = $(".process-slide").length;
  let rowIndex = calculateRowIndex(numSlides);

  // Function to update layout on resize
  function updateLayout() {
    rowIndex = calculateRowIndex(numSlides); // Recalculate rowIndex on resize
    $(".process-slide").each(function (index) {
      let topValue = spacingUnit * counter;
      $(this).css("top", topValue + "rem"); // replace 'em' with the unit of your --spacing-unit
      counter++;
      if (counter >= rowIndex) {
        counter = 0; // Reset the counter after every rowIndex element
      }
    });
  }

  // Initial layout setup
  updateLayout();

  // Bind resize event handler
  $(window).resize(function () {
    updateLayout();
  });
});

function calculateRowIndex(numSlides) {
  let totalWidthGrid = $(".process-grid").width();
  let slideWidth = $(".process-slide").width();
  let rowFactor = Math.floor(totalWidthGrid / slideWidth);
  return rowFactor; // Return the largest perfect square
}
