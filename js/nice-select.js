/**
 * @file
 * Initialize niceSelect using Drupal's global once utility.
 */

(function ($, Drupal, once) {
  Drupal.behaviors.niceSelect = {
    attach(context) {
      // Define an array of specific selectors you want to EXCLUDE.
      const excludedSelectors = [".dropdowns-simple-select select"];

      // Join the selectors into a single string for the :not() pseudo-class.
      const excludedString = excludedSelectors.join(", ");

      // Use :not() to select all <select> elements EXCEPT for those in the array.
      once("nice-select", `select:not(${excludedString})`, context).forEach(
        (select) => {
          $(select).niceSelect();
        }
      );
    },
  };
})(jQuery, Drupal, window.once);
