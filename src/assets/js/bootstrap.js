var t = "top",
    e = "bottom",
    i = "right",
    n = "left",
    s = "auto",
    o = [t, e, i, n],
    r = "start",
    a = "end",
    l = "clippingParents",
    c = "viewport",
    h = "popper",
    u = "reference",
    d = o.reduce((function(t, e) {
        return t.concat([e + "-" + r, e + "-" + a])
    }), []),
    f = [].concat(o, [s]).reduce((function(t, e) {
        return t.concat([e, e + "-" + r, e + "-" + a])
    }), []),
    p = "beforeRead",
    m = "read",
    g = "afterRead",
    _ = "beforeMain",
    b = "main",
    v = "afterMain",
    y = "beforeWrite",
    w = "write",
    A = "afterWrite",
    E = [p, m, g, _, b, v, y, w, A];

function T(t) {
    return t ? (t.nodeName || "").toLowerCase() : null
}

function C(t) {
    if (null == t) return window;
    if ("[object Window]" !== t.toString()) {
        var e = t.ownerDocument;
        return e && e.defaultView || window
    }
    return t
}

function O(t) {
    return t instanceof C(t).Element || t instanceof Element
}

function x(t) {
    return t instanceof C(t).HTMLElement || t instanceof HTMLElement
}

function k(t) {
    return "undefined" != typeof ShadowRoot && (t instanceof C(t).ShadowRoot || t instanceof ShadowRoot)
}
const L = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function(t) {
        var e = t.state;
        Object.keys(e.elements).forEach((function(t) {
            var i = e.styles[t] || {},
                n = e.attributes[t] || {},
                s = e.elements[t];
            x(s) && T(s) && (Object.assign(s.style, i), Object.keys(n).forEach((function(t) {
                var e = n[t];
                !1 === e ? s.removeAttribute(t) : s.setAttribute(t, !0 === e ? "" : e)
            })))
        }))
    },
    effect: function(t) {
        var e = t.state,
            i = {
                popper: {
                    position: e.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
        return Object.assign(e.elements.popper.style, i.popper), e.styles = i, e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow),
            function() {
                Object.keys(e.elements).forEach((function(t) {
                    var n = e.elements[t],
                        s = e.attributes[t] || {},
                        o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]).reduce((function(t, e) {
                            return t[e] = "", t
                        }), {});
                    x(n) && T(n) && (Object.assign(n.style, o), Object.keys(s).forEach((function(t) {
                        n.removeAttribute(t)
                    })))
                }))
            }
    },
    requires: ["computeStyles"]
};

function S(t) {
    return t.split("-")[0]
}
var D = Math.max,
    $ = Math.min,
    I = Math.round;

function N() {
    var t = navigator.userAgentData;
    return null != t && t.brands && Array.isArray(t.brands) ? t.brands.map((function(t) {
        return t.brand + "/" + t.version
    })).join(" ") : navigator.userAgent
}

function P() {
    return !/^((?!chrome|android).)*safari/i.test(N())
}

function M(t, e, i) {
    void 0 === e && (e = !1), void 0 === i && (i = !1);
    var n = t.getBoundingClientRect(),
        s = 1,
        o = 1;
    e && x(t) && (s = t.offsetWidth > 0 && I(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && I(n.height) / t.offsetHeight || 1);
    var r = (O(t) ? C(t) : window).visualViewport,
        a = !P() && i,
        l = (n.left + (a && r ? r.offsetLeft : 0)) / s,
        c = (n.top + (a && r ? r.offsetTop : 0)) / o,
        h = n.width / s,
        u = n.height / o;
    return {
        width: h,
        height: u,
        top: c,
        right: l + h,
        bottom: c + u,
        left: l,
        x: l,
        y: c
    }
}

function j(t) {
    var e = M(t),
        i = t.offsetWidth,
        n = t.offsetHeight;
    return Math.abs(e.width - i) <= 1 && (i = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
        x: t.offsetLeft,
        y: t.offsetTop,
        width: i,
        height: n
    }
}

function F(t, e) {
    var i = e.getRootNode && e.getRootNode();
    if (t.contains(e)) return !0;
    if (i && k(i)) {
        var n = e;
        do {
            if (n && t.isSameNode(n)) return !0;
            n = n.parentNode || n.host
        } while (n)
    }
    return !1
}

function H(t) {
    return C(t).getComputedStyle(t)
}

function W(t) {
    return ["table", "td", "th"].indexOf(T(t)) >= 0
}

function B(t) {
    return ((O(t) ? t.ownerDocument : t.document) || window.document).documentElement
}

function z(t) {
    return "html" === T(t) ? t : t.assignedSlot || t.parentNode || (k(t) ? t.host : null) || B(t)
}

function R(t) {
    return x(t) && "fixed" !== H(t).position ? t.offsetParent : null
}

function q(t) {
    for (var e = C(t), i = R(t); i && W(i) && "static" === H(i).position;) i = R(i);
    return i && ("html" === T(i) || "body" === T(i) && "static" === H(i).position) ? e : i || function(t) {
        var e = /firefox/i.test(N());
        if (/Trident/i.test(N()) && x(t) && "fixed" === H(t).position) return null;
        var i = z(t);
        for (k(i) && (i = i.host); x(i) && ["html", "body"].indexOf(T(i)) < 0;) {
            var n = H(i);
            if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== ["transform", "perspective"].indexOf(n.willChange) || e && "filter" === n.willChange || e && n.filter && "none" !== n.filter) return i;
            i = i.parentNode
        }
        return null
    }(t) || e
}

function V(t) {
    return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
}

function K(t, e, i) {
    return D(t, $(e, i))
}

function Q(t) {
    return Object.assign({}, {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }, t)
}

function X(t, e) {
    return e.reduce((function(e, i) {
        return e[i] = t, e
    }), {})
}
const Y = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function(s) {
        var r, a = s.state,
            l = s.name,
            c = s.options,
            h = a.elements.arrow,
            u = a.modifiersData.popperOffsets,
            d = S(a.placement),
            f = V(d),
            p = [n, i].indexOf(d) >= 0 ? "height" : "width";
        if (h && u) {
            var m = function(t, e) {
                    return Q("number" != typeof(t = "function" == typeof t ? t(Object.assign({}, e.rects, {
                        placement: e.placement
                    })) : t) ? t : X(t, o))
                }(c.padding, a),
                g = j(h),
                _ = "y" === f ? t : n,
                b = "y" === f ? e : i,
                v = a.rects.reference[p] + a.rects.reference[f] - u[f] - a.rects.popper[p],
                y = u[f] - a.rects.reference[f],
                w = q(h),
                A = w ? "y" === f ? w.clientHeight || 0 : w.clientWidth || 0 : 0,
                E = v / 2 - y / 2,
                T = m[_],
                C = A - g[p] - m[b],
                O = A / 2 - g[p] / 2 + E,
                x = K(T, O, C),
                k = f;
            a.modifiersData[l] = ((r = {})[k] = x, r.centerOffset = x - O, r)
        }
    },
    effect: function(t) {
        var e = t.state,
            i = t.options.element,
            n = void 0 === i ? "[data-popper-arrow]" : i;
        null != n && ("string" != typeof n || (n = e.elements.popper.querySelector(n))) && F(e.elements.popper, n) && (e.elements.arrow = n)
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};

function U(t) {
    return t.split("-")[1]
}
var G = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};

function J(s) {
    var o, r = s.popper,
        l = s.popperRect,
        c = s.placement,
        h = s.variation,
        u = s.offsets,
        d = s.position,
        f = s.gpuAcceleration,
        p = s.adaptive,
        m = s.roundOffsets,
        g = s.isFixed,
        _ = u.x,
        b = void 0 === _ ? 0 : _,
        v = u.y,
        y = void 0 === v ? 0 : v,
        w = "function" == typeof m ? m({
            x: b,
            y: y
        }) : {
            x: b,
            y: y
        };
    b = w.x, y = w.y;
    var A = u.hasOwnProperty("x"),
        E = u.hasOwnProperty("y"),
        T = n,
        O = t,
        x = window;
    if (p) {
        var k = q(r),
            L = "clientHeight",
            S = "clientWidth";
        if (k === C(r) && "static" !== H(k = B(r)).position && "absolute" === d && (L = "scrollHeight", S = "scrollWidth"), c === t || (c === n || c === i) && h === a) O = e, y -= (g && k === x && x.visualViewport ? x.visualViewport.height : k[L]) - l.height, y *= f ? 1 : -1;
        if (c === n || (c === t || c === e) && h === a) T = i, b -= (g && k === x && x.visualViewport ? x.visualViewport.width : k[S]) - l.width, b *= f ? 1 : -1
    }
    var D, $ = Object.assign({
            position: d
        }, p && G),
        N = !0 === m ? function(t, e) {
            var i = t.x,
                n = t.y,
                s = e.devicePixelRatio || 1;
            return {
                x: I(i * s) / s || 0,
                y: I(n * s) / s || 0
            }
        }({
            x: b,
            y: y
        }, C(r)) : {
            x: b,
            y: y
        };
    return b = N.x, y = N.y, f ? Object.assign({}, $, ((D = {})[O] = E ? "0" : "", D[T] = A ? "0" : "", D.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + y + "px)" : "translate3d(" + b + "px, " + y + "px, 0)", D)) : Object.assign({}, $, ((o = {})[O] = E ? y + "px" : "", o[T] = A ? b + "px" : "", o.transform = "", o))
}
const Z = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: function(t) {
        var e = t.state,
            i = t.options,
            n = i.gpuAcceleration,
            s = void 0 === n || n,
            o = i.adaptive,
            r = void 0 === o || o,
            a = i.roundOffsets,
            l = void 0 === a || a,
            c = {
                placement: S(e.placement),
                variation: U(e.placement),
                popper: e.elements.popper,
                popperRect: e.rects.popper,
                gpuAcceleration: s,
                isFixed: "fixed" === e.options.strategy
            };
        null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, J(Object.assign({}, c, {
            offsets: e.modifiersData.popperOffsets,
            position: e.options.strategy,
            adaptive: r,
            roundOffsets: l
        })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, J(Object.assign({}, c, {
            offsets: e.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: l
        })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
            "data-popper-placement": e.placement
        })
    },
    data: {}
};
var tt = {
    passive: !0
};
const et = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: function(t) {
        var e = t.state,
            i = t.instance,
            n = t.options,
            s = n.scroll,
            o = void 0 === s || s,
            r = n.resize,
            a = void 0 === r || r,
            l = C(e.elements.popper),
            c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
        return o && c.forEach((function(t) {
                t.addEventListener("scroll", i.update, tt)
            })), a && l.addEventListener("resize", i.update, tt),
            function() {
                o && c.forEach((function(t) {
                    t.removeEventListener("scroll", i.update, tt)
                })), a && l.removeEventListener("resize", i.update, tt)
            }
    },
    data: {}
};
var it = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};

function nt(t) {
    return t.replace(/left|right|bottom|top/g, (function(t) {
        return it[t]
    }))
}
var st = {
    start: "end",
    end: "start"
};

function ot(t) {
    return t.replace(/start|end/g, (function(t) {
        return st[t]
    }))
}

function rt(t) {
    var e = C(t);
    return {
        scrollLeft: e.pageXOffset,
        scrollTop: e.pageYOffset
    }
}

function at(t) {
    return M(B(t)).left + rt(t).scrollLeft
}

function lt(t) {
    var e = H(t),
        i = e.overflow,
        n = e.overflowX,
        s = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(i + s + n)
}

function ct(t) {
    return ["html", "body", "#document"].indexOf(T(t)) >= 0 ? t.ownerDocument.body : x(t) && lt(t) ? t : ct(z(t))
}

function ht(t, e) {
    var i;
    void 0 === e && (e = []);
    var n = ct(t),
        s = n === (null == (i = t.ownerDocument) ? void 0 : i.body),
        o = C(n),
        r = s ? [o].concat(o.visualViewport || [], lt(n) ? n : []) : n,
        a = e.concat(r);
    return s ? a : a.concat(ht(z(r)))
}

function ut(t) {
    return Object.assign({}, t, {
        left: t.x,
        top: t.y,
        right: t.x + t.width,
        bottom: t.y + t.height
    })
}

