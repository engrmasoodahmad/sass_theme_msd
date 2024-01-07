/**
 * @file
 * All Sliders of the site will go here.
 */
(function ($, Drupal) {
	Drupal.behaviors.sliders = {
		attach(context, settings) {
			// JUST REUSE THIS CODE FOR SLIDER
			// HOME PAGE LOGO SLIDER
			let $sliderwrap = $(".logos__carousel");
			// fix for flex begins here ----
			function setW() {
				// use parent width, not always the right way
				// change it if your $sliderwrap parent width
				// does not match your $sliderwrap width
				$sliderwrap.width($sliderwrap.parent().width());
			}
			setW();
			window.addEventListener("resize", setW);
			// end fix here ----
			// instantiate the slider
			$sliderwrap.not(".slick-initialized").slick({
				infinite: true,
				speed: 300,
				slidesToShow: 6,
				autoplay: true,
				autoplaySpeed: 3000,
				pauseOnHover: true,
				arrows: false,
				responsive: [
					{
						breakpoint: 1280,
						settings: {
							slidesToShow: 4,
						},
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
						},
					},
				],
			});
		},
	};
})(jQuery, Drupal);
