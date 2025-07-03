/**
 * @file
 * All Sliders of the site will go here.
 */
(function ($, Drupal) {
  Drupal.behaviors.sliders = {
    attach(context, settings) {
      // === FLEX FIX FOR SLIDERS ===
      const flexFixedSliders = [".hero-carousel", ".all-events"];

      function applyFlexFix(selector) {
        const $slider = $(selector, context);

        function setWidth() {
          $slider.each(function () {
            const $el = $(this);
            const $parent = $el.parent();
            if ($parent.length) {
              $el.width($parent.width());
            }
          });
        }

        // Run once DOM is painted
        requestAnimationFrame(() => {
          setWidth();
          // Run again after a delay (in case images/fonts load late)
          setTimeout(setWidth, 200);
        });
        // Also run on window resize
        $(window).on("resize", setWidth);

        // Run again when everything finishes loading
        $(window).on("load", setWidth);
      }

      flexFixedSliders.forEach((selector) => {
        applyFlexFix(selector);
      });

      // === HERO CAROUSEL SLIDER ===
      const $heroCarousel = $(".hero-carousel", context);
      $heroCarousel.not(".slick-initialized").slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        prevArrow: $(".arrows__left", context),
        nextArrow: $(".arrows__right", context),
      });

      // === EVENTS SLIDER ===
      const $eventSlider = $(".all-events", context);
      $eventSlider.not(".slick-initialized").slick({
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: true,
        mobileFirst: true,
        slidesToScroll: 1,
        prevArrow: $(".events-with-arrows__left", context),
        nextArrow: $(".events-with-arrows__right", context),
        responsive: [
          {
            breakpoint: 1280,
            settings: { slidesToShow: 2 },
          },
        ],
      });
    },
  };
})(jQuery, Drupal);
