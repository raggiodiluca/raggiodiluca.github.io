$(document).ready(function () {
  let totalWidth = $(".menu.under").width();
  let labelHeight = $(".menu-label").height();
  let labelWidth = $(".menu-label").width();
  let radius = labelHeight;
  let leftFactor =
    ((totalWidth - $(".selected").position().left) / totalWidth) * 100;
  let rightFactor =
    ((labelWidth + $(".selected").position().left) / totalWidth) * 100;

  $(".menu.over").css(
    "clip-path",
    "inset(0% " +
      leftFactor +
      "% 0% " +
      rightFactor +
      "% round " +
      radius +
      "px )"
  );

  $(".menu.under").on({
    mousemove: function (event) {
      x = event.clientX - $(this).offset().left - labelWidth / 2;
      leftFactor = ((totalWidth - x) / totalWidth) * 100;
      rightFactor = ((labelWidth + x) / totalWidth) * 100;
      $(".menu.over").css(
        "clip-path",
        "inset(0% " +
          leftFactor +
          "% 0% " +
          rightFactor +
          "% round " +
          radius +
          "px )"
      );
      $(".menu.over").css("transition", "none");
    },
    mouseleave: function () {
      let leftFactor =
        ((totalWidth - $(".selected").position().left) / totalWidth) * 100;
      let rightFactor =
        ((labelWidth + $(".selected").position().left) / totalWidth) * 100;
      $(".menu.over").css(
        "clip-path",
        "inset(0% " +
          leftFactor +
          "% 0% " +
          rightFactor +
          "% round " +
          radius +
          "px )"
      );
      $(".menu.over").css("transition", "clip-path .3s ease-out .15s");
    },
  });

  $(".menu-label").click(function () {
    // Remove selected class from all menu-labels
    $(".menu-label").removeClass("selected");
    // Add selected class to the clicked element
    $(this).addClass("selected");
  });
});