function dt(t, e, i) {
    return e === c ? ut(function(t, e) {
        var i = C(t),
            n = B(t),
            s = i.visualViewport,
            o = n.clientWidth,
            r = n.clientHeight,
            a = 0,
            l = 0;
        if (s) {
            o = s.width, r = s.height;
            var c = P();
            (c || !c && "fixed" === e) && (a = s.offsetLeft, l = s.offsetTop)
        }
        return {
            width: o,
            height: r,
            x: a + at(t),
            y: l
        }
    }(t, i)) : O(e) ? function(t, e) {
        var i = M(t, !1, "fixed" === e);
        return i.top = i.top + t.clientTop, i.left = i.left + t.clientLeft, i.bottom = i.top + t.clientHeight, i.right = i.left + t.clientWidth, i.width = t.clientWidth, i.height = t.clientHeight, i.x = i.left, i.y = i.top, i
    }(e, i) : ut(function(t) {
        var e, i = B(t),
            n = rt(t),
            s = null == (e = t.ownerDocument) ? void 0 : e.body,
            o = D(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
            r = D(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
            a = -n.scrollLeft + at(t),
            l = -n.scrollTop;
        return "rtl" === H(s || i).direction && (a += D(i.clientWidth, s ? s.clientWidth : 0) - o), {
            width: o,
            height: r,
            x: a,
            y: l
        }
    }(B(t)))
}

function ft(t, e, i, n) {
    var s = "clippingParents" === e ? function(t) {
            var e = ht(z(t)),
                i = ["absolute", "fixed"].indexOf(H(t).position) >= 0 && x(t) ? q(t) : t;
            return O(i) ? e.filter((function(t) {
                return O(t) && F(t, i) && "body" !== T(t)
            })) : []
        }(t) : [].concat(e),
        o = [].concat(s, [i]),
        r = o[0],
        a = o.reduce((function(e, i) {
            var s = dt(t, i, n);
            return e.top = D(s.top, e.top), e.right = $(s.right, e.right), e.bottom = $(s.bottom, e.bottom), e.left = D(s.left, e.left), e
        }), dt(t, r, n));
    return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
}

function pt(s) {
    var o, l = s.reference,
        c = s.element,
        h = s.placement,
        u = h ? S(h) : null,
        d = h ? U(h) : null,
        f = l.x + l.width / 2 - c.width / 2,
        p = l.y + l.height / 2 - c.height / 2;
    switch (u) {
        case t:
            o = {
                x: f,
                y: l.y - c.height
            };
            break;
        case e:
            o = {
                x: f,
                y: l.y + l.height
            };
            break;
        case i:
            o = {
                x: l.x + l.width,
                y: p
            };
            break;
        case n:
            o = {
                x: l.x - c.width,
                y: p
            };
            break;
        default:
            o = {
                x: l.x,
                y: l.y
            }
    }
    var m = u ? V(u) : null;
    if (null != m) {
        var g = "y" === m ? "height" : "width";
        switch (d) {
            case r:
                o[m] = o[m] - (l[g] / 2 - c[g] / 2);
                break;
            case a:
                o[m] = o[m] + (l[g] / 2 - c[g] / 2)
        }
    }
    return o
}

function mt(n, s) {
    void 0 === s && (s = {});
    var r = s,
        a = r.placement,
        d = void 0 === a ? n.placement : a,
        f = r.strategy,
        p = void 0 === f ? n.strategy : f,
        m = r.boundary,
        g = void 0 === m ? l : m,
        _ = r.rootBoundary,
        b = void 0 === _ ? c : _,
        v = r.elementContext,
        y = void 0 === v ? h : v,
        w = r.altBoundary,
        A = void 0 !== w && w,
        E = r.padding,
        T = void 0 === E ? 0 : E,
        C = Q("number" != typeof T ? T : X(T, o)),
        x = y === h ? u : h,
        k = n.rects.popper,
        L = n.elements[A ? x : y],
        S = ft(O(L) ? L : L.contextElement || B(n.elements.popper), g, b, p),
        D = M(n.elements.reference),
        $ = pt({
            reference: D,
            element: k,
            strategy: "absolute",
            placement: d
        }),
        I = ut(Object.assign({}, k, $)),
        N = y === h ? I : D,
        P = {
            top: S.top - N.top + C.top,
            bottom: N.bottom - S.bottom + C.bottom,
            left: S.left - N.left + C.left,
            right: N.right - S.right + C.right
        },
        j = n.modifiersData.offset;
    if (y === h && j) {
        var F = j[d];
        Object.keys(P).forEach((function(n) {
            var s = [i, e].indexOf(n) >= 0 ? 1 : -1,
                o = [t, e].indexOf(n) >= 0 ? "y" : "x";
            P[n] += F[o] * s
        }))
    }
    return P
}
const gt = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function(a) {
        var l = a.state,
            c = a.options,
            h = a.name;
        if (!l.modifiersData[h]._skip) {
            for (var u = c.mainAxis, p = void 0 === u || u, m = c.altAxis, g = void 0 === m || m, _ = c.fallbackPlacements, b = c.padding, v = c.boundary, y = c.rootBoundary, w = c.altBoundary, A = c.flipVariations, E = void 0 === A || A, T = c.allowedAutoPlacements, C = l.options.placement, O = S(C), x = _ || (O === C || !E ? [nt(C)] : function(t) {
                    if (S(t) === s) return [];
                    var e = nt(t);
                    return [ot(t), e, ot(e)]
                }(C)), k = [C].concat(x).reduce((function(t, e) {
                    return t.concat(S(e) === s ? function(t, e) {
                        void 0 === e && (e = {});
                        var i = e,
                            n = i.placement,
                            s = i.boundary,
                            r = i.rootBoundary,
                            a = i.padding,
                            l = i.flipVariations,
                            c = i.allowedAutoPlacements,
                            h = void 0 === c ? f : c,
                            u = U(n),
                            p = u ? l ? d : d.filter((function(t) {
                                return U(t) === u
                            })) : o,
                            m = p.filter((function(t) {
                                return h.indexOf(t) >= 0
                            }));
                        0 === m.length && (m = p);
                        var g = m.reduce((function(e, i) {
                            return e[i] = mt(t, {
                                placement: i,
                                boundary: s,
                                rootBoundary: r,
                                padding: a
                            })[S(i)], e
                        }), {});
                        return Object.keys(g).sort((function(t, e) {
                            return g[t] - g[e]
                        }))
                    }(l, {
                        placement: e,
                        boundary: v,
                        rootBoundary: y,
                        padding: b,
                        flipVariations: E,
                        allowedAutoPlacements: T
                    }) : e)
                }), []), L = l.rects.reference, D = l.rects.popper, $ = new Map, I = !0, N = k[0], P = 0; P < k.length; P++) {
                var M = k[P],
                    j = S(M),
                    F = U(M) === r,
                    H = [t, e].indexOf(j) >= 0,
                    W = H ? "width" : "height",
                    B = mt(l, {
                        placement: M,
                        boundary: v,
                        rootBoundary: y,
                        altBoundary: w,
                        padding: b
                    }),
                    z = H ? F ? i : n : F ? e : t;
                L[W] > D[W] && (z = nt(z));
                var R = nt(z),
                    q = [];
                if (p && q.push(B[j] <= 0), g && q.push(B[z] <= 0, B[R] <= 0), q.every((function(t) {
                        return t
                    }))) {
                    N = M, I = !1;
                    break
                }
                $.set(M, q)
            }
            if (I)
                for (var V = function(t) {
                        var e = k.find((function(e) {
                            var i = $.get(e);
                            if (i) return i.slice(0, t).every((function(t) {
                                return t
                            }))
                        }));
                        if (e) return N = e, "break"
                    }, K = E ? 3 : 1; K > 0; K--) {
                    if ("break" === V(K)) break
                }
            l.placement !== N && (l.modifiersData[h]._skip = !0, l.placement = N, l.reset = !0)
        }
    },
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};

function _t(t, e, i) {
    return void 0 === i && (i = {
        x: 0,
        y: 0
    }), {
        top: t.top - e.height - i.y,
        right: t.right - e.width + i.x,
        bottom: t.bottom - e.height + i.y,
        left: t.left - e.width - i.x
    }
}

function bt(s) {
    return [t, i, e, n].some((function(t) {
        return s[t] >= 0
    }))
}
const vt = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: function(t) {
        var e = t.state,
            i = t.name,
            n = e.rects.reference,
            s = e.rects.popper,
            o = e.modifiersData.preventOverflow,
            r = mt(e, {
                elementContext: "reference"
            }),
            a = mt(e, {
                altBoundary: !0
            }),
            l = _t(r, n),
            c = _t(a, s, o),
            h = bt(l),
            u = bt(c);
        e.modifiersData[i] = {
            referenceClippingOffsets: l,
            popperEscapeOffsets: c,
            isReferenceHidden: h,
            hasPopperEscaped: u
        }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
            "data-popper-reference-hidden": h,
            "data-popper-escaped": u
        })
    }
};
const yt = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function(e) {
        var s = e.state,
            o = e.options,
            r = e.name,
            a = o.offset,
            l = void 0 === a ? [0, 0] : a,
            c = f.reduce((function(e, o) {
                return e[o] = function(e, s, o) {
                    var r = S(e),
                        a = [n, t].indexOf(r) >= 0 ? -1 : 1,
                        l = "function" == typeof o ? o(Object.assign({}, s, {
                            placement: e
                        })) : o,
                        c = l[0],
                        h = l[1];
                    return c = c || 0, h = (h || 0) * a, [n, i].indexOf(r) >= 0 ? {
                        x: h,
                        y: c
                    } : {
                        x: c,
                        y: h
                    }
                }(o, s.rects, l), e
            }), {}),
            h = c[s.placement],
            u = h.x,
            d = h.y;
        null != s.modifiersData.popperOffsets && (s.modifiersData.popperOffsets.x += u, s.modifiersData.popperOffsets.y += d), s.modifiersData[r] = c
    }
};
const wt = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: function(t) {
        var e = t.state,
            i = t.name;
        e.modifiersData[i] = pt({
            reference: e.rects.reference,
            element: e.rects.popper,
            strategy: "absolute",
            placement: e.placement
        })
    },
    data: {}
};
const At = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function(s) {
        var o = s.state,
            a = s.options,
            l = s.name,
            c = a.mainAxis,
            h = void 0 === c || c,
            u = a.altAxis,
            d = void 0 !== u && u,
            f = a.boundary,
            p = a.rootBoundary,
            m = a.altBoundary,
            g = a.padding,
            _ = a.tether,
            b = void 0 === _ || _,
            v = a.tetherOffset,
            y = void 0 === v ? 0 : v,
            w = mt(o, {
                boundary: f,
                rootBoundary: p,
                padding: g,
                altBoundary: m
            }),
            A = S(o.placement),
            E = U(o.placement),
            T = !E,
            C = V(A),
            O = "x" === C ? "y" : "x",
            x = o.modifiersData.popperOffsets,
            k = o.rects.reference,
            L = o.rects.popper,
            I = "function" == typeof y ? y(Object.assign({}, o.rects, {
                placement: o.placement
            })) : y,
            N = "number" == typeof I ? {
                mainAxis: I,
                altAxis: I
            } : Object.assign({
                mainAxis: 0,
                altAxis: 0
            }, I),
            P = o.modifiersData.offset ? o.modifiersData.offset[o.placement] : null,
            M = {
                x: 0,
                y: 0
            };
        if (x) {
            if (h) {
                var F, H = "y" === C ? t : n,
                    W = "y" === C ? e : i,
                    B = "y" === C ? "height" : "width",
                    z = x[C],
                    R = z + w[H],
                    Q = z - w[W],
                    X = b ? -L[B] / 2 : 0,
                    Y = E === r ? k[B] : L[B],
                    G = E === r ? -L[B] : -k[B],
                    J = o.elements.arrow,
                    Z = b && J ? j(J) : {
                        width: 0,
                        height: 0
                    },
                    tt = o.modifiersData["arrow#persistent"] ? o.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    et = tt[H],
                    it = tt[W],
                    nt = K(0, k[B], Z[B]),
                    st = T ? k[B] / 2 - X - nt - et - N.mainAxis : Y - nt - et - N.mainAxis,
                    ot = T ? -k[B] / 2 + X + nt + it + N.mainAxis : G + nt + it + N.mainAxis,
                    rt = o.elements.arrow && q(o.elements.arrow),
                    at = rt ? "y" === C ? rt.clientTop || 0 : rt.clientLeft || 0 : 0,
                    lt = null != (F = null == P ? void 0 : P[C]) ? F : 0,
                    ct = z + ot - lt,
                    ht = K(b ? $(R, z + st - lt - at) : R, z, b ? D(Q, ct) : Q);
                x[C] = ht, M[C] = ht - z
            }
            if (d) {
                var ut, dt = "x" === C ? t : n,
                    ft = "x" === C ? e : i,
                    pt = x[O],
                    gt = "y" === O ? "height" : "width",
                    _t = pt + w[dt],
                    bt = pt - w[ft],
                    vt = -1 !== [t, n].indexOf(A),
                    yt = null != (ut = null == P ? void 0 : P[O]) ? ut : 0,
                    wt = vt ? _t : pt - k[gt] - L[gt] - yt + N.altAxis,
                    At = vt ? pt + k[gt] + L[gt] - yt - N.altAxis : bt,
                    Et = b && vt ? (Ct = K(wt, pt, Tt = At)) > Tt ? Tt : Ct : K(b ? wt : _t, pt, b ? At : bt);
                x[O] = Et, M[O] = Et - pt
            }
            var Tt, Ct;
            o.modifiersData[l] = M
        }
    },
    requiresIfExists: ["offset"]
};

