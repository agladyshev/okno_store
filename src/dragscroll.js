!(function(e, n) {
  "function" == typeof define && define.amd
    ? define(["exports"], n)
    : n("undefined" != typeof exports ? exports : (e.dragscroll = {}));
})(this, function(e) {
  var n,
    t,
    o = window,
    l = document,
    c = "mousemove",
    r = "mouseup",
    i = "mousedown",
    m = "EventListener",
    d = "add" + m,
    s = "remove" + m,
    f = [],
    u = function(e, m) {
      for (e = 0; e < f.length; )
        (m = f[e++]),
          (m = m.container || m),
          m[s](i, m.md, 0),
          o[s](r, m.mu, 0),
          o[s](c, m.mm, 0);
      for (
        f = [].slice.call(l.getElementsByClassName("dragscroll")), e = 0;
        e < f.length;

      )
        !(function(e, m, s, f, u, a) {
          (a = e.container || e)[d](
            i,
            (a.md = function(n) {
              (e.hasAttribute("nochilddrag") &&
                l.elementFromPoint(n.pageX, n.pageY) != a) ||
                ((f = 1), (m = n.clientX), (s = n.clientY), n.preventDefault());
            }),
            0
          ),
            o[d](
              r,
              (a.mu = function() {
                f = 0;
              }),
              0
            ),
            o[d](
              c,
              (a.mm = function(o) {
                f &&
                  (((u = e.scroller || e).scrollLeft -= n =
                    -m + (m = o.clientX)),
                  (u.scrollTop -= t = -s + (s = o.clientY)),
                  e == l.body &&
                    (((u = l.documentElement).scrollLeft -= n),
                    (u.scrollTop -= t)));
              }),
              0
            );
        })(f[e++]);
    };
  "complete" == l.readyState ? u() : o[d]("load", u, 0), (e.reset = u);
});
