import {
    P as e
} from "./redirectToPayment.js";
import "./bootstrap.js";
const t = new e,
    a = document.getElementById("toggleQuickDonation"),
    n = document.getElementById("qd-formPage"),
    r = document.getElementById("toggleQuickDonationText"),
    s = document.getElementById("quickDonationWrapper"),
    i = document.querySelectorAll("#qd-pre-amounts button"),
    o = document.getElementById("qd_amount"),
    d = document.getElementById("quickDonationPayBtn"),
    c = document.querySelectorAll(".qd-btn-select");

function l() {
    o.value = "", i.forEach((e => {
        e.setAttribute("aria-checked", "false"), e.classList.remove("btn-primary"), e.classList.add("btn-secondary")
    }))
}
if (a && a.addEventListener("click", (function() {
        this.classList.toggle("w-330px"), s.classList.toggle("show"), r.classList.toggle("d-none"), l()
    })), a || n) {
    let e = function() {
            const e = o.value.trim(),
                t = document.getElementById("qd_handdleError");
            return t.textContent = "", t.classList.add("d-none"), o.classList.remove("border-danger"), e ? !(isNaN(e) || e < 1 || e > 1e6) || (a(o, "مبلغ التبرع بين 1 و 1000000 ريال سعودي"), !1) : (a(o, "الرجاء إدخال مبلغ التبرع"), !1)
        },
        a = function(e, t) {
            const a = document.getElementById("qd_handdleError");
            a.textContent = t, a.classList.remove("d-none"), e.classList.add("border-danger")
        };
    i.forEach((t => {
        t.addEventListener("click", (() => {
            const a = t.getAttribute("data-amount");
            o.value = a, e(), i.forEach((e => {
                e.setAttribute("aria-checked", "false"), e.classList.remove("btn-primary"), e.classList.add("btn-secondary")
            })), t.setAttribute("aria-checked", "true"), t.classList.add("btn-primary"), t.classList.remove("btn-secondary")
        }))
    })), c.forEach((e => {
        e.addEventListener("click", (function() {
            c.forEach((e => {
                e.classList.remove("active"), e.setAttribute("aria-pressed", "false"), e.setAttribute("aria-current", "false"), e.tabIndex = -1
            })), this.classList.add("active"), this.setAttribute("aria-pressed", "true"), this.setAttribute("aria-current", "page"), this.tabIndex = 0, d.dataset.type = this.dataset.type, d.dataset.initiativetype = this.dataset.initiativetype, d.setAttribute("aria-label", ` تبرع الآن ل${e.innerText}`)
        }))
    })), d.addEventListener("click", (() => {
        const a = o.value.trim();
        if (!e()) return;
        const r = new FormData;
        r.append("CartItems[0][Amount]", a), r.append("CartItems[0][InitiativeType]", d.dataset.type), n && r.append("FastDonationSource", document.querySelector("#fastDonationSource").value), fetch("/QuickDonate", {
            method: "POST",
            body: r
        }).then((e => e.json())).then((e => {
            if (t.redirectToPayment(!0), t.handleResponse(!1), !e.isSuccess) throw new Error(e.message);
            window.location.href = `${e.redirectToUrl}`
        })).catch((e => {
            t.handleResponse(!0);
            document.getElementById("srNotificationArea").innerHTML = "حدث خطأ أثناء الانتقال إلى صفحة الدفع", document.getElementById("redirectToPayment").setAttribute("aria-describedby", "redirectToPayment_error")
        }))
    })), o.addEventListener("input", (t => {
        t.target.value = t.target.value.replace(/\D/g, ""), t.target.value || l(), e()
    }))
}
//# sourceMappingURL=quickDonation.js.map