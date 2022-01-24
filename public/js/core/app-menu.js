!(function (e, n, a) {
  "use strict";
  var t = 0.01 * e.innerHeight;
  n.documentElement.style.setProperty("--vh", t + "px"), (a.app = a.app || {});
  var i = a("body"),
    s = (a(e), a('div[data-menu="menu-wrapper"]').html()),
    o = a('div[data-menu="menu-wrapper"]').attr("class");
  (a.app.menu = {
    expanded: null,
    collapsed: null,
    hidden: null,
    container: null,
    horizontalMenu: !1,
    is_touch_device: function () {
      var a = " -webkit- -moz- -o- -ms- ".split(" ");
      return (
        !!(
          "ontouchstart" in e ||
          (e.DocumentTouch && n instanceof DocumentTouch)
        ) ||
        (function (n) {
          return e.matchMedia(n).matches;
        })(["(", a.join("touch-enabled),("), "heartz", ")"].join(""))
      );
    },
    manualScroller: {
      obj: null,
      init: function () {
        a(".main-menu").hasClass("menu-dark");
        a.app.menu.is_touch_device()
          ? a(".main-menu").addClass("menu-native-scroll")
          : (this.obj = new PerfectScrollbar(".main-menu-content", {
              suppressScrollX: !0,
              wheelPropagation: !1,
            }));
      },
      update: function () {
        if (!0 === a(".main-menu").data("scroll-to-active")) {
          var e, t, s;
          if (
            ((e = n.querySelector(".main-menu-content li.active")),
            (t = n.querySelector(".main-menu-content")),
            i.hasClass("menu-collapsed") &&
              a(".main-menu-content li.sidebar-group-active").length &&
              (e = n.querySelector(
                ".main-menu-content li.sidebar-group-active"
              )),
            e && (s = e.getBoundingClientRect().top + t.scrollTop),
            s > parseInt((2 * t.clientHeight) / 3))
          )
            var o = s - t.scrollTop - parseInt(t.clientHeight / 2);
          setTimeout(function () {
            a.app.menu.container.stop().animate({ scrollTop: o }, 300),
              a(".main-menu").data("scroll-to-active", "false");
          }, 300);
        }
      },
      enable: function () {
        a(".main-menu-content").hasClass("ps") || this.init();
      },
      disable: function () {
        this.obj && this.obj.destroy();
      },
      updateHeight: function () {
        ("vertical-menu" != i.data("menu") &&
          "vertical-menu-modern" != i.data("menu") &&
          "vertical-overlay-menu" != i.data("menu")) ||
          !a(".main-menu").hasClass("menu-fixed") ||
          (a(".main-menu-content").css(
            "height",
            a(e).height() -
              a(".header-navbar").height() -
              a(".main-menu-header").outerHeight() -
              a(".main-menu-footer").outerHeight()
          ),
          this.update());
      },
    },
    init: function (e) {
      if (a(".main-menu-content").length > 0) {
        this.container = a(".main-menu-content");
        this.change(e);
      }
    },
    change: function (n) {
      var t = Unison.fetch.now();
      this.reset();
      var s = i.data("menu");
      if (t)
        switch (t.name) {
          case "xl":
            "vertical-overlay-menu" === s
              ? this.hide()
              : !0 === n
              ? this.collapse(n)
              : this.expand();
            break;
          case "lg":
            "vertical-overlay-menu" === s ||
            "vertical-menu-modern" === s ||
            "horizontal-menu" === s
              ? this.hide()
              : this.collapse();
            break;
          case "md":
          case "sm":
          case "xs":
            this.hide();
        }
      ("vertical-menu" !== s && "vertical-menu-modern" !== s) ||
        this.toOverlayMenu(t.name, s),
        i.is(".horizontal-layout") &&
          !i.hasClass(".horizontal-menu-demo") &&
          (this.changeMenu(t.name), a(".menu-toggle").removeClass("is-active")),
        "xl" == t.name &&
          a('body[data-open="hover"] .main-menu-content .dropdown')
            .on("mouseenter", function () {
              a(this).hasClass("show")
                ? a(this).removeClass("show")
                : a(this).addClass("show");
            })
            .on("mouseleave", function (e) {
              a(this).removeClass("show");
            }),
        "sm" == t.name || "xs" == t.name
          ? a(".header-navbar[data-nav=brand-center]").removeClass(
              "navbar-brand-center"
            )
          : a(".header-navbar[data-nav=brand-center]").addClass(
              "navbar-brand-center"
            ),
        "xl" == t.name &&
          "horizontal-menu" == s &&
          a(".main-menu-content")
            .find("li.active")
            .parents("li")
            .addClass("sidebar-group-active active"),
        "xl" !== t.name &&
          "horizontal-menu" == s &&
          a("#navbar-type").toggleClass("d-none d-xl-block"),
        a("ul.dropdown-menu [data-bs-toggle=dropdown]").on(
          "click",
          function (e) {
            a(this).siblings("ul.dropdown-menu").length > 0 &&
              e.preventDefault(),
              e.stopPropagation(),
              a(this).parent().siblings().removeClass("show"),
              a(this).parent().toggleClass("show");
          }
        ),
        "horizontal-menu" == s &&
          (a("li.dropdown-submenu").on("mouseenter", function () {
            a(this).parent(".dropdown").hasClass("show") ||
              a(this).removeClass("openLeft");
            var n = a(this).find(".dropdown-menu");
            if (n) {
              var t = a(e).height(),
                i = a(this).position().top,
                s = n.offset().left,
                o = n.width();
              if (t - i - n.height() - 28 < 1) {
                var l = t - i - 170;
                a(this)
                  .find(".dropdown-menu")
                  .css({
                    "max-height": l + "px",
                    "overflow-y": "auto",
                    "overflow-x": "hidden",
                  });
                new PerfectScrollbar(
                  "li.dropdown-submenu.show .dropdown-menu",
                  { wheelPropagation: !1 }
                );
              }
              s + o - (e.innerWidth - 16) >= 0 && a(this).addClass("openLeft");
            }
          }),
          a(".theme-layouts").find(".semi-dark").hide());
    },
    transit: function (e, n) {
      var t = this;
      i.addClass("changing-menu"),
        e.call(t),
        i.hasClass("vertical-layout") &&
          (i.hasClass("menu-open") || i.hasClass("menu-expanded")
            ? (a(".menu-toggle").addClass("is-active"),
              "vertical-menu" === i.data("menu") &&
                a(".main-menu-header") &&
                a(".main-menu-header").show())
            : (a(".menu-toggle").removeClass("is-active"),
              "vertical-menu" === i.data("menu") &&
                a(".main-menu-header") &&
                a(".main-menu-header").hide())),
        setTimeout(function () {
          n.call(t), i.removeClass("changing-menu"), t.update();
        }, 500);
    },
    open: function () {
      this.transit(
        function () {
          i.removeClass("menu-hide menu-collapsed").addClass("menu-open"),
            (this.hidden = !1),
            (this.expanded = !0),
            i.hasClass("vertical-overlay-menu") &&
              a(".sidenav-overlay").addClass("show");
        },
        function () {
          !a(".main-menu").hasClass("menu-native-scroll") &&
            a(".main-menu").hasClass("menu-fixed") &&
            (this.manualScroller.enable(),
            a(".main-menu-content").css(
              "height",
              a(e).height() -
                a(".header-navbar").height() -
                a(".main-menu-header").outerHeight() -
                a(".main-menu-footer").outerHeight()
            )),
            i.hasClass("vertical-overlay-menu") ||
              a(".sidenav-overlay").removeClass("show");
        }
      );
    },
    hide: function () {
      this.transit(
        function () {
          i.removeClass("menu-open menu-expanded").addClass("menu-hide"),
            (this.hidden = !0),
            (this.expanded = !1),
            i.hasClass("vertical-overlay-menu") &&
              a(".sidenav-overlay").removeClass("show");
        },
        function () {
          !a(".main-menu").hasClass("menu-native-scroll") &&
            a(".main-menu").hasClass("menu-fixed") &&
            this.manualScroller.enable(),
            i.hasClass("vertical-overlay-menu") ||
              a(".sidenav-overlay").removeClass("show");
        }
      );
    },
    expand: function () {
      !1 === this.expanded &&
        ("vertical-menu-modern" == i.data("menu") &&
          a(".modern-nav-toggle")
            .find(".collapse-toggle-icon")
            .replaceWith(
              feather.icons.disc.toSvg({
                class:
                  "d-none d-xl-block collapse-toggle-icon primary font-medium-4",
              })
            ),
        this.transit(
          function () {
            i.removeClass("menu-collapsed").addClass("menu-expanded"),
              (this.collapsed = !1),
              (this.expanded = !0),
              a(".sidenav-overlay").removeClass("show");
          },
          function () {
            a(".main-menu").hasClass("menu-native-scroll") ||
            "horizontal-menu" == i.data("menu")
              ? this.manualScroller.disable()
              : a(".main-menu").hasClass("menu-fixed") &&
                this.manualScroller.enable(),
              ("vertical-menu" != i.data("menu") &&
                "vertical-menu-modern" != i.data("menu")) ||
                !a(".main-menu").hasClass("menu-fixed") ||
                a(".main-menu-content").css(
                  "height",
                  a(e).height() -
                    a(".header-navbar").height() -
                    a(".main-menu-header").outerHeight() -
                    a(".main-menu-footer").outerHeight()
                );
          }
        ));
    },
    collapse: function () {
      !1 === this.collapsed &&
        ("vertical-menu-modern" == i.data("menu") &&
          a(".modern-nav-toggle")
            .find(".collapse-toggle-icon")
            .replaceWith(
              feather.icons.circle.toSvg({
                class:
                  "d-none d-xl-block collapse-toggle-icon primary font-medium-4",
              })
            ),
        this.transit(
          function () {
            i.removeClass("menu-expanded").addClass("menu-collapsed"),
              (this.collapsed = !0),
              (this.expanded = !1),
              a(".content-overlay").removeClass("d-block d-none");
          },
          function () {
            "horizontal-menu" == i.data("menu") &&
              i.hasClass("vertical-overlay-menu") &&
              a(".main-menu").hasClass("menu-fixed") &&
              this.manualScroller.enable(),
              ("vertical-menu" != i.data("menu") &&
                "vertical-menu-modern" != i.data("menu")) ||
                !a(".main-menu").hasClass("menu-fixed") ||
                a(".main-menu-content").css(
                  "height",
                  a(e).height() - a(".header-navbar").height()
                ),
              "vertical-menu-modern" == i.data("menu") &&
                a(".main-menu").hasClass("menu-fixed") &&
                this.manualScroller.enable();
          }
        ));
    },
    toOverlayMenu: function (e, n) {
      var a = i.data("menu");
      "vertical-menu-modern" == n
        ? "lg" == e || "md" == e || "sm" == e || "xs" == e
          ? i.hasClass(a) && i.removeClass(a).addClass("vertical-overlay-menu")
          : i.hasClass("vertical-overlay-menu") &&
            i.removeClass("vertical-overlay-menu").addClass(a)
        : "sm" == e || "xs" == e
        ? i.hasClass(a) && i.removeClass(a).addClass("vertical-overlay-menu")
        : i.hasClass("vertical-overlay-menu") &&
          i.removeClass("vertical-overlay-menu").addClass(a);
    },
    changeMenu: function (e) {
      a('div[data-menu="menu-wrapper"]').html(""),
        a('div[data-menu="menu-wrapper"]').html(s);
      var n = a('div[data-menu="menu-wrapper"]'),
        t =
          (a('div[data-menu="menu-container"]'),
          a('ul[data-menu="menu-navigation"]')),
        l = a('li[data-menu="dropdown"]'),
        m = a('li[data-menu="dropdown-submenu"]');
      "xl" === e
        ? (i
            .removeClass("vertical-layout vertical-overlay-menu fixed-navbar")
            .addClass(i.data("menu")),
          a("nav.header-navbar").removeClass("fixed-top"),
          n.removeClass().addClass(o),
          a("a.dropdown-item.nav-has-children").on("click", function () {
            event.preventDefault(), event.stopPropagation();
          }),
          a("a.dropdown-item.nav-has-parent").on("click", function () {
            event.preventDefault(), event.stopPropagation();
          }))
        : (i
            .removeClass(i.data("menu"))
            .addClass("vertical-layout vertical-overlay-menu fixed-navbar"),
          a("nav.header-navbar").addClass("fixed-top"),
          n
            .removeClass()
            .addClass("main-menu menu-light menu-fixed menu-shadow"),
          t.removeClass().addClass("navigation navigation-main"),
          l.removeClass("dropdown").addClass("has-sub"),
          l.find("a").removeClass("dropdown-toggle nav-link"),
          l.find("a").attr("data-bs-toggle", ""),
          l.children("ul").find("a").removeClass("dropdown-item"),
          l.find("ul").removeClass("dropdown-menu"),
          m.removeClass().addClass("has-sub"),
          a.app.nav.init(),
          a("ul.dropdown-menu [data-bs-toggle=dropdown]").on(
            "click",
            function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                a(this).parent().siblings().removeClass("open"),
                a(this).parent().toggleClass("open");
            }
          ),
          a(".main-menu-content")
            .find("li.active")
            .parents("li")
            .addClass("sidebar-group-active"),
          a(".main-menu-content")
            .find("li.active")
            .closest("li.nav-item")
            .addClass("open")),
        feather && feather.replace({ width: 14, height: 14 });
    },
    toggle: function () {
      var e = Unison.fetch.now(),
        n = (this.collapsed, this.expanded),
        a = this.hidden,
        t = i.data("menu");
      switch (e.name) {
        case "xl":
          !0 === n
            ? "vertical-overlay-menu" == t
              ? this.hide()
              : this.collapse()
            : "vertical-overlay-menu" == t
            ? this.open()
            : this.expand();
          break;
        case "lg":
          !0 === n
            ? "vertical-overlay-menu" == t ||
              "vertical-menu-modern" == t ||
              "horizontal-menu" == t
              ? this.hide()
              : this.collapse()
            : "vertical-overlay-menu" == t ||
              "vertical-menu-modern" == t ||
              "horizontal-menu" == t
            ? this.open()
            : this.expand();
          break;
        case "md":
        case "sm":
        case "xs":
          !0 === a ? this.open() : this.hide();
      }
    },
    update: function () {
      this.manualScroller.update();
    },
    reset: function () {
      (this.expanded = !1),
        (this.collapsed = !1),
        (this.hidden = !1),
        i.removeClass("menu-hide menu-open menu-collapsed menu-expanded");
    },
  }),
    (a.app.nav = {
      container: a(".navigation-main"),
      initialized: !1,
      navItem: a(".navigation-main").find("li").not(".navigation-category"),
      TRANSITION_EVENTS: [
        "transitionend",
        "webkitTransitionEnd",
        "oTransitionEnd",
      ],
      TRANSITION_PROPERTIES: [
        "transition",
        "MozTransition",
        "webkitTransition",
        "WebkitTransition",
        "OTransition",
      ],
      config: { speed: 300 },
      init: function (e) {
        (this.initialized = !0), a.extend(this.config, e), this.bind_events();
      },
      bind_events: function () {
        var e = this;
        a(".navigation-main")
          .on("mouseenter.app.menu", "li", function () {
            var e = a(this);
            if (
              i.hasClass("menu-collapsed") &&
              "vertical-menu-modern" != i.data("menu")
            ) {
              a(".main-menu-content").children("span.menu-title").remove(),
                a(".main-menu-content").children("a.menu-title").remove(),
                a(".main-menu-content").children("ul.menu-content").remove();
              var n,
                t,
                s,
                o = e.find("span.menu-title").clone();
              e.hasClass("has-sub") ||
                ((n = e.find("span.menu-title").text()),
                (t = e.children("a").attr("href")),
                "" !== n &&
                  ((o = a("<a>")).attr("href", t),
                  o.attr("title", n),
                  o.text(n),
                  o.addClass("menu-title"))),
                (s = e.css("border-top")
                  ? e.position().top + parseInt(e.css("border-top"), 10)
                  : e.position().top),
                "vertical-compact-menu" !== i.data("menu") &&
                  o
                    .appendTo(".main-menu-content")
                    .css({ position: "fixed", top: s });
            }
          })
          .on("mouseleave.app.menu", "li", function () {})
          .on("active.app.menu", "li", function (e) {
            a(this).addClass("active"), e.stopPropagation();
          })
          .on("deactive.app.menu", "li.active", function (e) {
            a(this).removeClass("active"), e.stopPropagation();
          })
          .on("open.app.menu", "li", function (n) {
            var t = a(this);
            if ((e.expand(t), a(".main-menu").hasClass("menu-collapsible")))
              return !1;
            t.siblings(".open").find("li.open").trigger("close.app.menu"),
              t.siblings(".open").trigger("close.app.menu"),
              n.stopPropagation();
          })
          .on("close.app.menu", "li.open", function (n) {
            var t = a(this);
            e.collapse(t), n.stopPropagation();
          })
          .on("click.app.menu", "li", function (e) {
            var n = a(this);
            n.is(".disabled") ||
            (i.hasClass("menu-collapsed") &&
              "vertical-menu-modern" != i.data("menu"))
              ? e.preventDefault()
              : n.has("ul").length
              ? n.is(".open")
                ? n.trigger("close.app.menu")
                : n.trigger("open.app.menu")
              : n.is(".active") ||
                (n.siblings(".active").trigger("deactive.app.menu"),
                n.trigger("active.app.menu")),
              e.stopPropagation();
          }),
          a(".navbar-header, .main-menu")
            .on("mouseenter", function () {
              if (
                "vertical-menu-modern" == i.data("menu") &&
                (a(".main-menu, .navbar-header").addClass("expanded"),
                i.hasClass("menu-collapsed"))
              ) {
                0 === a(".main-menu li.open").length &&
                  a(".main-menu-content")
                    .find("li.active")
                    .parents("li")
                    .addClass("open");
                var e = a(".main-menu li.menu-collapsed-open");
                e
                  .children("ul")
                  .hide()
                  .slideDown(200, function () {
                    a(this).css("display", "");
                  }),
                  e.addClass("open").removeClass("menu-collapsed-open");
              }
            })
            .on("mouseleave", function () {
              i.hasClass("menu-collapsed") &&
                "vertical-menu-modern" == i.data("menu") &&
                setTimeout(function () {
                  if (
                    0 === a(".main-menu:hover").length &&
                    0 === a(".navbar-header:hover").length &&
                    (a(".main-menu, .navbar-header").removeClass("expanded"),
                    i.hasClass("menu-collapsed"))
                  ) {
                    var e = a(".main-menu li.open"),
                      n = e.children("ul");
                    e.addClass("menu-collapsed-open"),
                      n.show().slideUp(200, function () {
                        a(this).css("display", "");
                      }),
                      e.removeClass("open");
                  }
                }, 1);
            }),
          a(".main-menu-content").on("mouseleave", function () {
            i.hasClass("menu-collapsed") &&
              (a(".main-menu-content").children("span.menu-title").remove(),
              a(".main-menu-content").children("a.menu-title").remove(),
              a(".main-menu-content").children("ul.menu-content").remove()),
              a(".hover", ".navigation-main").removeClass("hover");
          }),
          a(".navigation-main li.has-sub > a").on("click", function (e) {
            e.preventDefault();
          });
      },
      collapse: function (e, n) {
        var t = e.children("ul"),
          i = e.children().first(),
          s = a(i).outerHeight();
        e.css({ height: s + t.outerHeight() + "px", overflow: "hidden" }),
          e.addClass("menu-item-animating"),
          e.addClass("menu-item-closing"),
          a.app.nav._bindAnimationEndEvent(e, function () {
            e.removeClass("open"), a.app.nav._clearItemStyle(e);
          }),
          setTimeout(function () {
            e.css({ height: s + "px" });
          }, 50);
      },
      expand: function (e, n) {
        var t = e.children("ul"),
          i = e.children().first(),
          s = a(i).outerHeight();
        e.addClass("menu-item-animating"),
          e.css({ overflow: "hidden", height: s + "px" }),
          e.addClass("open"),
          a.app.nav._bindAnimationEndEvent(e, function () {
            a.app.nav._clearItemStyle(e);
          }),
          setTimeout(function () {
            e.css({ height: s + t.outerHeight() + "px" });
          }, 50);
      },
      _bindAnimationEndEvent(n, t) {
        n = n[0];
        var i = function (e) {
          e.target === n && (a.app.nav._unbindAnimationEndEvent(n), t(e));
        };
        let s = e.getComputedStyle(n).transitionDuration;
        (s = parseFloat(s) * (-1 !== s.indexOf("ms") ? 1 : 1e3)),
          (n._menuAnimationEndEventCb = i),
          a.app.nav.TRANSITION_EVENTS.forEach(function (e) {
            n.addEventListener(e, n._menuAnimationEndEventCb, !1);
          }),
          (n._menuAnimationEndEventTimeout = setTimeout(function () {
            i({ target: n });
          }, s + 50));
      },
      _unbindAnimationEndEvent(e) {
        var n = e._menuAnimationEndEventCb;
        e._menuAnimationEndEventTimeout &&
          (clearTimeout(e._menuAnimationEndEventTimeout),
          (e._menuAnimationEndEventTimeout = null)),
          n &&
            (a.app.nav.TRANSITION_EVENTS.forEach(function (a) {
              e.removeEventListener(a, n, !1);
            }),
            (e._menuAnimationEndEventCb = null));
      },
      _clearItemStyle: function (e) {
        e.removeClass("menu-item-animating"),
          e.removeClass("menu-item-closing"),
          e.css({ overflow: "", height: "" });
      },
      refresh: function () {
        a.app.nav.container.find(".open").removeClass("open");
      },
    }),
    a(n).on("click", 'a[href="#"]', function (e) {
      e.preventDefault();
    });
})(window, document, jQuery),
  window.addEventListener("resize", function () {
    var e = 0.01 * window.innerHeight;
    document.documentElement.style.setProperty("--vh", e + "px");
  });