function Et(t, e, i) {
    void 0 === i && (i = !1);
    var n, s, o = x(e),
        r = x(e) && function(t) {
            var e = t.getBoundingClientRect(),
                i = I(e.width) / t.offsetWidth || 1,
                n = I(e.height) / t.offsetHeight || 1;
            return 1 !== i || 1 !== n
        }(e),
        a = B(e),
        l = M(t, r, i),
        c = {
            scrollLeft: 0,
            scrollTop: 0
        },
        h = {
            x: 0,
            y: 0
        };
    return (o || !o && !i) && (("body" !== T(e) || lt(a)) && (c = (n = e) !== C(n) && x(n) ? {
        scrollLeft: (s = n).scrollLeft,
        scrollTop: s.scrollTop
    } : rt(n)), x(e) ? ((h = M(e, !0)).x += e.clientLeft, h.y += e.clientTop) : a && (h.x = at(a))), {
        x: l.left + c.scrollLeft - h.x,
        y: l.top + c.scrollTop - h.y,
        width: l.width,
        height: l.height
    }
}

function Tt(t) {
    var e = new Map,
        i = new Set,
        n = [];

    function s(t) {
        i.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((function(t) {
            if (!i.has(t)) {
                var n = e.get(t);
                n && s(n)
            }
        })), n.push(t)
    }
    return t.forEach((function(t) {
        e.set(t.name, t)
    })), t.forEach((function(t) {
        i.has(t.name) || s(t)
    })), n
}
var Ct = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};

function Ot() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
    return !e.some((function(t) {
        return !(t && "function" == typeof t.getBoundingClientRect)
    }))
}

function xt(t) {
    void 0 === t && (t = {});
    var e = t,
        i = e.defaultModifiers,
        n = void 0 === i ? [] : i,
        s = e.defaultOptions,
        o = void 0 === s ? Ct : s;
    return function(t, e, i) {
        void 0 === i && (i = o);
        var s, r, a = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, Ct, o),
                modifiersData: {},
                elements: {
                    reference: t,
                    popper: e
                },
                attributes: {},
                styles: {}
            },
            l = [],
            c = !1,
            h = {
                state: a,
                setOptions: function(i) {
                    var s = "function" == typeof i ? i(a.options) : i;
                    u(), a.options = Object.assign({}, o, a.options, s), a.scrollParents = {
                        reference: O(t) ? ht(t) : t.contextElement ? ht(t.contextElement) : [],
                        popper: ht(e)
                    };
                    var r, c, d = function(t) {
                        var e = Tt(t);
                        return E.reduce((function(t, i) {
                            return t.concat(e.filter((function(t) {
                                return t.phase === i
                            })))
                        }), [])
                    }((r = [].concat(n, a.options.modifiers), c = r.reduce((function(t, e) {
                        var i = t[e.name];
                        return t[e.name] = i ? Object.assign({}, i, e, {
                            options: Object.assign({}, i.options, e.options),
                            data: Object.assign({}, i.data, e.data)
                        }) : e, t
                    }), {}), Object.keys(c).map((function(t) {
                        return c[t]
                    }))));
                    return a.orderedModifiers = d.filter((function(t) {
                        return t.enabled
                    })), a.orderedModifiers.forEach((function(t) {
                        var e = t.name,
                            i = t.options,
                            n = void 0 === i ? {} : i,
                            s = t.effect;
                        if ("function" == typeof s) {
                            var o = s({
                                    state: a,
                                    name: e,
                                    instance: h,
                                    options: n
                                }),
                                r = function() {};
                            l.push(o || r)
                        }
                    })), h.update()
                },
                forceUpdate: function() {
                    if (!c) {
                        var t = a.elements,
                            e = t.reference,
                            i = t.popper;
                        if (Ot(e, i)) {
                            a.rects = {
                                reference: Et(e, q(i), "fixed" === a.options.strategy),
                                popper: j(i)
                            }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function(t) {
                                return a.modifiersData[t.name] = Object.assign({}, t.data)
                            }));
                            for (var n = 0; n < a.orderedModifiers.length; n++)
                                if (!0 !== a.reset) {
                                    var s = a.orderedModifiers[n],
                                        o = s.fn,
                                        r = s.options,
                                        l = void 0 === r ? {} : r,
                                        u = s.name;
                                    "function" == typeof o && (a = o({
                                        state: a,
                                        options: l,
                                        name: u,
                                        instance: h
                                    }) || a)
                                } else a.reset = !1, n = -1
                        }
                    }
                },
                update: (s = function() {
                    return new Promise((function(t) {
                        h.forceUpdate(), t(a)
                    }))
                }, function() {
                    return r || (r = new Promise((function(t) {
                        Promise.resolve().then((function() {
                            r = void 0, t(s())
                        }))
                    }))), r
                }),
                destroy: function() {
                    u(), c = !0
                }
            };
        if (!Ot(t, e)) return h;

        function u() {
            l.forEach((function(t) {
                return t()
            })), l = []
        }
        return h.setOptions(i).then((function(t) {
            !c && i.onFirstUpdate && i.onFirstUpdate(t)
        })), h
    }
}
var kt = xt(),
    Lt = xt({
        defaultModifiers: [et, wt, Z, L]
    }),
    St = xt({
        defaultModifiers: [et, wt, Z, L, yt, gt, At, Y, vt]
    });
