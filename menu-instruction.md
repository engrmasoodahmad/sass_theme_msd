{# Menu Steps #}

1. Create a block for the logo with two fields - media image for logo (field_logo) and link (field_logo_link) for the logo
{# FOLLOWING IS THE BLOCK OVERRIDE FOR THE LOGO #}

{% set logoURL = file_url(content.field_logo[0]['#media'].field_media_image.entity.uri.value) %}
{% set logoAlt = content.field_logo[0]['#media'].field_media_image.alt %}
{% set logoLink = content.field_logo_link[0]["#url"] %}

<div class="logo-link-wrapper">
	<a class="logo-link-wrapper__link" href="{{ logoLink }}">
		<img src="{{ logoURL }}" alt="{{ logoAlt }}">
	</a>
</div>


2. Add the desired links in the main navigation
3. Place both the block logo and menu in the menubar region.
4. override the region.html.twig to region--menubar.html.twig

{% set classes = ['container', 'menu-wrapper'] %}
{% if content %}
	<div{{attributes.addClass(classes)}}>
		{{ content }}
		<div class="hamburger closed-menu">
			<div class="hamburger-open">
				<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 50 50" width="50px" height="50px"><path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"/></svg>
			</div>
			<div class="hamburger-close d-none">
				<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 50 50" width="50px" height="50px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/></svg>
			</div>
		</div>
	</div>
{% endif %}


5. Override the main navigation block to block--mainnavigation.html.twig and add class (menu-main-block) to the nav tag.

6. Override the menu.html.twig to menu--main.html.twig and add class to the ul and li as following.
{# 
  <ul{{attributes.addClass('menu-items')}}>
	and
	<ul class="menu-items">
		below that
  <li{{item.attributes.addClass('menu-item')}}> 
#}

7. Add the JAVASCRIPT file in js/toggle-menu.js and link it in libraries file , ADD THE FOLLWOING CODE
/**
 * @file
 * Sass Theme Start behaviors.
 */
(function ($, Drupal) {
	Drupal.behaviors.toggleMenu = {
		attach(context, settings) {
			const hamburgerToggleMenu = document.querySelector(".hamburger");
			const slideMenu = document.querySelector(".menu-main-block");
			const hamburgerOpen = document.querySelector(".hamburger-open");
			const hamburgerClose = document.querySelector(".hamburger-close");
			const body = document.querySelector("body");
			hamburgerToggleMenu?.addEventListener("click", (e) => {
				e.preventDefault();
				slideMenu?.classList.toggle("menu-opened");
				hamburgerClose?.classList.toggle("d-none");
				hamburgerOpen?.classList.toggle("d-none");
				body?.classList.toggle("overflow-hidden");
				body?.classList.toggle("overlay");
			});
		},
	};
})(jQuery, Drupal);


{# ADDING SCSS FILE #}
. Add this file in SCSS folder _menu-bar.scss and add the following code
$menubar-height: 100px;

body {
  overflow-x: hidden;
}

.menubar {
  height: $menubar-height;
  background-color: white;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;

  .menu-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 80px;

    .logo-link-wrapper {
      img {
        width: 237px;
        height: 75px;
        object-fit: contain;
      }
    }

    .menu-main-block {

      position: absolute;
      top: $menubar-height;
      right: 0;
      width: 360px;
      background-color: white;
      z-index: 10;
      height: calc(100vh - $menubar-height);
      transition: all 0.3s ease-in-out;
      transform: translateX(130%);
      -webkit-box-shadow: -16px 27px 57px -8px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: -16px 27px 57px -8px rgba(0, 0, 0, 0.75);
      box-shadow: -16px 27px 57px -8px rgba(0, 0, 0, 0.75);

      &.menu-opened {
        transform: translateX(0) !important;
      }

      @include tablet {
        width: 400px;
      }

      @include desktop {
        display: block;
        position: unset;
        background: unset;
        top: unset;
        right: unset;
        width: unset;
        height: unset;
        transition: unset;
        transform: unset;
        -webkit-box-shadow: unset;
        -moz-box-shadow: unset;
        box-shadow: unset;
      }

      .menu-items {
        @include desktop {
          flex-direction: row;
          align-items: center;
          gap: 30px;
        }

        list-style: none;
        margin: 0;
        padding: 0;
        flex-direction: column;
        display: flex;
        align-items: start;

        &>.menu-item {
          padding: 30px;
          border-bottom: 1px solid rgb(164, 164, 164);
          width: 100%;
          position: relative;

          @include desktop {
            width: unset;
            padding: 0;
            border-bottom: 0;
          }

          a {
            color: #111010;
            font-family: sans-serif;
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px;
            text-decoration: none;
          }

          &:last-child {
            margin-left: auto;
            border-bottom: 0;

            a {
              @include desktop {
                padding: 16px 24px;
                border: 2px solid black;
                border-radius: 1000px;
              }
            }
          }


          // The Anchor tag - that has the subchild (it should have full height)
          .submenu-anchortag {
            @include desktop {
              display: flex;
              height: calc($menubar-height - 10px);
              align-items: center;
            }
          }

          &:hover>.menu-items-child {
            display: block;
            padding-top: 1rem;
            padding-left: 2rem;

            @include desktop {
              padding: 8px 1rem;
            }
          }

          .menu-items-child {
            display: none;

            @include desktop {
              position: absolute;
              box-shadow: 1px 7px 17px -2px rgba(0, 0, 0, 0.75);
              -webkit-box-shadow: 1px 7px 17px -2px rgba(0, 0, 0, 0.75);
              -moz-box-shadow: 1px 7px 17px -2px rgba(0, 0, 0, 0.75);
              padding: 8px 1rem;
              border-radius: 4px;
              width: 200px;
              margin-top: -18px;
            }

            padding: 0;
            list-style: none;
            background: white;

            &>.menu-item {
              padding-bottom: 8px;
              padding-top: 8px;

              &:hover {
                border-bottom: 1px solid black;
              }

              &:last-child {
                border-bottom: 0;
              }
            }
          }
        }
      }
    }

    .hamburger {
      justify-self: flex-end;
      cursor: pointer;

      svg {
        width: 40px;
        height: 40px;
      }

      &.closed-menu {
        display: block;

        @include desktop {
          display: none;

        }
      }
    }
  }
}

// BASE FUNCTIONALITY CLASSES

.d-none {
  display: none !important;
}

.overflow-hidden {
  overflow: hidden;

  @include desktop {
    overflow: unset;
  }
}

.overlay {
  position: relative;


  &::after {
    @include desktop {
      content: unset;
    }

    content: '';
    position: absolute;
    inset: 0;
    top: $menubar-height;
    width: 100%;
    height: calc(100vh - $menubar-height);
    background-color: rgba(0, 0, 0, 0.75);
  }
}


