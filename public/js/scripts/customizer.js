!(function (a, n, e) {
  "use strict";
  var s = e("html"),
    o = e("body"),
    t = e(".main-menu"),
    r = o.attr("data-menu"),
    l = e(".footer"),
    d = e(".header-navbar"),
    i = e(".horizontal-menu-wrapper .header-navbar"),
    c = e(".header-navbar-shadow"),
    v = e("#collapse-sidebar-switch"),
    C = e(".content-wrapper"),
    m = e(".content-area-wrapper"),
    b = e(".customizer");
  if (
    (e(".customizer-toggle").on("click", function (a) {
      a.preventDefault(), e(b).toggleClass("open");
    }),
    e(".customizer-close").on("click", function () {
      e(b).removeClass("open");
    }),
    e(".customizer-content").length > 0)
  )
    new PerfectScrollbar(".customizer-content");
  e(".layout-name").on("click", function () {
    var a = e(this).data("layout");
    s.removeClass("dark-layout bordered-layout semi-dark-layout").addClass(a),
      "" === a
        ? (t.removeClass("menu-dark").addClass("menu-light"),
          d.removeClass("navbar-dark").addClass("navbar-light"))
        : "dark-layout" === a
        ? (t.removeClass("menu-light").addClass("menu-dark"),
          d.removeClass("navbar-light").addClass("navbar-dark"))
        : "semi-dark-layout" === a
        ? (t.removeClass("menu-light").addClass("menu-dark"),
          d.removeClass("navbar-dark").addClass("navbar-light"))
        : (t.removeClass("menu-dark").addClass("menu-light"),
          d.removeClass("navbar-dark").addClass("navbar-light"));
  });
  var f = s.data("layout");
  e(".layout-name[data-layout='" + f + "']").prop("checked", !0),
    v.on("click", function () {
      e(".modern-nav-toggle").trigger("click"),
        e(".main-menu").trigger("mouseleave");
    }),
    o.hasClass("menu-collapsed")
      ? v.prop("checked", !0)
      : v.prop("checked", !1),
    e("#customizer-navbar-colors .color-box").on("click", function () {
      var a = e(this);
      a.siblings().removeClass("selected"), a.addClass("selected");
      var n = a.data("navbar-color");
      n
        ? o
            .find(d)
            .removeClass(
              "bg-primary bg-secondary bg-success bg-danger bg-info bg-warning bg-dark"
            )
            .addClass(n + " navbar-dark")
        : o
            .find(d)
            .removeClass(
              "bg-primary bg-secondary bg-success bg-danger bg-info bg-warning bg-dark navbar-dark"
            ),
        s.hasClass("dark-layout") && d.addClass("navbar-dark");
    }),
    o.hasClass("horizontal-menu") &&
      (e(".collapse_menu").removeClass("d-none"),
      e(".collapse_sidebar").addClass("d-none"),
      e(".menu_type").removeClass("d-none"),
      e(".navbar_type").addClass("d-none"),
      e("#nav-type-hidden").closest("div").css("display", "none"),
      e("#customizer-navbar-colors").hide(),
      e(".customizer-menu")
        .attr("style", "display: none !important")
        .next("hr")
        .hide(),
      e(".navbar-type-text").text("Nav Menu Types")),
    e("#nav-type-hidden").on("click", function () {
      d.addClass("d-none"),
        c.addClass("d-none"),
        o
          .removeClass("navbar-static navbar-floating navbar-sticky")
          .addClass("navbar-hidden");
    }),
    e("#nav-type-static").on("click", function () {
      o.hasClass("horizontal-layout")
        ? (i.removeClass(
            "d-none floating-nav fixed-top navbar-fixed container-xxl"
          ),
          o
            .removeClass("navbar-hidden navbar-floating navbar-sticky")
            .addClass("navbar-static"))
        : (c.addClass("d-none"),
          "horizontal-menu" === r
            ? i
                .removeClass("d-none floating-nav fixed-top container-xxl")
                .addClass("navbar-static-top")
            : d
                .removeClass("d-none floating-nav fixed-top container-xxl")
                .addClass("navbar-static-top"),
          o
            .removeClass("navbar-hidden navbar-floating navbar-sticky")
            .addClass("navbar-static"));
    }),
    e("#nav-type-floating").on("click", function () {
      var a;
      o.hasClass("horizontal-layout")
        ? ((a = e("#layout-width-full").prop("checked")
            ? "floating-nav"
            : "floating-nav container-xxl"),
          i.removeClass("d-none fixed-top navbar-static-top").addClass(a),
          o
            .removeClass("navbar-static navbar-hidden navbar-sticky")
            .addClass("navbar-floating"))
        : ((a = e("#layout-width-full").prop("checked")
            ? "floating-nav"
            : "floating-nav container-xxl p-0"),
          c.removeClass("d-none"),
          "horizontal-menu" === r
            ? i.removeClass("d-none navbar-static-top fixed-top").addClass(a)
            : d.removeClass("d-none navbar-static-top fixed-top").addClass(a),
          o
            .removeClass("navbar-static navbar-hidden navbar-sticky")
            .addClass("navbar-floating"));
    }),
    e("#nav-type-sticky").on("click", function () {
      o.hasClass("horizontal-layout")
        ? (i
            .removeClass(
              "d-none floating-nav navbar-static-top navbar-fixed container-xxl"
            )
            .addClass("fixed-top"),
          o
            .removeClass("navbar-static navbar-floating navbar-hidden")
            .addClass("navbar-sticky"))
        : (c.addClass("d-none"),
          "horizontal-menu" === r
            ? i
                .removeClass("d-none floating-nav navbar-static-top")
                .addClass("fixed-top")
            : d
                .removeClass(
                  "d-none floating-nav navbar-static-top container-xxl"
                )
                .addClass("fixed-top"),
          o
            .removeClass("navbar-static navbar-floating navbar-hidden")
            .addClass("navbar-sticky"));
    }),
    C.hasClass("container-xxl") || m.hasClass("container-xxl")
      ? e("#layout-width-boxed").prop("checked", !0)
      : e("#layout-width-full").prop("checked", !0),
    e("#layout-width-full").on("click", function () {
      C.removeClass("container-xxl p-0"),
        m.removeClass("container-xxl p-0"),
        d.removeClass("container-xxl p-0");
    }),
    e("#layout-width-boxed").on("click", function () {
      C.addClass("container-xxl p-0"),
        m.addClass("container-xxl p-0"),
        d.hasClass("floating-nav") &&
          e(".floating-nav").addClass("container-xxl p-0");
    }),
    e("#footer-type-hidden").on("click", function () {
      l.addClass("d-none"),
        o.removeClass("footer-static footer-fixed").addClass("footer-hidden");
    }),
    e("#footer-type-static").on("click", function () {
      o.removeClass("footer-fixed"),
        l.removeClass("d-none").addClass("footer-static"),
        o.removeClass("footer-hidden footer-fixed").addClass("footer-static");
    }),
    e("#footer-type-sticky").on("click", function () {
      o.removeClass("footer-static footer-hidden").addClass("footer-fixed"),
        l.removeClass("d-none footer-static");
    });
})(window, document, jQuery);