const Dt = Object.freeze(Object.defineProperty({
        __proto__: null,
        afterMain: v,
        afterRead: g,
        afterWrite: A,
        applyStyles: L,
        arrow: Y,
        auto: s,
        basePlacements: o,
        beforeMain: _,
        beforeRead: p,
        beforeWrite: y,
        bottom: e,
        clippingParents: l,
        computeStyles: Z,
        createPopper: St,
        createPopperBase: kt,
        createPopperLite: Lt,
        detectOverflow: mt,
        end: a,
        eventListeners: et,
        flip: gt,
        hide: vt,
        left: n,
        main: b,
        modifierPhases: E,
        offset: yt,
        placements: f,
        popper: h,
        popperGenerator: xt,
        popperOffsets: wt,
        preventOverflow: At,
        read: m,
        reference: u,
        right: i,
        start: r,
        top: t,
        variationPlacements: d,
        viewport: c,
        write: w
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    $t = new Map,
    It = {
        set(t, e, i) {
            $t.has(t) || $t.set(t, new Map);
            const n = $t.get(t);
            n.has(e) || 0 === n.size ? n.set(e, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)
        },
        get: (t, e) => $t.has(t) && $t.get(t).get(e) || null,
        remove(t, e) {
            if (!$t.has(t)) return;
            const i = $t.get(t);
            i.delete(e), 0 === i.size && $t.delete(t)
        }
    },
    Nt = "transitionend",
    Pt = t => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, ((t, e) => `#${CSS.escape(e)}`))), t),
    Mt = t => {
        t.dispatchEvent(new Event(Nt))
    },
    jt = t => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
    Ft = t => jt(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(Pt(t)) : null,
    Ht = t => {
        if (!jt(t) || 0 === t.getClientRects().length) return !1;
        const e = "visible" === getComputedStyle(t).getPropertyValue("visibility"),
            i = t.closest("details:not([open])");
        if (!i) return e;
        if (i !== t) {
            const e = t.closest("summary");
            if (e && e.parentNode !== i) return !1;
            if (null === e) return !1
        }
        return e
    },
    Wt = t => !t || t.nodeType !== Node.ELEMENT_NODE || (!!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled"))),
    Bt = t => {
        if (!document.documentElement.attachShadow) return null;
        if ("function" == typeof t.getRootNode) {
            const e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        }
        return t instanceof ShadowRoot ? t : t.parentNode ? Bt(t.parentNode) : null
    },
    zt = () => {},
    Rt = t => {
        t.offsetHeight
    },
    qt = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
    Vt = [],
    Kt = () => "rtl" === document.documentElement.dir,
    Qt = t => {
        var e;
        e = () => {
            const e = qt();
            if (e) {
                const i = t.NAME,
                    n = e.fn[i];
                e.fn[i] = t.jQueryInterface, e.fn[i].Constructor = t, e.fn[i].noConflict = () => (e.fn[i] = n, t.jQueryInterface)
            }
        }, "loading" === document.readyState ? (Vt.length || document.addEventListener("DOMContentLoaded", (() => {
            for (const t of Vt) t()
        })), Vt.push(e)) : e()
    },
    Xt = (t, e = [], i = t) => "function" == typeof t ? t(...e) : i,
    Yt = (t, e, i = !0) => {
        if (!i) return void Xt(t);
        const n = (t => {
            if (!t) return 0;
            let {
                transitionDuration: e,
                transitionDelay: i
            } = window.getComputedStyle(t);
            const n = Number.parseFloat(e),
                s = Number.parseFloat(i);
            return n || s ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0
        })(e) + 5;
        let s = !1;
        const o = ({
            target: i
        }) => {
            i === e && (s = !0, e.removeEventListener(Nt, o), Xt(t))
        };
        e.addEventListener(Nt, o), setTimeout((() => {
            s || Mt(e)
        }), n)
    },
    Ut = (t, e, i, n) => {
        const s = t.length;
        let o = t.indexOf(e);
        return -1 === o ? !i && n ? t[s - 1] : t[0] : (o += i ? 1 : -1, n && (o = (o + s) % s), t[Math.max(0, Math.min(o, s - 1))])
    },
    Gt = /[^.]*(?=\..*)\.|.*/,
    Jt = /\..*/,
    Zt = /::\d+$/,
    te = {};
/*!
 * Bootstrap v5.3.3 (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
let ee = 1;
const ie = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    ne = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

function se(t, e) {
    return e && `${e}::${ee++}` || t.uidEvent || ee++
}

function oe(t) {
    const e = se(t);
    return t.uidEvent = e, te[e] = te[e] || {}, te[e]
}

function re(t, e, i = null) {
    return Object.values(t).find((t => t.callable === e && t.delegationSelector === i))
}

function ae(t, e, i) {
    const n = "string" == typeof e,
        s = n ? i : e || i;
    let o = ue(t);
    return ne.has(o) || (o = t), [n, s, o]
}

function le(t, e, i, n, s) {
    if ("string" != typeof e || !t) return;
    let [o, r, a] = ae(e, i, n);
    if (e in ie) {
        r = (t => function(e) {
            if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
        })(r)
    }
    const l = oe(t),
        c = l[a] || (l[a] = {}),
        h = re(c, r, o ? i : null);
    if (h) return void(h.oneOff = h.oneOff && s);
    const u = se(r, e.replace(Gt, "")),
        d = o ? function(t, e, i) {
            return function n(s) {
                const o = t.querySelectorAll(e);
                for (let {
                        target: r
                    } = s; r && r !== this; r = r.parentNode)
                    for (const a of o)
                        if (a === r) return fe(s, {
                            delegateTarget: r
                        }), n.oneOff && de.off(t, s.type, e, i), i.apply(r, [s])
            }
        }(t, i, r) : function(t, e) {
            return function i(n) {
                return fe(n, {
                    delegateTarget: t
                }), i.oneOff && de.off(t, n.type, e), e.apply(t, [n])
            }
        }(t, r);
    d.delegationSelector = o ? i : null, d.callable = r, d.oneOff = s, d.uidEvent = u, c[u] = d, t.addEventListener(a, d, o)
}

function ce(t, e, i, n, s) {
    const o = re(e[i], n, s);
    o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent])
}

function he(t, e, i, n) {
    const s = e[i] || {};
    for (const [o, r] of Object.entries(s)) o.includes(n) && ce(t, e, i, r.callable, r.delegationSelector)
}

function ue(t) {
    return t = t.replace(Jt, ""), ie[t] || t
}
const de = {
    on(t, e, i, n) {
        le(t, e, i, n, !1)
    },
    one(t, e, i, n) {
        le(t, e, i, n, !0)
    },
    off(t, e, i, n) {
        if ("string" != typeof e || !t) return;
        const [s, o, r] = ae(e, i, n), a = r !== e, l = oe(t), c = l[r] || {}, h = e.startsWith(".");
        if (void 0 === o) {
            if (h)
                for (const i of Object.keys(l)) he(t, l, i, e.slice(1));
            for (const [i, n] of Object.entries(c)) {
                const s = i.replace(Zt, "");
                a && !e.includes(s) || ce(t, l, r, n.callable, n.delegationSelector)
            }
        } else {
            if (!Object.keys(c).length) return;
            ce(t, l, r, o, s ? i : null)
        }
    },
    trigger(t, e, i) {
        if ("string" != typeof e || !t) return null;
        const n = qt();
        let s = null,
            o = !0,
            r = !0,
            a = !1;
        e !== ue(e) && n && (s = n.Event(e, i), n(t).trigger(s), o = !s.isPropagationStopped(), r = !s.isImmediatePropagationStopped(), a = s.isDefaultPrevented());
        const l = fe(new Event(e, {
            bubbles: o,
            cancelable: !0
        }), i);
        return a && l.preventDefault(), r && t.dispatchEvent(l), l.defaultPrevented && s && s.preventDefault(), l
    }
};

function fe(t, e = {}) {
    for (const [n, s] of Object.entries(e)) try {
        t[n] = s
    } catch (i) {
        Object.defineProperty(t, n, {
            configurable: !0,
            get: () => s
        })
    }
    return t
}

function pe(t) {
    if ("true" === t) return !0;
    if ("false" === t) return !1;
    if (t === Number(t).toString()) return Number(t);
    if ("" === t || "null" === t) return null;
    if ("string" != typeof t) return t;
    try {
        return JSON.parse(decodeURIComponent(t))
    } catch (e) {
        return t
    }
}

function me(t) {
    return t.replace(/[A-Z]/g, (t => `-${t.toLowerCase()}`))
}
const ge = {
    setDataAttribute(t, e, i) {
        t.setAttribute(`data-bs-${me(e)}`, i)
    },
    removeDataAttribute(t, e) {
        t.removeAttribute(`data-bs-${me(e)}`)
    },
    getDataAttributes(t) {
        if (!t) return {};
        const e = {},
            i = Object.keys(t.dataset).filter((t => t.startsWith("bs") && !t.startsWith("bsConfig")));
        for (const n of i) {
            let i = n.replace(/^bs/, "");
            i = i.charAt(0).toLowerCase() + i.slice(1, i.length), e[i] = pe(t.dataset[n])
        }
        return e
    },
    getDataAttribute: (t, e) => pe(t.getAttribute(`data-bs-${me(e)}`))
};
class _e {
    static get Default() {
        return {}
    }
    static get DefaultType() {
        return {}
    }
    static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!')
    }
    _getConfig(t) {
        return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    _configAfterMerge(t) {
        return t
    }
    _mergeConfigObj(t, e) {
        const i = jt(e) ? ge.getDataAttribute(e, "config") : {};
        return { ...this.constructor.Default,
            ..."object" == typeof i ? i : {},
            ...jt(e) ? ge.getDataAttributes(e) : {},
            ..."object" == typeof t ? t : {}
        }
    }
    _typeCheckConfig(t, e = this.constructor.DefaultType) {
        for (const [n, s] of Object.entries(e)) {
            const e = t[n],
                o = jt(e) ? "element" : null == (i = e) ? `${i}` : Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();
            if (!new RegExp(s).test(o)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${s}".`)
        }
        var i
    }
}
class be extends _e {
    constructor(t, e) {
        super(), (t = Ft(t)) && (this._element = t, this._config = this._getConfig(e), It.set(this._element, this.constructor.DATA_KEY, this))
    }
    dispose() {
        It.remove(this._element, this.constructor.DATA_KEY), de.off(this._element, this.constructor.EVENT_KEY);
        for (const t of Object.getOwnPropertyNames(this)) this[t] = null
    }
    _queueCallback(t, e, i = !0) {
        Yt(t, e, i)
    }
    _getConfig(t) {
        return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    static getInstance(t) {
        return It.get(Ft(t), this.DATA_KEY)
    }
    static getOrCreateInstance(t, e = {}) {
        return this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
    }
    static get VERSION() {
        return "5.3.3"
    }
    static get DATA_KEY() {
        return `bs.${this.NAME}`
    }
    static get EVENT_KEY() {
        return `.${this.DATA_KEY}`
    }
    static eventName(t) {
        return `${t}${this.EVENT_KEY}`
    }
}
const ve = t => {
        let e = t.getAttribute("data-bs-target");
        if (!e || "#" === e) {
            let i = t.getAttribute("href");
            if (!i || !i.includes("#") && !i.startsWith(".")) return null;
            i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`), e = i && "#" !== i ? i.trim() : null
        }
        return e ? e.split(",").map((t => Pt(t))).join(",") : null
    },
    ye = {
        find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
        findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
        children: (t, e) => [].concat(...t.children).filter((t => t.matches(e))),
        parents(t, e) {
            const i = [];
            let n = t.parentNode.closest(e);
            for (; n;) i.push(n), n = n.parentNode.closest(e);
            return i
        },
        prev(t, e) {
            let i = t.previousElementSibling;
            for (; i;) {
                if (i.matches(e)) return [i];
                i = i.previousElementSibling
            }
            return []
        },
        next(t, e) {
            let i = t.nextElementSibling;
            for (; i;) {
                if (i.matches(e)) return [i];
                i = i.nextElementSibling
            }
            return []
        },
        focusableChildren(t) {
            const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t => `${t}:not([tabindex^="-"])`)).join(",");
            return this.find(e, t).filter((t => !Wt(t) && Ht(t)))
        },
        getSelectorFromElement(t) {
            const e = ve(t);
            return e && ye.findOne(e) ? e : null
        },
        getElementFromSelector(t) {
            const e = ve(t);
            return e ? ye.findOne(e) : null
        },
        getMultipleElementsFromSelector(t) {
            const e = ve(t);
            return e ? ye.find(e) : []
        }
    },
    we = (t, e = "hide") => {
        const i = `click.dismiss${t.EVENT_KEY}`,
            n = t.NAME;
        de.on(document, i, `[data-bs-dismiss="${n}"]`, (function(i) {
            if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), Wt(this)) return;
            const s = ye.getElementFromSelector(this) || this.closest(`.${n}`);
            t.getOrCreateInstance(s)[e]()
        }))
    },
    Ae = ".bs.alert",
    Ee = `close${Ae}`,
    Te = `closed${Ae}`;
class Ce extends be {
    static get NAME() {
        return "alert"
    }
    close() {
        if (de.trigger(this._element, Ee).defaultPrevented) return;
        this._element.classList.remove("show");
        const t = this._element.classList.contains("fade");
        this._queueCallback((() => this._destroyElement()), this._element, t)
    }
    _destroyElement() {
        this._element.remove(), de.trigger(this._element, Te), this.dispose()
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = Ce.getOrCreateInstance(this);
            if ("string" == typeof t) {
                if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                e[t](this)
            }
        }))
    }
}
we(Ce, "close"), Qt(Ce);
const Oe = '[data-bs-toggle="button"]';
class xe extends be {
    static get NAME() {
        return "button"
    }
    toggle() {
        this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = xe.getOrCreateInstance(this);
            "toggle" === t && e[t]()
        }))
    }
}
de.on(document, "click.bs.button.data-api", Oe, (t => {
    t.preventDefault();
    const e = t.target.closest(Oe);
    xe.getOrCreateInstance(e).toggle()
})), Qt(xe);
const ke = ".bs.swipe",
    Le = `touchstart${ke}`,
    Se = `touchmove${ke}`,
    De = `touchend${ke}`,
    $e = `pointerdown${ke}`,
    Ie = `pointerup${ke}`,
    Ne = {
        endCallback: null,
        leftCallback: null,
        rightCallback: null
    },
    Pe = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)"
    };
class Me extends _e {
    constructor(t, e) {
        super(), this._element = t, t && Me.isSupported() && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents())
    }
    static get Default() {
        return Ne
    }
    static get DefaultType() {
        return Pe
    }
    static get NAME() {
        return "swipe"
    }
    dispose() {
        de.off(this._element, ke)
    }
    _start(t) {
        this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : this._deltaX = t.touches[0].clientX
    }
    _end(t) {
        this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), Xt(this._config.endCallback)
    }
    _move(t) {
        this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX
    }
    _handleSwipe() {
        const t = Math.abs(this._deltaX);
        if (t <= 40) return;
        const e = t / this._deltaX;
        this._deltaX = 0, e && Xt(e > 0 ? this._config.rightCallback : this._config.leftCallback)
    }
    _initEvents() {
        this._supportPointerEvents ? (de.on(this._element, $e, (t => this._start(t))), de.on(this._element, Ie, (t => this._end(t))), this._element.classList.add("pointer-event")) : (de.on(this._element, Le, (t => this._start(t))), de.on(this._element, Se, (t => this._move(t))), de.on(this._element, De, (t => this._end(t))))
    }
    _eventIsPointerPenTouch(t) {
        return this._supportPointerEvents && ("pen" === t.pointerType || "touch" === t.pointerType)
    }
    static isSupported() {
        return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    }
}
const je = ".bs.carousel",
    Fe = ".data-api",
    He = "ArrowLeft",
    We = "ArrowRight",
    Be = "next",
    ze = "prev",
    Re = "left",
    qe = "right",
    Ve = `slide${je}`,
    Ke = `slid${je}`,
    Qe = `keydown${je}`,
    Xe = `mouseenter${je}`,
    Ye = `mouseleave${je}`,
    Ue = `dragstart${je}`,
    Ge = `load${je}${Fe}`,
    Je = `click${je}${Fe}`,
    Ze = "carousel",
    ti = "active",
    ei = ".active",
    ii = ".carousel-item",
    ni = ei + ii,
    si = {
        [He]: qe,
        [We]: Re
    },
    oi = {
        interval: 5e3,
        keyboard: !0,
        pause: "hover",
        ride: !1,
        touch: !0,
        wrap: !0
    },
    ri = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean"
    };
class ai extends be {
    constructor(t, e) {
        super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = ye.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === Ze && this.cycle()
    }
    static get Default() {
        return oi
    }
    static get DefaultType() {
        return ri
    }
    static get NAME() {
        return "carousel"
    }
    next() {
        this._slide(Be)
    }
    nextWhenVisible() {
        !document.hidden && Ht(this._element) && this.next()
    }
    prev() {
        this._slide(ze)
    }
    pause() {
        this._isSliding && Mt(this._element), this._clearInterval()
    }
    cycle() {
        this._clearInterval(), this._updateInterval(), this._interval = setInterval((() => this.nextWhenVisible()), this._config.interval)
    }
    _maybeEnableCycle() {
        this._config.ride && (this._isSliding ? de.one(this._element, Ke, (() => this.cycle())) : this.cycle())
    }
    to(t) {
        const e = this._getItems();
        if (t > e.length - 1 || t < 0) return;
        if (this._isSliding) return void de.one(this._element, Ke, (() => this.to(t)));
        const i = this._getItemIndex(this._getActive());
        if (i === t) return;
        const n = t > i ? Be : ze;
        this._slide(n, e[t])
    }
    dispose() {
        this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
    }
    _configAfterMerge(t) {
        return t.defaultInterval = t.interval, t
    }
    _addEventListeners() {
        this._config.keyboard && de.on(this._element, Qe, (t => this._keydown(t))), "hover" === this._config.pause && (de.on(this._element, Xe, (() => this.pause())), de.on(this._element, Ye, (() => this._maybeEnableCycle()))), this._config.touch && Me.isSupported() && this._addTouchEventListeners()
    }
    _addTouchEventListeners() {
        for (const e of ye.find(".carousel-item img", this._element)) de.on(e, Ue, (t => t.preventDefault()));
        const t = {
            leftCallback: () => this._slide(this._directionToOrder(Re)),
            rightCallback: () => this._slide(this._directionToOrder(qe)),
            endCallback: () => {
                "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((() => this._maybeEnableCycle()), 500 + this._config.interval))
            }
        };
        this._swipeHelper = new Me(this._element, t)
    }
    _keydown(t) {
        if (/input|textarea/i.test(t.target.tagName)) return;
        const e = si[t.key];
        e && (t.preventDefault(), this._slide(this._directionToOrder(e)))
    }
    _getItemIndex(t) {
        return this._getItems().indexOf(t)
    }
    _setActiveIndicatorElement(t) {
        if (!this._indicatorsElement) return;
        const e = ye.findOne(ei, this._indicatorsElement);
        e.classList.remove(ti), e.removeAttribute("aria-current");
        const i = ye.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
        i && (i.classList.add(ti), i.setAttribute("aria-current", "true"))
    }
    _updateInterval() {
        const t = this._activeElement || this._getActive();
        if (!t) return;
        const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
        this._config.interval = e || this._config.defaultInterval
    }
    _slide(t, e = null) {
        if (this._isSliding) return;
        const i = this._getActive(),
            n = t === Be,
            s = e || Ut(this._getItems(), i, n, this._config.wrap);
        if (s === i) return;
        const o = this._getItemIndex(s),
            r = e => de.trigger(this._element, e, {
                relatedTarget: s,
                direction: this._orderToDirection(t),
                from: this._getItemIndex(i),
                to: o
            });
        if (r(Ve).defaultPrevented) return;
        if (!i || !s) return;
        const a = Boolean(this._interval);
        this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = s;
        const l = n ? "carousel-item-start" : "carousel-item-end",
            c = n ? "carousel-item-next" : "carousel-item-prev";
        s.classList.add(c), Rt(s), i.classList.add(l), s.classList.add(l);
        this._queueCallback((() => {
            s.classList.remove(l, c), s.classList.add(ti), i.classList.remove(ti, c, l), this._isSliding = !1, r(Ke)
        }), i, this._isAnimated()), a && this.cycle()
    }
    _isAnimated() {
        return this._element.classList.contains("slide")
    }
    _getActive() {
        return ye.findOne(ni, this._element)
    }
    _getItems() {
        return ye.find(ii, this._element)
    }
    _clearInterval() {
        this._interval && (clearInterval(this._interval), this._interval = null)
    }
    _directionToOrder(t) {
        return Kt() ? t === Re ? ze : Be : t === Re ? Be : ze
    }
    _orderToDirection(t) {
        return Kt() ? t === ze ? Re : qe : t === ze ? qe : Re
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = ai.getOrCreateInstance(this, t);
            if ("number" != typeof t) {
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            } else e.to(t)
        }))
    }
}
de.on(document, Je, "[data-bs-slide], [data-bs-slide-to]", (function(t) {
    const e = ye.getElementFromSelector(this);
    if (!e || !e.classList.contains(Ze)) return;
    t.preventDefault();
    const i = ai.getOrCreateInstance(e),
        n = this.getAttribute("data-bs-slide-to");
    return n ? (i.to(n), void i._maybeEnableCycle()) : "next" === ge.getDataAttribute(this, "slide") ? (i.next(), void i._maybeEnableCycle()) : (i.prev(), void i._maybeEnableCycle())
})), de.on(window, Ge, (() => {
    const t = ye.find('[data-bs-ride="carousel"]');
    for (const e of t) ai.getOrCreateInstance(e)
})), Qt(ai);
const li = ".bs.collapse",
    ci = `show${li}`,
    hi = `shown${li}`,
    ui = `hide${li}`,
    di = `hidden${li}`,
    fi = `click${li}.data-api`,
    pi = "show",
    mi = "collapse",
    gi = "collapsing",
    _i = `:scope .${mi} .${mi}`,
    bi = '[data-bs-toggle="collapse"]',
    vi = {
        parent: null,
        toggle: !0
    },
    yi = {
        parent: "(null|element)",
        toggle: "boolean"
    };
class wi extends be {
    constructor(t, e) {
        super(t, e), this._isTransitioning = !1, this._triggerArray = [];
        const i = ye.find(bi);
        for (const n of i) {
            const t = ye.getSelectorFromElement(n),
                e = ye.find(t).filter((t => t === this._element));
            null !== t && e.length && this._triggerArray.push(n)
        }
        this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
    }
    static get Default() {
        return vi
    }
    static get DefaultType() {
        return yi
    }
    static get NAME() {
        return "collapse"
    }
    toggle() {
        this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (this._isTransitioning || this._isShown()) return;
        let t = [];
        if (this._config.parent && (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t => t !== this._element)).map((t => wi.getOrCreateInstance(t, {
                toggle: !1
            })))), t.length && t[0]._isTransitioning) return;
        if (de.trigger(this._element, ci).defaultPrevented) return;
        for (const n of t) n.hide();
        const e = this._getDimension();
        this._element.classList.remove(mi), this._element.classList.add(gi), this._element.style[e] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
        const i = `scroll${e[0].toUpperCase()+e.slice(1)}`;
        this._queueCallback((() => {
            this._isTransitioning = !1, this._element.classList.remove(gi), this._element.classList.add(mi, pi), this._element.style[e] = "", de.trigger(this._element, hi)
        }), this._element, !0), this._element.style[e] = `${this._element[i]}px`
    }
    hide() {
        if (this._isTransitioning || !this._isShown()) return;
        if (de.trigger(this._element, ui).defaultPrevented) return;
        const t = this._getDimension();
        this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`, Rt(this._element), this._element.classList.add(gi), this._element.classList.remove(mi, pi);
        for (const e of this._triggerArray) {
            const t = ye.getElementFromSelector(e);
            t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1)
        }
        this._isTransitioning = !0;
        this._element.style[t] = "", this._queueCallback((() => {
            this._isTransitioning = !1, this._element.classList.remove(gi), this._element.classList.add(mi), de.trigger(this._element, di)
        }), this._element, !0)
    }
    _isShown(t = this._element) {
        return t.classList.contains(pi)
    }
    _configAfterMerge(t) {
        return t.toggle = Boolean(t.toggle), t.parent = Ft(t.parent), t
    }
    _getDimension() {
        return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
    }
    _initializeChildren() {
        if (!this._config.parent) return;
        const t = this._getFirstLevelChildren(bi);
        for (const e of t) {
            const t = ye.getElementFromSelector(e);
            t && this._addAriaAndCollapsedClass([e], this._isShown(t))
        }
    }
    _getFirstLevelChildren(t) {
        const e = ye.find(_i, this._config.parent);
        return ye.find(t, this._config.parent).filter((t => !e.includes(t)))
    }
    _addAriaAndCollapsedClass(t, e) {
        if (t.length)
            for (const i of t) i.classList.toggle("collapsed", !e), i.setAttribute("aria-expanded", e)
    }
    static jQueryInterface(t) {
        const e = {};
        return "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1), this.each((function() {
            const i = wi.getOrCreateInstance(this, e);
            if ("string" == typeof t) {
                if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                i[t]()
            }
        }))
    }
}
de.on(document, fi, bi, (function(t) {
    ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
    for (const e of ye.getMultipleElementsFromSelector(this)) wi.getOrCreateInstance(e, {
        toggle: !1
    }).toggle()
})), Qt(wi);
const Ai = "dropdown",
    Ei = ".bs.dropdown",
    Ti = ".data-api",
    Ci = "ArrowUp",
    Oi = "ArrowDown",
    xi = `hide${Ei}`,
    ki = `hidden${Ei}`,
    Li = `show${Ei}`,
    Si = `shown${Ei}`,
    Di = `click${Ei}${Ti}`,
    $i = `keydown${Ei}${Ti}`,
    Ii = `keyup${Ei}${Ti}`,
    Ni = "show",
    Pi = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Mi = `${Pi}.${Ni}`,
    ji = ".dropdown-menu",
    Fi = Kt() ? "top-end" : "top-start",
    Hi = Kt() ? "top-start" : "top-end",
    Wi = Kt() ? "bottom-end" : "bottom-start",
    Bi = Kt() ? "bottom-start" : "bottom-end",
    zi = Kt() ? "left-start" : "right-start",
    Ri = Kt() ? "right-start" : "left-start",
    qi = {
        autoClose: !0,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [0, 2],
        popperConfig: null,
        reference: "toggle"
    },
    Vi = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)"
    };
class Ki extends be {
    constructor(t, e) {
        super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = ye.next(this._element, ji)[0] || ye.prev(this._element, ji)[0] || ye.findOne(ji, this._parent), this._inNavbar = this._detectNavbar()
    }
    static get Default() {
        return qi
    }
    static get DefaultType() {
        return Vi
    }
    static get NAME() {
        return Ai
    }
    toggle() {
        return this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (Wt(this._element) || this._isShown()) return;
        const t = {
            relatedTarget: this._element
        };
        if (!de.trigger(this._element, Li, t).defaultPrevented) {
            if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
                for (const t of [].concat(...document.body.children)) de.on(t, "mouseover", zt);
            this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ni), this._element.classList.add(Ni), de.trigger(this._element, Si, t)
        }
    }
    hide() {
        if (Wt(this._element) || !this._isShown()) return;
        const t = {
            relatedTarget: this._element
        };
        this._completeHide(t)
    }
    dispose() {
        this._popper && this._popper.destroy(), super.dispose()
    }
    update() {
        this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
    }
    _completeHide(t) {
        if (!de.trigger(this._element, xi, t).defaultPrevented) {
            if ("ontouchstart" in document.documentElement)
                for (const t of [].concat(...document.body.children)) de.off(t, "mouseover", zt);
            this._popper && this._popper.destroy(), this._menu.classList.remove(Ni), this._element.classList.remove(Ni), this._element.setAttribute("aria-expanded", "false"), ge.removeDataAttribute(this._menu, "popper"), de.trigger(this._element, ki, t)
        }
    }
    _getConfig(t) {
        if ("object" == typeof(t = super._getConfig(t)).reference && !jt(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError(`${Ai.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
        return t
    }
    _createPopper() {
        if (void 0 === Dt) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
        let t = this._element;
        "parent" === this._config.reference ? t = this._parent : jt(this._config.reference) ? t = Ft(this._config.reference) : "object" == typeof this._config.reference && (t = this._config.reference);
        const e = this._getPopperConfig();
        this._popper = St(t, this._menu, e)
    }
    _isShown() {
        return this._menu.classList.contains(Ni)
    }
    _getPlacement() {
        const t = this._parent;
        if (t.classList.contains("dropend")) return zi;
        if (t.classList.contains("dropstart")) return Ri;
        if (t.classList.contains("dropup-center")) return "top";
        if (t.classList.contains("dropdown-center")) return "bottom";
        const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
        return t.classList.contains("dropup") ? e ? Hi : Fi : e ? Bi : Wi
    }
    _detectNavbar() {
        return null !== this._element.closest(".navbar")
    }
    _getOffset() {
        const {
            offset: t
        } = this._config;
        return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
    }
    _getPopperConfig() {
        const t = {
            placement: this._getPlacement(),
            modifiers: [{
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }]
        };
        return (this._inNavbar || "static" === this._config.display) && (ge.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
            name: "applyStyles",
            enabled: !1
        }]), { ...t,
            ...Xt(this._config.popperConfig, [t])
        }
    }
    _selectMenuItem({
        key: t,
        target: e
    }) {
        const i = ye.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t => Ht(t)));
        i.length && Ut(i, e, t === Oi, !i.includes(e)).focus()
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = Ki.getOrCreateInstance(this, t);
            if ("string" == typeof t) {
                if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        }))
    }
    static clearMenus(t) {
        if (2 === t.button || "keyup" === t.type && "Tab" !== t.key) return;
        const e = ye.find(Mi);
        for (const i of e) {
            const e = Ki.getInstance(i);
            if (!e || !1 === e._config.autoClose) continue;
            const n = t.composedPath(),
                s = n.includes(e._menu);
            if (n.includes(e._element) || "inside" === e._config.autoClose && !s || "outside" === e._config.autoClose && s) continue;
            if (e._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
            const o = {
                relatedTarget: e._element
            };
            "click" === t.type && (o.clickEvent = t), e._completeHide(o)
        }
    }
    static dataApiKeydownHandler(t) {
        const e = /input|textarea/i.test(t.target.tagName),
            i = "Escape" === t.key,
            n = [Ci, Oi].includes(t.key);
        if (!n && !i) return;
        if (e && !i) return;
        t.preventDefault();
        const s = this.matches(Pi) ? this : ye.prev(this, Pi)[0] || ye.next(this, Pi)[0] || ye.findOne(Pi, t.delegateTarget.parentNode),
            o = Ki.getOrCreateInstance(s);
        if (n) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
        o._isShown() && (t.stopPropagation(), o.hide(), s.focus())
    }
}
de.on(document, $i, Pi, Ki.dataApiKeydownHandler), de.on(document, $i, ji, Ki.dataApiKeydownHandler), de.on(document, Di, Ki.clearMenus), de.on(document, Ii, Ki.clearMenus), de.on(document, Di, Pi, (function(t) {
    t.preventDefault(), Ki.getOrCreateInstance(this).toggle()
})), Qt(Ki);
const Qi = "backdrop",
    Xi = "show",
    Yi = `mousedown.bs.${Qi}`,
    Ui = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: !1,
        isVisible: !0,
        rootElement: "body"
    },
    Gi = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
    };
class Ji extends _e {
    constructor(t) {
        super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null
    }
    static get Default() {
        return Ui
    }
    static get DefaultType() {
        return Gi
    }
    static get NAME() {
        return Qi
    }
    show(t) {
        if (!this._config.isVisible) return void Xt(t);
        this._append();
        const e = this._getElement();
        this._config.isAnimated && Rt(e), e.classList.add(Xi), this._emulateAnimation((() => {
            Xt(t)
        }))
    }
    hide(t) {
        this._config.isVisible ? (this._getElement().classList.remove(Xi), this._emulateAnimation((() => {
            this.dispose(), Xt(t)
        }))) : Xt(t)
    }
    dispose() {
        this._isAppended && (de.off(this._element, Yi), this._element.remove(), this._isAppended = !1)
    }
    _getElement() {
        if (!this._element) {
            const t = document.createElement("div");
            t.className = this._config.className, this._config.isAnimated && t.classList.add("fade"), this._element = t
        }
        return this._element
    }
    _configAfterMerge(t) {
        return t.rootElement = Ft(t.rootElement), t
    }
    _append() {
        if (this._isAppended) return;
        const t = this._getElement();
        this._config.rootElement.append(t), de.on(t, Yi, (() => {
            Xt(this._config.clickCallback)
        })), this._isAppended = !0
    }
    _emulateAnimation(t) {
        Yt(t, this._getElement(), this._config.isAnimated)
    }
}
const Zi = ".bs.focustrap",
    tn = `focusin${Zi}`,
    en = `keydown.tab${Zi}`,
    nn = "backward",
    sn = {
        autofocus: !0,
        trapElement: null
    },
    on = {
        autofocus: "boolean",
        trapElement: "element"
    };
class rn extends _e {
    constructor(t) {
        super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null
    }
    static get Default() {
        return sn
    }
    static get DefaultType() {
        return on
    }
    static get NAME() {
        return "focustrap"
    }
    activate() {
        this._isActive || (this._config.autofocus && this._config.trapElement.focus(), de.off(document, Zi), de.on(document, tn, (t => this._handleFocusin(t))), de.on(document, en, (t => this._handleKeydown(t))), this._isActive = !0)
    }
    deactivate() {
        this._isActive && (this._isActive = !1, de.off(document, Zi))
    }
    _handleFocusin(t) {
        const {
            trapElement: e
        } = this._config;
        if (t.target === document || t.target === e || e.contains(t.target)) return;
        const i = ye.focusableChildren(e);
        0 === i.length ? e.focus() : this._lastTabNavDirection === nn ? i[i.length - 1].focus() : i[0].focus()
    }
    _handleKeydown(t) {
        "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? nn : "forward")
    }
}
const an = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    ln = ".sticky-top",
    cn = "padding-right",
    hn = "margin-right";
class un {
    constructor() {
        this._element = document.body
    }
    getWidth() {
        const t = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - t)
    }
    hide() {
        const t = this.getWidth();
        this._disableOverFlow(), this._setElementAttributes(this._element, cn, (e => e + t)), this._setElementAttributes(an, cn, (e => e + t)), this._setElementAttributes(ln, hn, (e => e - t))
    }
    reset() {
        this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, cn), this._resetElementAttributes(an, cn), this._resetElementAttributes(ln, hn)
    }
    isOverflowing() {
        return this.getWidth() > 0
    }
    _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
    }
    _setElementAttributes(t, e, i) {
        const n = this.getWidth();
        this._applyManipulationCallback(t, (t => {
            if (t !== this._element && window.innerWidth > t.clientWidth + n) return;
            this._saveInitialAttribute(t, e);
            const s = window.getComputedStyle(t).getPropertyValue(e);
            t.style.setProperty(e, `${i(Number.parseFloat(s))}px`)
        }))
    }
    _saveInitialAttribute(t, e) {
        const i = t.style.getPropertyValue(e);
        i && ge.setDataAttribute(t, e, i)
    }
    _resetElementAttributes(t, e) {
        this._applyManipulationCallback(t, (t => {
            const i = ge.getDataAttribute(t, e);
            null !== i ? (ge.removeDataAttribute(t, e), t.style.setProperty(e, i)) : t.style.removeProperty(e)
        }))
    }
    _applyManipulationCallback(t, e) {
        if (jt(t)) e(t);
        else
            for (const i of ye.find(t, this._element)) e(i)
    }
}
const dn = ".bs.modal",
    fn = `hide${dn}`,
    pn = `hidePrevented${dn}`,
    mn = `hidden${dn}`,
    gn = `show${dn}`,
    _n = `shown${dn}`,
    bn = `resize${dn}`,
    vn = `click.dismiss${dn}`,
    yn = `mousedown.dismiss${dn}`,
    wn = `keydown.dismiss${dn}`,
    An = `click${dn}.data-api`,
    En = "modal-open",
    Tn = "show",
    Cn = "modal-static",
    On = {
        backdrop: !0,
        focus: !0,
        keyboard: !0
    },
    xn = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean"
    };
class kn extends be {
    constructor(t, e) {
        super(t, e), this._dialog = ye.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new un, this._addEventListeners()
    }
    static get Default() {
        return On
    }
    static get DefaultType() {
        return xn
    }
    static get NAME() {
        return "modal"
    }
    toggle(t) {
        return this._isShown ? this.hide() : this.show(t)
    }
    show(t) {
        if (this._isShown || this._isTransitioning) return;
        de.trigger(this._element, gn, {
            relatedTarget: t
        }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(En), this._adjustDialog(), this._backdrop.show((() => this._showElement(t))))
    }
    hide() {
        if (!this._isShown || this._isTransitioning) return;
        de.trigger(this._element, fn).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(Tn), this._queueCallback((() => this._hideModal()), this._element, this._isAnimated()))
    }
    dispose() {
        de.off(window, dn), de.off(this._dialog, dn), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    handleUpdate() {
        this._adjustDialog()
    }
    _initializeBackDrop() {
        return new Ji({
            isVisible: Boolean(this._config.backdrop),
            isAnimated: this._isAnimated()
        })
    }
    _initializeFocusTrap() {
        return new rn({
            trapElement: this._element
        })
    }
    _showElement(t) {
        document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
        const e = ye.findOne(".modal-body", this._dialog);
        e && (e.scrollTop = 0), Rt(this._element), this._element.classList.add(Tn);
        this._queueCallback((() => {
            this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, de.trigger(this._element, _n, {
                relatedTarget: t
            })
        }), this._dialog, this._isAnimated())
    }
    _addEventListeners() {
        de.on(this._element, wn, (t => {
            "Escape" === t.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition())
        })), de.on(window, bn, (() => {
            this._isShown && !this._isTransitioning && this._adjustDialog()
        })), de.on(this._element, yn, (t => {
            de.one(this._element, vn, (e => {
                this._element === t.target && this._element === e.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
            }))
        }))
    }
    _hideModal() {
        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide((() => {
            document.body.classList.remove(En), this._resetAdjustments(), this._scrollBar.reset(), de.trigger(this._element, mn)
        }))
    }
    _isAnimated() {
        return this._element.classList.contains("fade")
    }
    _triggerBackdropTransition() {
        if (de.trigger(this._element, pn).defaultPrevented) return;
        const t = this._element.scrollHeight > document.documentElement.clientHeight,
            e = this._element.style.overflowY;
        "hidden" === e || this._element.classList.contains(Cn) || (t || (this._element.style.overflowY = "hidden"), this._element.classList.add(Cn), this._queueCallback((() => {
            this._element.classList.remove(Cn), this._queueCallback((() => {
                this._element.style.overflowY = e
            }), this._dialog)
        }), this._dialog), this._element.focus())
    }
    _adjustDialog() {
        const t = this._element.scrollHeight > document.documentElement.clientHeight,
            e = this._scrollBar.getWidth(),
            i = e > 0;
        if (i && !t) {
            const t = Kt() ? "paddingLeft" : "paddingRight";
            this._element.style[t] = `${e}px`
        }
        if (!i && t) {
            const t = Kt() ? "paddingRight" : "paddingLeft";
            this._element.style[t] = `${e}px`
        }
    }
    _resetAdjustments() {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
    }
    static jQueryInterface(t, e) {
        return this.each((function() {
            const i = kn.getOrCreateInstance(this, t);
            if ("string" == typeof t) {
                if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                i[t](e)
            }
        }))
    }
}
de.on(document, An, '[data-bs-toggle="modal"]', (function(t) {
    const e = ye.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && t.preventDefault(), de.one(e, gn, (t => {
        t.defaultPrevented || de.one(e, mn, (() => {
            Ht(this) && this.focus()
        }))
    }));
    const i = ye.findOne(".modal.show");
    i && kn.getInstance(i).hide();
    kn.getOrCreateInstance(e).toggle(this)
})), we(kn), Qt(kn);
const Ln = ".bs.offcanvas",
    Sn = ".data-api",
    Dn = `load${Ln}${Sn}`,
    $n = "show",
    In = "showing",
    Nn = "hiding",
    Pn = ".offcanvas.show",
    Mn = `show${Ln}`,
    jn = `shown${Ln}`,
    Fn = `hide${Ln}`,
    Hn = `hidePrevented${Ln}`,
    Wn = `hidden${Ln}`,
    Bn = `resize${Ln}`,
    zn = `click${Ln}${Sn}`,
    Rn = `keydown.dismiss${Ln}`,
    qn = {
        backdrop: !0,
        keyboard: !0,
        scroll: !1
    },
    Vn = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean"
    };
class Kn extends be {
    constructor(t, e) {
        super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
    }
    static get Default() {
        return qn
    }
    static get DefaultType() {
        return Vn
    }
    static get NAME() {
        return "offcanvas"
    }
    toggle(t) {
        return this._isShown ? this.hide() : this.show(t)
    }
    show(t) {
        if (this._isShown) return;
        if (de.trigger(this._element, Mn, {
                relatedTarget: t
            }).defaultPrevented) return;
        this._isShown = !0, this._backdrop.show(), this._config.scroll || (new un).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(In);
        this._queueCallback((() => {
            this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add($n), this._element.classList.remove(In), de.trigger(this._element, jn, {
                relatedTarget: t
            })
        }), this._element, !0)
    }
    hide() {
        if (!this._isShown) return;
        if (de.trigger(this._element, Fn).defaultPrevented) return;
        this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Nn), this._backdrop.hide();
        this._queueCallback((() => {
            this._element.classList.remove($n, Nn), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new un).reset(), de.trigger(this._element, Wn)
        }), this._element, !0)
    }
    dispose() {
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    _initializeBackDrop() {
        const t = Boolean(this._config.backdrop);
        return new Ji({
            className: "offcanvas-backdrop",
            isVisible: t,
            isAnimated: !0,
            rootElement: this._element.parentNode,
            clickCallback: t ? () => {
                "static" !== this._config.backdrop ? this.hide() : de.trigger(this._element, Hn)
            } : null
        })
    }
    _initializeFocusTrap() {
        return new rn({
            trapElement: this._element
        })
    }
    _addEventListeners() {
        de.on(this._element, Rn, (t => {
            "Escape" === t.key && (this._config.keyboard ? this.hide() : de.trigger(this._element, Hn))
        }))
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = Kn.getOrCreateInstance(this, t);
            if ("string" == typeof t) {
                if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                e[t](this)
            }
        }))
    }
}
de.on(document, zn, '[data-bs-toggle="offcanvas"]', (function(t) {
    const e = ye.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), Wt(this)) return;
    de.one(e, Wn, (() => {
        Ht(this) && this.focus()
    }));
    const i = ye.findOne(Pn);
    i && i !== e && Kn.getInstance(i).hide();
    Kn.getOrCreateInstance(e).toggle(this)
})), de.on(window, Dn, (() => {
    for (const t of ye.find(Pn)) Kn.getOrCreateInstance(t).show()
})), de.on(window, Bn, (() => {
    for (const t of ye.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t).position && Kn.getOrCreateInstance(t).hide()
})), we(Kn), Qt(Kn);
const Qn = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        dd: [],
        div: [],
        dl: [],
        dt: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    },
    Xn = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
    Yn = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
    Un = (t, e) => {
        const i = t.nodeName.toLowerCase();
        return e.includes(i) ? !Xn.has(i) || Boolean(Yn.test(t.nodeValue)) : e.filter((t => t instanceof RegExp)).some((t => t.test(i)))
    };
const Gn = {
        allowList: Qn,
        content: {},
        extraClass: "",
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: "<div></div>"
    },
    Jn = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string"
    },
    Zn = {
        entry: "(string|element|function|null)",
        selector: "(string|element)"
    };
class ts extends _e {
    constructor(t) {
        super(), this._config = this._getConfig(t)
    }
    static get Default() {
        return Gn
    }
    static get DefaultType() {
        return Jn
    }
    static get NAME() {
        return "TemplateFactory"
    }
    getContent() {
        return Object.values(this._config.content).map((t => this._resolvePossibleFunction(t))).filter(Boolean)
    }
    hasContent() {
        return this.getContent().length > 0
    }
    changeContent(t) {
        return this._checkContent(t), this._config.content = { ...this._config.content,
            ...t
        }, this
    }
    toHtml() {
        const t = document.createElement("div");
        t.innerHTML = this._maybeSanitize(this._config.template);
        for (const [n, s] of Object.entries(this._config.content)) this._setContent(t, s, n);
        const e = t.children[0],
            i = this._resolvePossibleFunction(this._config.extraClass);
        return i && e.classList.add(...i.split(" ")), e
    }
    _typeCheckConfig(t) {
        super._typeCheckConfig(t), this._checkContent(t.content)
    }
    _checkContent(t) {
        for (const [e, i] of Object.entries(t)) super._typeCheckConfig({
            selector: e,
            entry: i
        }, Zn)
    }
    _setContent(t, e, i) {
        const n = ye.findOne(i, t);
        n && ((e = this._resolvePossibleFunction(e)) ? jt(e) ? this._putElementInTemplate(Ft(e), n) : this._config.html ? n.innerHTML = this._maybeSanitize(e) : n.textContent = e : n.remove())
    }
    _maybeSanitize(t) {
        return this._config.sanitize ? function(t, e, i) {
            if (!t.length) return t;
            if (i && "function" == typeof i) return i(t);
            const n = (new window.DOMParser).parseFromString(t, "text/html"),
                s = [].concat(...n.body.querySelectorAll("*"));
            for (const o of s) {
                const t = o.nodeName.toLowerCase();
                if (!Object.keys(e).includes(t)) {
                    o.remove();
                    continue
                }
                const i = [].concat(...o.attributes),
                    n = [].concat(e["*"] || [], e[t] || []);
                for (const e of i) Un(e, n) || o.removeAttribute(e.nodeName)
            }
            return n.body.innerHTML
        }(t, this._config.allowList, this._config.sanitizeFn) : t
    }
    _resolvePossibleFunction(t) {
        return Xt(t, [this])
    }
    _putElementInTemplate(t, e) {
        if (this._config.html) return e.innerHTML = "", void e.append(t);
        e.textContent = t.textContent
    }
}
const es = new Set(["sanitize", "allowList", "sanitizeFn"]),
    is = "fade",
    ns = "show",
    ss = ".tooltip-inner",
    os = ".modal",
    rs = "hide.bs.modal",
    as = "hover",
    ls = "focus",
    cs = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: Kt() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: Kt() ? "right" : "left"
    },
    hs = {
        allowList: Qn,
        animation: !0,
        boundary: "clippingParents",
        container: !1,
        customClass: "",
        delay: 0,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        html: !1,
        offset: [0, 6],
        placement: "top",
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: "",
        trigger: "hover focus"
    },
    us = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string"
    };
class ds extends be {
    constructor(t, e) {
        if (void 0 === Dt) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
        super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
    }
    static get Default() {
        return hs
    }
    static get DefaultType() {
        return us
    }
    static get NAME() {
        return "tooltip"
    }
    enable() {
        this._isEnabled = !0
    }
    disable() {
        this._isEnabled = !1
    }
    toggleEnabled() {
        this._isEnabled = !this._isEnabled
    }
    toggle() {
        this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter())
    }
    dispose() {
        clearTimeout(this._timeout), de.off(this._element.closest(os), rs, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
    }
    show() {
        if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
        if (!this._isWithContent() || !this._isEnabled) return;
        const t = de.trigger(this._element, this.constructor.eventName("show")),
            e = (Bt(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
        if (t.defaultPrevented || !e) return;
        this._disposePopper();
        const i = this._getTipElement();
        this._element.setAttribute("aria-describedby", i.getAttribute("id"));
        const {
            container: n
        } = this._config;
        if (this._element.ownerDocument.documentElement.contains(this.tip) || (n.append(i), de.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i), i.classList.add(ns), "ontouchstart" in document.documentElement)
            for (const s of [].concat(...document.body.children)) de.on(s, "mouseover", zt);
        this._queueCallback((() => {
            de.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1
        }), this.tip, this._isAnimated())
    }
    hide() {
        if (!this._isShown()) return;
        if (de.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) return;
        if (this._getTipElement().classList.remove(ns), "ontouchstart" in document.documentElement)
            for (const t of [].concat(...document.body.children)) de.off(t, "mouseover", zt);
        this._activeTrigger.click = !1, this._activeTrigger[ls] = !1, this._activeTrigger[as] = !1, this._isHovered = null;
        this._queueCallback((() => {
            this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), de.trigger(this._element, this.constructor.eventName("hidden")))
        }), this.tip, this._isAnimated())
    }
    update() {
        this._popper && this._popper.update()
    }
    _isWithContent() {
        return Boolean(this._getTitle())
    }
    _getTipElement() {
        return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
    }
    _createTipElement(t) {
        const e = this._getTemplateFactory(t).toHtml();
        if (!e) return null;
        e.classList.remove(is, ns), e.classList.add(`bs-${this.constructor.NAME}-auto`);
        const i = (t => {
            do {
                t += Math.floor(1e6 * Math.random())
            } while (document.getElementById(t));
            return t
        })(this.constructor.NAME).toString();
        return e.setAttribute("id", i), this._isAnimated() && e.classList.add(is), e
    }
    setContent(t) {
        this._newContent = t, this._isShown() && (this._disposePopper(), this.show())
    }
    _getTemplateFactory(t) {
        return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new ts({ ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass)
        }), this._templateFactory
    }
    _getContentForTemplate() {
        return {
            [ss]: this._getTitle()
        }
    }
    _getTitle() {
        return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
    }
    _initializeOnDelegatedTarget(t) {
        return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
    }
    _isAnimated() {
        return this._config.animation || this.tip && this.tip.classList.contains(is)
    }
    _isShown() {
        return this.tip && this.tip.classList.contains(ns)
    }
    _createPopper(t) {
        const e = Xt(this._config.placement, [this, t, this._element]),
            i = cs[e.toUpperCase()];
        return St(this._element, t, this._getPopperConfig(i))
    }
    _getOffset() {
        const {
            offset: t
        } = this._config;
        return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
    }
    _resolvePossibleFunction(t) {
        return Xt(t, [this._element])
    }
    _getPopperConfig(t) {
        const e = {
            placement: t,
            modifiers: [{
                name: "flip",
                options: {
                    fallbackPlacements: this._config.fallbackPlacements
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }, {
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "arrow",
                options: {
                    element: `.${this.constructor.NAME}-arrow`
                }
            }, {
                name: "preSetPlacement",
                enabled: !0,
                phase: "beforeMain",
                fn: t => {
                    this._getTipElement().setAttribute("data-popper-placement", t.state.placement)
                }
            }]
        };
        return { ...e,
            ...Xt(this._config.popperConfig, [e])
        }
    }
    _setListeners() {
        const t = this._config.trigger.split(" ");
        for (const e of t)
            if ("click" === e) de.on(this._element, this.constructor.eventName("click"), this._config.selector, (t => {
                this._initializeOnDelegatedTarget(t).toggle()
            }));
            else if ("manual" !== e) {
            const t = e === as ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                i = e === as ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
            de.on(this._element, t, this._config.selector, (t => {
                const e = this._initializeOnDelegatedTarget(t);
                e._activeTrigger["focusin" === t.type ? ls : as] = !0, e._enter()
            })), de.on(this._element, i, this._config.selector, (t => {
                const e = this._initializeOnDelegatedTarget(t);
                e._activeTrigger["focusout" === t.type ? ls : as] = e._element.contains(t.relatedTarget), e._leave()
            }))
        }
        this._hideModalHandler = () => {
            this._element && this.hide()
        }, de.on(this._element.closest(os), rs, this._hideModalHandler)
    }
    _fixTitle() {
        const t = this._element.getAttribute("title");
        t && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"))
    }
    _enter() {
        this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout((() => {
            this._isHovered && this.show()
        }), this._config.delay.show))
    }
    _leave() {
        this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout((() => {
            this._isHovered || this.hide()
        }), this._config.delay.hide))
    }
    _setTimeout(t, e) {
        clearTimeout(this._timeout), this._timeout = setTimeout(t, e)
    }
    _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0)
    }
    _getConfig(t) {
        const e = ge.getDataAttributes(this._element);
        for (const i of Object.keys(e)) es.has(i) && delete e[i];
        return t = { ...e,
            ..."object" == typeof t && t ? t : {}
        }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    _configAfterMerge(t) {
        return t.container = !1 === t.container ? document.body : Ft(t.container), "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), t
    }
    _getDelegateConfig() {
        const t = {};
        for (const [e, i] of Object.entries(this._config)) this.constructor.Default[e] !== i && (t[e] = i);
        return t.selector = !1, t.trigger = "manual", t
    }
    _disposePopper() {
        this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = ds.getOrCreateInstance(this, t);
            if ("string" == typeof t) {
                if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        }))
    }
}
Qt(ds);
const fs = ".popover-header",
    ps = ".popover-body",
    ms = { ...ds.Default,
        content: "",
        offset: [0, 8],
        placement: "right",
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        trigger: "click"
    },
    gs = { ...ds.DefaultType,
        content: "(null|string|element|function)"
    };
class _s extends ds {
    static get Default() {
        return ms
    }
    static get DefaultType() {
        return gs
    }
    static get NAME() {
        return "popover"
    }
    _isWithContent() {
        return this._getTitle() || this._getContent()
    }
    _getContentForTemplate() {
        return {
            [fs]: this._getTitle(),
            [ps]: this._getContent()
        }
    }
    _getContent() {
        return this._resolvePossibleFunction(this._config.content)
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = _s.getOrCreateInstance(this, t);
            if ("string" == typeof t) {
                if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        }))
    }
}
Qt(_s);
const bs = ".bs.scrollspy",
    vs = `activate${bs}`,
    ys = `click${bs}`,
    ws = `load${bs}.data-api`,
    As = "active",
    Es = "[href]",
    Ts = ".nav-link",
    Cs = `${Ts}, .nav-item > ${Ts}, .list-group-item`,
    Os = {
        offset: null,
        rootMargin: "0px 0px -25%",
        smoothScroll: !1,
        target: null,
        threshold: [.1, .5, 1]
    },
    xs = {
        offset: "(number|null)",
        rootMargin: "string",
        smoothScroll: "boolean",
        target: "element",
        threshold: "array"
    };
class ks extends be {
    constructor(t, e) {
        super(t, e), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0
        }, this.refresh()
    }
    static get Default() {
        return Os
    }
    static get DefaultType() {
        return xs
    }
    static get NAME() {
        return "scrollspy"
    }
    refresh() {
        this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
        for (const t of this._observableSections.values()) this._observer.observe(t)
    }
    dispose() {
        this._observer.disconnect(), super.dispose()
    }
    _configAfterMerge(t) {
        return t.target = Ft(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, "string" == typeof t.threshold && (t.threshold = t.threshold.split(",").map((t => Number.parseFloat(t)))), t
    }
    _maybeEnableSmoothScroll() {
        this._config.smoothScroll && (de.off(this._config.target, ys), de.on(this._config.target, ys, Es, (t => {
            const e = this._observableSections.get(t.target.hash);
            if (e) {
                t.preventDefault();
                const i = this._rootElement || window,
                    n = e.offsetTop - this._element.offsetTop;
                if (i.scrollTo) return void i.scrollTo({
                    top: n,
                    behavior: "smooth"
                });
                i.scrollTop = n
            }
        })))
    }
    _getNewObserver() {
        const t = {
            root: this._rootElement,
            threshold: this._config.threshold,
            rootMargin: this._config.rootMargin
        };
        return new IntersectionObserver((t => this._observerCallback(t)), t)
    }
    _observerCallback(t) {
        const e = t => this._targetLinks.get(`#${t.target.id}`),
            i = t => {
                this._previousScrollData.visibleEntryTop = t.target.offsetTop, this._process(e(t))
            },
            n = (this._rootElement || document.documentElement).scrollTop,
            s = n >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = n;
        for (const o of t) {
            if (!o.isIntersecting) {
                this._activeTarget = null, this._clearActiveClass(e(o));
                continue
            }
            const t = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
            if (s && t) {
                if (i(o), !n) return
            } else s || t || i(o)
        }
    }
    _initializeTargetsAndObservables() {
        this._targetLinks = new Map, this._observableSections = new Map;
        const t = ye.find(Es, this._config.target);
        for (const e of t) {
            if (!e.hash || Wt(e)) continue;
            const t = ye.findOne(decodeURI(e.hash), this._element);
            Ht(t) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, t))
        }
    }
    _process(t) {
        this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(As), this._activateParents(t), de.trigger(this._element, vs, {
            relatedTarget: t
        }))
    }
    _activateParents(t) {
        if (t.classList.contains("dropdown-item")) ye.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(As);
        else
            for (const e of ye.parents(t, ".nav, .list-group"))
                for (const t of ye.prev(e, Cs)) t.classList.add(As)
    }
    _clearActiveClass(t) {
        t.classList.remove(As);
        const e = ye.find(`${Es}.${As}`, t);
        for (const i of e) i.classList.remove(As)
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = ks.getOrCreateInstance(this, t);
            if ("string" == typeof t) {
                if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        }))
    }
}
de.on(window, ws, (() => {
    for (const t of ye.find('[data-bs-spy="scroll"]')) ks.getOrCreateInstance(t)
})), Qt(ks);
const Ls = ".bs.tab",
    Ss = `hide${Ls}`,
    Ds = `hidden${Ls}`,
    $s = `show${Ls}`,
    Is = `shown${Ls}`,
    Ns = `click${Ls}`,
    Ps = `keydown${Ls}`,
    Ms = `load${Ls}`,
    js = "ArrowLeft",
    Fs = "ArrowRight",
    Hs = "ArrowUp",
    Ws = "ArrowDown",
    Bs = "Home",
    zs = "End",
    Rs = "active",
    qs = "fade",
    Vs = "show",
    Ks = ".dropdown-toggle",
    Qs = `:not(${Ks})`,
    Xs = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    Ys = `${`.nav-link${Qs}, .list-group-item${Qs}, [role="tab"]${Qs}`}, ${Xs}`,
    Us = `.${Rs}[data-bs-toggle="tab"], .${Rs}[data-bs-toggle="pill"], .${Rs}[data-bs-toggle="list"]`;
class Gs extends be {
    constructor(t) {
        super(t), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), de.on(this._element, Ps, (t => this._keydown(t))))
    }
    static get NAME() {
        return "tab"
    }
    show() {
        const t = this._element;
        if (this._elemIsActive(t)) return;
        const e = this._getActiveElem(),
            i = e ? de.trigger(e, Ss, {
                relatedTarget: t
            }) : null;
        de.trigger(t, $s, {
            relatedTarget: e
        }).defaultPrevented || i && i.defaultPrevented || (this._deactivate(e, t), this._activate(t, e))
    }
    _activate(t, e) {
        if (!t) return;
        t.classList.add(Rs), this._activate(ye.getElementFromSelector(t));
        this._queueCallback((() => {
            "tab" === t.getAttribute("role") ? (t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), de.trigger(t, Is, {
                relatedTarget: e
            })) : t.classList.add(Vs)
        }), t, t.classList.contains(qs))
    }
    _deactivate(t, e) {
        if (!t) return;
        t.classList.remove(Rs), t.blur(), this._deactivate(ye.getElementFromSelector(t));
        this._queueCallback((() => {
            "tab" === t.getAttribute("role") ? (t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), de.trigger(t, Ds, {
                relatedTarget: e
            })) : t.classList.remove(Vs)
        }), t, t.classList.contains(qs))
    }
    _keydown(t) {
        if (![js, Fs, Hs, Ws, Bs, zs].includes(t.key)) return;
        t.stopPropagation(), t.preventDefault();
        const e = this._getChildren().filter((t => !Wt(t)));
        let i;
        if ([Bs, zs].includes(t.key)) i = e[t.key === Bs ? 0 : e.length - 1];
        else {
            const n = [Fs, Ws].includes(t.key);
            i = Ut(e, t.target, n, !0)
        }
        i && (i.focus({
            preventScroll: !0
        }), Gs.getOrCreateInstance(i).show())
    }
    _getChildren() {
        return ye.find(Ys, this._parent)
    }
    _getActiveElem() {
        return this._getChildren().find((t => this._elemIsActive(t))) || null
    }
    _setInitialAttributes(t, e) {
        this._setAttributeIfNotExists(t, "role", "tablist");
        for (const i of e) this._setInitialAttributesOnChild(i)
    }
    _setInitialAttributesOnChild(t) {
        t = this._getInnerElement(t);
        const e = this._elemIsActive(t),
            i = this._getOuterElement(t);
        t.setAttribute("aria-selected", e), i !== t && this._setAttributeIfNotExists(i, "role", "presentation"), e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t)
    }
    _setInitialAttributesOnTargetPanel(t) {
        const e = ye.getElementFromSelector(t);
        e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`))
    }
    _toggleDropDown(t, e) {
        const i = this._getOuterElement(t);
        if (!i.classList.contains("dropdown")) return;
        const n = (t, n) => {
            const s = ye.findOne(t, i);
            s && s.classList.toggle(n, e)
        };
        n(Ks, Rs), n(".dropdown-menu", Vs), i.setAttribute("aria-expanded", e)
    }
    _setAttributeIfNotExists(t, e, i) {
        t.hasAttribute(e) || t.setAttribute(e, i)
    }
    _elemIsActive(t) {
        return t.classList.contains(Rs)
    }
    _getInnerElement(t) {
        return t.matches(Ys) ? t : ye.findOne(Ys, t)
    }
    _getOuterElement(t) {
        return t.closest(".nav-item, .list-group-item") || t
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = Gs.getOrCreateInstance(this);
            if ("string" == typeof t) {
                if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        }))
    }
}
de.on(document, Ns, Xs, (function(t) {
    ["A", "AREA"].includes(this.tagName) && t.preventDefault(), Wt(this) || Gs.getOrCreateInstance(this).show()
})), de.on(window, Ms, (() => {
    for (const t of ye.find(Us)) Gs.getOrCreateInstance(t)
})), Qt(Gs);
const Js = ".bs.toast",
    Zs = `mouseover${Js}`,
    to = `mouseout${Js}`,
    eo = `focusin${Js}`,
    io = `focusout${Js}`,
    no = `hide${Js}`,
    so = `hidden${Js}`,
    oo = `show${Js}`,
    ro = `shown${Js}`,
    ao = "hide",
    lo = "show",
    co = "showing",
    ho = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
    },
    uo = {
        animation: !0,
        autohide: !0,
        delay: 5e3
    };
class fo extends be {
    constructor(t, e) {
        super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
    }
    static get Default() {
        return uo
    }
    static get DefaultType() {
        return ho
    }
    static get NAME() {
        return "toast"
    }
    show() {
        if (de.trigger(this._element, oo).defaultPrevented) return;
        this._clearTimeout(), this._config.animation && this._element.classList.add("fade");
        this._element.classList.remove(ao), Rt(this._element), this._element.classList.add(lo, co), this._queueCallback((() => {
            this._element.classList.remove(co), de.trigger(this._element, ro), this._maybeScheduleHide()
        }), this._element, this._config.animation)
    }
    hide() {
        if (!this.isShown()) return;
        if (de.trigger(this._element, no).defaultPrevented) return;
        this._element.classList.add(co), this._queueCallback((() => {
            this._element.classList.add(ao), this._element.classList.remove(co, lo), de.trigger(this._element, so)
        }), this._element, this._config.animation)
    }
    dispose() {
        this._clearTimeout(), this.isShown() && this._element.classList.remove(lo), super.dispose()
    }
    isShown() {
        return this._element.classList.contains(lo)
    }
    _maybeScheduleHide() {
        this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout((() => {
            this.hide()
        }), this._config.delay)))
    }
    _onInteraction(t, e) {
        switch (t.type) {
            case "mouseover":
            case "mouseout":
                this._hasMouseInteraction = e;
                break;
            case "focusin":
            case "focusout":
                this._hasKeyboardInteraction = e
        }
        if (e) return void this._clearTimeout();
        const i = t.relatedTarget;
        this._element === i || this._element.contains(i) || this._maybeScheduleHide()
    }
    _setListeners() {
        de.on(this._element, Zs, (t => this._onInteraction(t, !0))), de.on(this._element, to, (t => this._onInteraction(t, !1))), de.on(this._element, eo, (t => this._onInteraction(t, !0))), de.on(this._element, io, (t => this._onInteraction(t, !1)))
    }
    _clearTimeout() {
        clearTimeout(this._timeout), this._timeout = null
    }
    static jQueryInterface(t) {
        return this.each((function() {
            const e = fo.getOrCreateInstance(this, t);
            if ("string" == typeof t) {
                if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                e[t](this)
            }
        }))
    }
}
we(fo), Qt(fo);
export {
    wi as C, kn as M, fo as T, ds as a, ai as b
};
//# sourceMappingURL=bootstrap.js.map