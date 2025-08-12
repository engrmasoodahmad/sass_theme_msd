/**
 * @file
 * Initialize niceSelect using Drupal's global once utility.
 */

(function ($, Drupal, once) {
  Drupal.behaviors.niceSelect = {
    attach(context) {
      once("nice-select", "select", context).forEach((select) => {
        $(select).niceSelect();
      });
    },
  };
})(jQuery, Drupal, window.once);
