import {
    T as e
} from "./tom-select.complete.js";
import {
    i as t
} from "./selectAmountModule.js";
let o = document.querySelectorAll(".monthsOptions");
const n = document.getElementById("donateAsGiftWrapper"),
    a = document.getElementById("donateAsGiftCheckboxOrphans"),
    r = document.getElementById("maincontent"),
    s = document.querySelector(".add-to-cart"),
    i = document.querySelector(".main-amount"),
    l = document.getElementById("activeGiftIcon"),
    c = document.getElementById("disableGiftIcon"),
    d = document.getElementById("donateNow");
let m = r.dataset.monthprice || null,
    u = r.dataset.itemprice || null,
    f = r.dataset.remainingmonths || null;
const h = new Map;

function g(t) {
    t.forEach((t => {
        const o = parseInt(t.dataset.monthsremain, 10),
            n = parseFloat(t.dataset.monthcost || 0);
        Array.from(t.options).forEach((e => {
            parseInt(e.value, 10) > o && (e.disabled = !0)
        }));
        const a = new e(t, {
            create: !1,
            maxItems: 1,
            closeAfterSelect: !0,
            allowEmptyOption: !1,
            plugins: ["no_backspace_delete"]
        });
        h.set(t, a), t.addEventListener("change", (function() {
            let e = t.closest(".choose-period");
            if (e) {
                let o = e.querySelector(".orphans-donate-btn"),
                    n = t.dataset.id;
                e.querySelector(".cart-amount").value = t.value, o.href = `/orphans/details/${n}?amount=${t.value}`
            }! function(e, t) {
                var o, n;
                const a = null == (o = e.closest(".months-amount-wrapper")) ? void 0 : o.querySelector(".amount-for-choosen-months"),
                    r = null == (n = e.closest(".months-amount-wrapper")) ? void 0 : n.querySelector(".main-amount"),
                    s = document.querySelector('[name="amount"]');
                if (a && s) {
                    const o = e.value * t;
                    a.innerText = `${o}`, s.value = o, r && (r.value = o)
                }
            }(t, n)
        }))
    }))
}

function p() {
    let e = document.querySelector("#validateMobileNumberInGift"),
        t = [...document.querySelectorAll(".input-gifteeName"), ...document.querySelectorAll(".input-gifteeNumber")];
    t.forEach((o => {
        let n = !0;
        o.addEventListener("input", (() => {
            const o = t.every((e => "" !== e.value.trim()));
            e && (n = "true" === e.dataset.validate), o && n ? d.classList.remove("disabled") : d.classList.add("disabled")
        }))
    }))
}
g(o), null == a || a.addEventListener("change", (async function() {
    if (this.checked) {
        l.classList.remove("d-none"), c.classList.add("d-none");
        try {
            const e = await fetch(`/gift/create?stockItemPrice=null&storeItemPrice=${u}&orphansMonthlyValue=${m}&remainingMonths=${f}&validateMobile=true`, {
                method: "GET"
            });
            if (!e.ok) throw new Error("Failed to create gift");
            const o = await e.text();
            n.innerHTML = o, t();
            const a = n.querySelector(".remove-giftee-item");
            a && a.classList.remove("d-none"), document.querySelector(".amount-for-choosen-months-wrapper").classList.add("text-neutral-3"), h.forEach(((e, t) => {
                e.disable()
            })), s && (s.disabled = !0), i && (i.dataset.required = !1), g(n.querySelectorAll(".monthOptions")), v -= 1, d.classList.add("disabled"), p()
        } catch (e) {
            console.error("Error creating gift:", e)
        }
    } else s && (s.disabled = !1), n.innerHTML = "", h.forEach(((e, t) => {
        e.enable()
    })), document.querySelector(".amount-for-choosen-months-wrapper").classList.remove("text-neutral-3"), l.classList.add("d-none"), c.classList.remove("d-none"), d.classList.remove("disabled")
}));
let v = f;
null == n || n.addEventListener("click", (e => {
    if (e.target && "addGiftee" === e.target.id || "addGifteeImage" === e.target.id && "True" == e.target.dataset.orphans) {
        if (document.querySelectorAll(".gifteeBoxDetails").length >= 5) return void document.querySelector("#addGiftee").classList.add("disabled");
        if (v <= 0) {
            return void document.getElementById("moreThanRemainingMonths").classList.remove("d-none")
        }!async function(e) {
            try {
                const o = await fetch(`/gift/new-giftee?index=1&stockItemPrice=null&storeItemPrice=${u}&orphansMonthlyValue=${m}&remainingMonths=${f}&validateMobile=true`, {
                    method: "GET"
                });
                if (!o.ok) throw new Error("Failed to load giftee structure");
                const n = await o.text();
                "addGifteeImage" == e.id && (e = e.closest("button")), e.closest("#addGiftee").insertAdjacentHTML("beforebegin", n), t();
                const a = e.previousElementSibling;
                g(a.querySelectorAll(".monthOptions"));
                const r = e.previousElementSibling.querySelector(".remove-giftee-item");
                r && r.classList.remove("d-none"), p()
            } catch (o) {
                console.error("Error adding giftee:", o)
            }
        }(e.target), v -= 1, d.classList.add("disabled")
    }
    if (e.target && e.target.classList.contains("remove-giftee-item")) {
        let t = document.querySelectorAll(".remove-giftee-btn");
        moreThanRemainingMonths.classList.add("d-none"), p(), e.target.closest(".gifteeBoxDetails").remove(), 1 === t.length && (d.classList.remove("disabled"), a.checked = !1, n.innerHTML = "", l.classList.add("d-none"), c.classList.remove("d-none"), document.querySelector(".amount-for-choosen-months-wrapper").classList.remove("text-neutral-3"), h.forEach(((e, t) => {
            e.enable()
        }))), v += 1
    }
}));
//# sourceMappingURL=orphans.js.map