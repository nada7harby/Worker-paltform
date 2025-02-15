import {
    M as e,
    T as t,
    a,
    b as n
} from "./bootstrap.js";
import {
    T as r
} from "./tom-select.complete.js";
import {
    r as s
} from "./replaceArabicNumerals.js";
import {
    F as i
} from "./formValidator.js";
import {
    s as o
} from "./showLoading.js";
import "./justvalidation.js";
const l = document.querySelectorAll("select.tom-select-single"),
    d = document.querySelectorAll("select.tom-select-multi");

function c(e, t) {
    return Object.keys(e.dataset).filter((e => e.startsWith("ts"))).forEach((a => {
        let n = a.replace("ts", "").charAt(0).toLowerCase() + a.replace("ts", "").slice(1);
        "true" === e.dataset[a] || "false" === e.dataset[a] || e.dataset[a].startsWith("{") || e.dataset[a].startsWith("[") ? t[n] = JSON.parse(e.dataset[a]) : isNaN(e.dataset[a]) ? "plugins" === n ? t.plugins = e.dataset[a].split(",") : t[n] = e.dataset[a] : t[n] = parseInt(e.dataset[a])
    })), t
}

function u(e, t, a, n, r) {
    var s, i;
    let o = e.getAttribute("aria-label") || (null == (s = document.querySelector('label[for="' + t.id + '"]')) ? void 0 : s.innerText) || (null == (i = document.querySelector('label[for="' + e.id + '"]')) ? void 0 : i.innerText) || "اختر";
    if (a.length > 0) {
        o += `: ${[...a.map((e=>{var t;return(null==(t=r[e])?void 0:t.text)||""}))].join(", ")}`
    }
    t.removeAttribute("aria-labelledby"), t.setAttribute("aria-label", o), n.setAttribute("aria-label", o), document.getElementById(e.id + "-ts-dropdown").setAttribute("aria-label", o), e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", "-1")
}
let m = {
    allowEmptyOption: !0,
    create: !1,
    maxItems: 1,
    closeAfterSelect: !0,
    hidePlaceholder: !0,
    plugins: [],
    onInitialize: function() {
        u(this.input, this.control_input, this.items, this.dropdown, this.options)
    },
    onChange: function() {
        u(this.input, this.control_input, this.items, this.dropdown, this.options)
    },
    render: {
        no_results: function() {
            return '<div class="no-results">لا يوجد بيانات</div>'
        },
        optgroup: function(e, t) {
            let a = document.createElement("div");
            return a.className = "optgroup", a.setAttribute("role", "group"), a.setAttribute("aria-label", e.group.label), a.appendChild(e.options), a
        }
    }
};
l.length && l.forEach((e => {
    m = c(e, m), new r(e, m)
})), d.length && (m.maxItems = null, d.forEach((e => {
    m = c(e, m), new r(e, m)
})));
const p = document.getElementById("cartItemsContainerWrapper");
p && p.addEventListener("keypress", (function(e) {
    13 === e.keyCode && e.preventDefault()
})), new class {
    constructor() {
        if (this.cartKey = "ehsanCartItems", this.cartErrorList = document.getElementById("cart-content"), this.cartWrapperClass = "cart-wrapper", this.addToCartWrapper = "addToCartWrapper", this.removeFromCartWrapper = "removeFromCartWrapper", this.addToCartButtons = document.querySelectorAll(".add-to-cart"), this.addToCartButtonsClass = "add-to-cart", this.removeFromCartButtons = document.querySelectorAll(".remove-from-cart"), this.removeFromCartButtonsClass = "remove-from-cart", this.cartCount = document.getElementsByClassName("cartCount"), this.cartItemsContainer = document.getElementById("cart_items_container"), this.cartItemsContainerWrapper = document.getElementById("cartItemsContainerWrapper"), this.emptyCart = document.getElementById("emptyCart"), this.removItemFromCartPage = document.querySelectorAll(".cart-remove"), this.cartTotal = document.getElementById("cart_total"), this.removeAllItemsFromCartModalCloseBtn = document.getElementById("removeAllItemsFromCartModalCloseBtn"), this.cartAmountInputs = document.querySelectorAll(".cart-amount-input"), this.cart_total_hidden = document.getElementById("cart_total_hidden"), this.paymentContinue = document.getElementById("paymentContinue"), this.paymentAsGiftWrapper = document.getElementById("paymentAsGiftWrapper"), this.loggedIn = "" != document.getElementById("isLoggedIn").value, this.addToDataURL = "/cart/add", this.deleteFromDataURL = "/cart/delete", this.getAllItemsURL = "/cart/user-cart", this.deleteAllFromDataURL = "/cart/delete/all", this.addAllURL = "/cart/add-many", this.paymentSourceIsCart = document.getElementById("paymentSourceIsCart"), this.typesNames = {
                Project: "مشاريع عامة",
                Rescue: "الاغاثة",
                Housing: "مشاريع الإسكان",
                SpecialNeeds: "الكفارات",
                Orphanages: "كفالة الأيتام",
                Mosques: "العناية بالمساجد",
                Electricity: "الكهرباء",
                MegaProject: "المشاريع الكبرى"
            }, this.paymentSourceIsCart) return "True" == this.paymentSourceIsCart.value && (this.removeAllCartItems(), localStorage.setItem(this.cartKey, [])), !1;
        this.init(), this.loggedIn ? (this.loadCartState(), this.addAllFromLocalToCach(), localStorage.setItem(this.cartKey, [])) : this.loadCartState(), this.emptyCart && (this.processCart(), this.submiteCartItems())
    }
    init() {
        this.emptyCart || this.updateCartCount(), this.addToCartButtons.forEach((e => {
            e.addEventListener("click", this.addToCart.bind(this))
        })), this.removeFromCartButtons.forEach((e => {
            e.addEventListener("click", this.removeFromCart.bind(this))
        })), document.addEventListener("click", (e => {
            let t = e.target;
            if (t.classList.contains("remove-icon") && (t = t.closest(".cart-remove")), t.dataset.cartRemoveItem) {
                o(!0), e.preventDefault();
                const a = t.dataset.cartId;
                let n = t.dataset.initiativetypeid;
                this.removeItemRequest(a, n, t)
            } else if (e.target.dataset.removeallcartitems) e.preventDefault(), this.removeAllCartItems(), 0 == this.getCart.length && this.removeAllItemsFromCartModalCloseBtn.click();
            else if (e.target.classList.contains("handleAmount") || e.target.classList.contains("handle-quantity-icon")) {
                let t = e.target;
                e.target.classList.contains("handle-quantity-icon") && (t = e.target.closest(".handleAmount"));
                const a = t.dataset.total,
                    n = t.dataset.id,
                    r = t.dataset.unit,
                    s = t.closest(".case-wrapper"),
                    i = s.querySelector(".calcQuantity"),
                    o = s.querySelector(".cart-amount-input"),
                    l = o.dataset.max;
                if ("increase" == t.dataset.allow) {
                    if (Number(i.value) >= a) return;
                    Number(i.value) + 1 == a ? o.value = l : o.value = Number(o.value) + Number(r), i.value = Number(i.value) + 1, o.classList.remove("border-danger"), s.querySelector(".field-required").classList.add("d-none")
                } else {
                    if (0 == o.value || 0 == i.value) return;
                    o.value = Number(o.value) - Number(r), i.value = Number(i.value) - 1, s.querySelector(".remaining-error-msg").classList.add("d-none")
                }
                this.updateCartItemAmount(n, o.value)
            }
        }))
    }
    submiteCartItems() {
        let t = !0,
            a = null;
        const n = document.getElementById("cartForm");
        this.paymentContinue.addEventListener("click", (r => {
            if (r.preventDefault(), document.querySelectorAll(".cart-amount-input").forEach((e => {
                    const n = parseFloat(e.value);
                    (isNaN(n) || n <= 0) && (a || (a = e), t = !1, e.closest(".price-details").querySelector(".cart-amount-input").classList.add("border-danger"), e.closest(".case-wrapper").querySelector(".field-required").classList.remove("d-none"))
                })), t) {
                new e(document.getElementById("redirectToPayment"), {}).show(), setTimeout((() => {
                    n.submit()
                }), 2e3)
            } else a && a.focus();
            t = !0, a = null
        }))
    }
    handleServerError() {
        let e = document.querySelectorAll(".itemcartwrapper"),
            t = this.cartErrorList.dataset.errors,
            a = null;
        if (t.length) {
            let n = JSON.parse(t);
            a = document.createElement("div"), a.classList.add("visually-hidden"), a.setAttribute("aria-live", "polite"), a.setAttribute("aria-atomic", "true");
            let r = document.createElement("h2");
            1 == n.length ? r.innerHTML = "تم العثور على خطأ واحد عند محاولة الدفع." : 2 == n.length ? r.innerHTML = "تم العثور على خطأين عند محاولة الدفع." : n.length >= 3 && n.length <= 10 ? r.innerHTML = `تم العثور على ${n.length} أخطاء عند محاولة الدفع.` : r.innerHTML = `تم العثور على ${n.length} خطأ عند محاولة الدفع.`, a.appendChild(r);
            let s = document.createElement("ul");
            n.forEach((t => {
                let a = t.CaseId,
                    n = t.RemainingAmount;
                e.forEach((e => {
                    let r = e.dataset.cartId,
                        i = e.dataset.cartTitle,
                        o = e.querySelector(".cart-amount-input");
                    if (a == r) {
                        e.querySelector(".server-err").classList.remove("d-none"), e.querySelector(".server-err").textContent = t.Description, e.querySelector(".cart-amount-input").dataset.max = n, e.querySelector(".maxAmountText").textContent = n, o.setAttribute("aria-invalid", "true"), o.setAttribute("aria-description", t.Description);
                        let a = document.createElement("li");
                        a.innerHTML = `<a href="#${r}">${i}: ${t.Description}</a>`, a.addEventListener("click", (t => {
                            t.preventDefault(), e.scrollIntoView({
                                behavior: "smooth"
                            }), o.focus()
                        })), s.appendChild(a)
                    }
                }))
            })), a.appendChild(s), this.cartErrorList.insertAdjacentElement("beforebegin", a)
        }
    }
    async processCart() {
        await this.createCartPage(), this.updateCartItemsOnCartPage();
        const e = document.querySelectorAll("select.tom-select-single");
        e.length && e.forEach((e => {
            new r(e, {
                allowEmptyOption: !0,
                create: !1,
                maxItems: 1,
                closeAfterSelect: !0,
                placeholder: "اختر",
                search: !1,
                controlInput: null,
                onInitialize: function() {
                    let e = this.input.getAttribute("aria-label") || "اختر";
                    this.items.length && (e += `: ${this.items[0]}`), this.control_input.setAttribute("aria-label", e), this.dropdown_content.setAttribute("aria-label", e)
                },
                render: {
                    no_results: function() {
                        return '<div class="no-results">لا يوجد بيانات</div>'
                    }
                },
                onChange: function() {
                    let e = this.input.getAttribute("aria-label") || "اختر";
                    this.items.length && (e += `: ${this.items[0]}`), this.control_input.setAttribute("aria-label", e), this.dropdown_content.setAttribute("aria-label", e)
                }
            }), this.manageOrphansOnCart(e)
        }))
    }
    async getDataFromCache() {
        try {
            const e = await fetch(this.getAllItemsURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!e.ok) throw new Error("حدث خطأ في العملية");
            return await e.text()
        } catch (e) {
            throw console.error("حدث خطأ في العملية", e), e
        }
    }
    async loadCartState() {
        try {
            let e;
            this.loggedIn ? (e = await this.getDataFromCache(), e = JSON.parse(e)) : e = await this.getCart(), e.length && e.forEach((e => {
                const t = document.querySelector(`.${this.cartWrapperClass}[data-id="${e.caseId}"]`);
                if (t) {
                    t.querySelector(`.${this.addToCartWrapper}`).classList.add("d-none"), t.querySelector(`.${this.removeFromCartWrapper}`).classList.remove("d-none");
                    let e = t.querySelector(".monthOptions");
                    e && (e.disabled = !0), this.paymentAsGiftWrapperHideAndShow(!0)
                }
            }))
        } catch (e) {
            console.error(e)
        }
    }
    async updateCartCount() {
        try {
            let e;
            if (e = this.loggedIn ? JSON.parse(await this.getDataFromCache()) : this.getCart(), e.length > 0)
                for (let t = 0; t < this.cartCount.length; t++) this.cartCount[t].classList.remove("d-none"), this.cartCount[t].textContent = e.length;
            else
                for (let t = 0; t < this.cartCount.length; t++) this.cartCount[t].classList.add("d-none"), this.cartCount[t].textContent = ""
        } catch (e) {
            console.error("Error updating cart count:", e)
        }
    }
    getCart() {
        let e = localStorage.getItem(this.cartKey);
        return e ? JSON.parse(e) : []
    }
    async updateCart(e) {
        this.loggedIn || localStorage.setItem(this.cartKey, JSON.stringify(e))
    }
    paymentAsGiftWrapperHideAndShow(e) {
        this.paymentAsGiftWrapper && (document.querySelectorAll(".amount-from-details").forEach((t => {
            t.disabled = e
        })), 1 == e ? (this.paymentAsGiftWrapper.classList.add("d-none"), document.querySelectorAll(".error").forEach((e => {
            e.classList.contains("amount-from-details") || e.remove()
        }))) : this.paymentAsGiftWrapper.classList.remove("d-none"))
    }
    async addToCart(e) {
        var a;
        e.preventDefault(), e.stopPropagation();
        let n = e.target;
        if (n.classList.contains("add-to-cart-icon") && (n = n.closest(".add-to-cart")), !n.classList.contains(this.addToCartButtonsClass)) return;
        const r = n.dataset.id,
            s = n.dataset.allowamount || "",
            i = this.getCart();
        let o = {},
            l = (null == (a = n.closest(`.${this.cartWrapperClass}`).querySelector(".cart-amount")) ? void 0 : a.value) || "0",
            d = n.dataset.maxamount,
            c = 0;
        if (c = d && parseFloat(d.replace(/,/g, "")) || 0, i.some((e => e.id === r))) console.log("Item is already in the cart.");
        else {
            let e = n.closest(`.${this.cartWrapperClass}`).querySelector(".monthOptions");
            if (e && (e.disabled = !0), o = "Orphanages" == n.dataset.type ? {
                    id: r,
                    caseId: r,
                    title: n.dataset.title,
                    amount: Number(l * n.dataset.monthcost),
                    progress: Number(n.dataset.progress),
                    type: n.dataset.type,
                    initiativeType: 30,
                    maxAmount: Number(n.dataset.monthcost * n.dataset.monthsremain),
                    attachementUrl: n.dataset.attachment,
                    image: n.dataset.attachment,
                    contributionType: n.dataset.contributionType,
                    monthCost: Number(n.dataset.monthcost),
                    monthsRemain: Number(n.dataset.monthsremain),
                    orphanName: n.dataset.orphanname,
                    caseUrl: n.dataset.url,
                    accountNumber: Number(n.dataset.accountnumber) || 0
                } : {
                    id: r,
                    caseId: r,
                    initiativeType: Number(n.dataset.initiativetypeid),
                    progress: Number(n.dataset.progress),
                    title: n.dataset.title,
                    amount: Number(l),
                    pricePerUnit: n.dataset.pricePerUnit ? Number(n.dataset.pricePerUnit) : 1,
                    type: n.dataset.type,
                    maxAmount: c,
                    image: n.dataset.attachment,
                    contributionType: n.dataset.contributionType,
                    orphanName: "",
                    caseUrl: n.dataset.url,
                    allowAmountRestriction: "True" == s,
                    accountNumber: Number(n.dataset.accountnumber) || 0
                }, this.loggedIn) await fetch(this.addToDataURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(o)
            }).then((e => e.json())).then((e => {
                if (e.isSuccess) {
                    i.push(o), this.updateCart(i), n.closest(`.${this.cartWrapperClass}`).querySelector(`.${this.addToCartWrapper}`).classList.add("d-none"), n.closest(`.${this.cartWrapperClass}`).querySelector(`.${this.removeFromCartWrapper}`).classList.remove("d-none"), this.paymentAsGiftWrapperHideAndShow(!0), this.updateCartCount(), new t(document.getElementById("addToCartSuccessToast"), {
                        delay: 3e3
                    }).show()
                } else document.querySelector(".add-all-msg").textContent = e.description, this.addToCartAndShowToasts("add-all-msg", "can-add-elec", "can-not-add-elec")
            })).catch((e => {
                console.log(e.message)
            }));
            else if (0 == i.length) {
                i.push(o), this.updateCart(i), n.closest(`.${this.cartWrapperClass}`).querySelector(`.${this.addToCartWrapper}`).classList.add("d-none"), n.closest(`.${this.cartWrapperClass}`).querySelector(`.${this.removeFromCartWrapper}`).classList.remove("d-none"), this.paymentAsGiftWrapperHideAndShow(!0), this.updateCartCount(), new t(document.getElementById("addToCartSuccessToast"), {
                    delay: 3e3
                }).show()
            } else {
                if (25 == o.initiativeType && 10 == i.length) return this.addToCartAndShowToasts("add-all-msg", "can-add-elec", "can-not-add-elec"), !1;
                let e = o.initiativeType;
                i.forEach((a => {
                    const r = o.id;
                    if (i.some((e => e.id === r))) return !1;
                    if (25 != a.initiativeType && 25 == Number(e)) return this.addToCartAndShowToasts("can-not-add-elec", "can-add-elec", "add-all-msg"), !1;
                    if (25 == a.initiativeType && 25 != Number(e)) return this.addToCartAndShowToasts("can-add-elec", "can-not-add-elec", "add-all-msg"), !1;
                    i.push(o), this.updateCart(i), n.closest(`.${this.cartWrapperClass}`).querySelector(`.${this.addToCartWrapper}`).classList.add("d-none"), n.closest(`.${this.cartWrapperClass}`).querySelector(`.${this.removeFromCartWrapper}`).classList.remove("d-none"), this.paymentAsGiftWrapperHideAndShow(!0), this.updateCartCount(), new t(document.getElementById("addToCartSuccessToast"), {
                        delay: 3e3
                    }).show()
                }))
            }
        }
    }
    addToCartAndShowToasts(e, a, n) {
        const r = document.getElementById("addToCartToast");
        document.querySelector(`.${a}`).classList.add("d-none"), document.querySelector(`.${n}`).classList.add("d-none"), document.querySelector(`.${e}`).classList.remove("d-none");
        new t(r, {
            delay: 3e3
        }).show()
    }
    async removeItemRequest(e, t, a) {
        if (this.loggedIn) fetch(this.deleteFromDataURL + `?caseId=${e}&initiativeType=${t}&accountNumber=${a.dataset.accountnumber||0}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((e => e.json())).then((e => {
            e.isSuccess ? (a.closest(".itemcartwrapper").remove(), this.createCartPage(), o(!1)) : o(!1)
        })).catch((e => {}));
        else {
            const t = this.getCart().filter((t => t.id !== e));
            await this.updateCart(t), a.closest(".itemcartwrapper").remove(), this.createCartPage(), o(!1)
        }
    }
    async removeItemFromCach(e) {
        let t = e.target,
            a = t.dataset.id,
            n = t.dataset.initiativetypeid;
        this.removeItemRequest(a, n, t), this.paymentAsGiftWrapperHideAndShow(!1);
        const r = e.target.closest(`.${this.cartWrapperClass}`);
        null == r || r.querySelector(`.${this.removeFromCartWrapper}`).classList.add("d-none"), null == r || r.querySelector(`.${this.addToCartWrapper}`).classList.remove("d-none");
        let s = null == r ? void 0 : r.querySelector(".monthOptions");
        s && (s.disabled = !1)
    }
    async removeFromCart(e) {
        e.preventDefault();
        const t = e.target;
        if (!t.classList.contains(this.removeFromCartButtonsClass)) return;
        const a = t.dataset.id;
        try {
            let t;
            if (this.loggedIn ? (await this.removeItemFromCach(e), t = JSON.parse(await this.getDataFromCache())) : t = this.getCart(), !Array.isArray(t)) throw new Error("cartItems is not an array");
            const n = t.filter((e => e.id !== a));
            await this.updateCart(n), this.updateCartCount(), this.paymentAsGiftWrapperHideAndShow(!1);
            const r = e.target.closest(`.${this.cartWrapperClass}`);
            null == r || r.querySelector(`.${this.removeFromCartWrapper}`).classList.add("d-none"), null == r || r.querySelector(`.${this.addToCartWrapper}`).classList.remove("d-none");
            let s = null == r ? void 0 : r.querySelector(".monthOptions");
            s && (s.disabled = !1)
        } catch (n) {
            console.error(n)
        }
    }
    cartItemCard(e, t) {
        let a = "/assets/images/default_card.svg";
        const {
            Project: n,
            Rescue: r,
            Housing: s,
            SpecialNeeds: i,
            Orphanages: o,
            Mosques: l,
            Electricity: d,
            MegaProject: c
        } = this.typesNames;
        let u = "";
        switch (Number(e.initiativeType)) {
            case 1:
                u = n;
                break;
            case 4:
                u = r;
                break;
            case 27:
                u = s;
                break;
            case 2:
                u = i;
                break;
            case 30:
                u = o;
                break;
            case 31:
                u = l;
                break;
            case 25:
                u = d;
                break;
            case 38:
                u = c;
                break;
            default:
                u = e.type
        }
        if (e.accountNumber = null === e.accountNumber ? 0 : e.accountNumber, 30 == e.initiativeType) {
            let n = "",
                r = Math.min(12, Number(e.monthsRemain));
            for (let t = 0; t < r; t++) {
                let a = t + 1,
                    r = "";
                1 === a ? r = "شهر" : 2 === a ? r = "شهرين" : a >= 3 && a <= 10 ? r = `${a} أشهر` : a >= 11 && (r = `${a} شهرًا`), n += `<option ${a==e.amount/Number(e.monthCost)?"selected":""} value="${a}">${r}</option>`
            }
            return `<div class="align-items-center border d-flex itemcartwrapper mb-30px p-3 rounded-5" data-cart-id="${e.caseId}" data-cart-typeid="${e.contributionType}" data-cart-title="${e.title}">\n                    <a class="d-block h-130px overflow-hidden rounded-4 w-200px w-sm-100px h-sm-90px position-relative" href="${e.caseUrl}">\n                        <img class="h-100 w-100" src="${e.image||a}" onerror="this.src='/assets/images/Default_card.svg';this.onerror='';" alt="" />\n                        <div class="progress position-absolute w-100 bottom-0 rounded-0">\n                            <div class="progress-bar" role="progressbar" style="width:${e.progress}%; min-width:6%;" aria-valuenow="${e.progress}" aria-valuemin="0" aria-valuemax="100">${e.progress}%</div>\n                        </div>\n                    </a>\n                    <div class="case-wrapper ms-3 w-100 col">\n                        <div class="d-flex justify-content-between">\n                            <h5 class="bg-neutral-s border fs-12px my-md-2 my-0  px-2 py-1 rounded-3 w-max-content" aria-hidden="true">${u}</h5>\n                            <button class="btn btn-link cart-remove hover-delete p-0" data-accountnumber="${e.accountNumber}" data-initiativetypeid="30" data-id="${e.caseId}" data-cart-id="${e.caseId}" data-cart-remove-item="true" aria-label="إزالة كفالة ${e.orphanName} من سلة تبرعاتك">\n                                <img class="remove-icon" src="/ehsan-ui/images/icons/delete-icon.svg" />\n                            </button>\n                        </div>\n                        <div class="d-flex flex-md-row justify-content-between mb-3">\n                            <a class="link-dark text-decoration-none" href="${e.caseUrl}">${e.title}</a>              \n                        </div>\n                        <div class="d-flex mb-2 align-items-center">\n                            <select class="tom-select-single d-flex align-items-center w-300px w-sm-200px fs-14px text-neutral-5 h-sm-34px" data-caseid="${e.caseId}" aria-hidden="true" aria-label="اختر مدة كفالة ${e.orphanName}">${n}</select>\n                            <div class="price-details d-flex align-items-center">\n                                <input type="hidden" class="cart-amount-input item-amount only-number readonly" disabled="true" maxlength="10" autocomplete="off" placeholder="قيمة المبلغ" data-cart-id="${e.caseId}" value="${e.amount>0?e.amount:" "}" min="1" data-monthcost="${e.monthCost}" data-max="${e.maxAmount||100}" aria-label="تكلفة الكفالة">\n                                <input class="final-value" name="CartItems[${t}].Amount" type="hidden" value="${e.amount>0?e.amount:" "}" />\n                                <input type="hidden" name="CartItems[${t}].InitiativeType" id="Orphanages" value="Orphanages">\n                            </div>\n                            <div class="font-ehsan-bold fs-4 ms-2 me-1 text-primary orphans-value fs-sm-14px"> ${e.amount>0?e.amount:""} </div>\n                            <span class="font-ehsan-bold fs-4 text-primary fs-sm-14px" aria-hidden="true">ر.س</span>\n                        </div>\n                        <label class="fs-14px remaining-error-msg text-danger w-100 d-none my-1" role="alert"><img class="w-16px me-1" src="/ehsan-ui/images/icons/info-circle-red-icon.svg" />عذراً، أعلى مبلغ يمكن التبرع به هو \n                            <span class="maxAmountText">${e.maxAmount}</span> ر.س\n                        </label>\n                        <label class="fs-14px pe-5 text-danger w-100 d-none server-err my-1" role="alert"></label>\n                        <label class="fs-14px pe-5 text-danger w-100 d-none field-required my-1" role="alert">الحقل مطلوب</label>\n                        <input type="hidden" name="CartItems[${t}].CaseId" value="${e.caseId}">\n                        <input type="hidden" name="CartItems[${t}].InitiativeType" id="${e.type}" value="${e.type}">\n                        <input type="hidden" name="CartItems[${t}].Title" value="${e.title}">\n                    </div>\n                </div>\n               \n            `
        }
        if (2 == e.initiativeType) {
            const n = Math.floor(Number(e.amount) / Number(e.pricePerUnit));
            return `\n            <div class="align-items-center border d-flex itemcartwrapper mb-30px p-3 rounded-5" data-cart-id="${e.caseId}" data-cart-typeid="${e.contributionType}" data-cart-title="${e.title}">\n            <a class="d-block h-130px overflow-hidden rounded-4 w-200px w-sm-100px h-sm-90px position-relative" href="${e.caseUrl}">\n                <img class="h-100 w-100" src="${e.image||a}" onerror="this.src='/assets/images/Default_card.svg';this.onerror='';" alt="" />\n                <div class="progress position-absolute w-100 bottom-0 rounded-0">\n                    <div class="progress-bar" role="progressbar" style="width:${e.progress}%; min-width:6%;" aria-valuenow="${e.progress}" aria-valuemin="0" aria-valuemax="100">${e.progress}%</div>\n                </div>\n            </a>\n            <div class="case-wrapper ms-3 w-100 col">\n                <div class="d-flex justify-content-between">\n                    <h5 class="bg-neutral-s border fs-12px my-md-2 my-0 px-2 py-1 rounded-3 w-max-content" aria-hidden="true">${u}</h5>\n                    <button class="btn btn-link cart-remove hover-delete p-0" data-accountnumber="${e.accountNumber}" data-initiativetypeid="${e.initiativeType}" data-id="${e.caseId}" data-cart-id="${e.caseId}" data-cart-remove-item="true" aria-label="إزالة كفالة ${e.orphanName} من سلة تبرعاتك">\n                        <img class="remove-icon" src="/ehsan-ui/images/icons/delete-icon.svg" />\n                    </button>\n                </div>\n                <div class="d-flex flex-md-row justify-content-between mb-3">\n                    <a class="link-dark text-decoration-none" href="${e.caseUrl}">${e.title}</a>              \n                </div>        \n                <div class="d-flex mb-2 align-items-center">\n                <div class="d-flex align-items-center me-3" role="group" aria-label="التبرع بالوحدات">\n                    <button class="btn btn-secondary h-sm-22px handleAmount p-0 p-md-2 w-sm-22px lh-1" data-allow="increase" type="button" data-total="${Math.floor(Number(e.maxAmount)/Number(e.pricePerUnit))}" data-id="${e.caseId}" data-unit="${e.pricePerUnit}"  aria-label="إضافة وحدة">\n                        <img class="handle-quantity-icon w-sm-12px" src="/ehsan-ui/images/icons/plus-icon.svg" />\n                    </button>\n                    <input type="number" class="form-control w-45px mx-1 p-0 w-sm-26px h-sm-34px text-center calcQuantity" id="quantity" value="${n}"  disabled="disabled" aria-label="الوحدات">\n                    <button class="btn btn-secondary h-sm-22px handleAmount p-0 p-md-2 w-sm-22px lh-1" data-allow="decrease" data-total="${Math.floor(Number(e.maxAmount)/Number(e.pricePerUnit))}" data-id="${e.caseId}" data-unit="${e.pricePerUnit}" type="button" aria-label="إزالة وحدة">\n                        <img class="handle-quantity-icon w-sm-12px" src="/ehsan-ui/images/icons/minus-icon.svg" />\n                    </button>\n                    <span class="visually-hidden" aria-live="polite" aria-atomic="true"></span>\n                </div>\n                <div class="price-details input-group">\n                    <input inputmode="numeric" pattern="d*" name="CartItems[${t}].Amount" data-subsidy="true" pattern="[0-9]*" data-unit="${e.pricePerUnit}" ${e.allowAmountRestriction?"readonly":""} class="fs-sm-12px h-sm-34px item-amount cart-amount-input  form-control" maxlength="10"  autocomplete="off" onkeydown="if(event.key==='.' || event.key==='-' || event.key==='+'){event.preventDefault();}"\n                     placeholder="قيمة المبلغ" data-cart-id="${e.caseId}"  value="${e.amount>0?e.amount:""}" min="1" data-max="${e.maxAmount||100}" aria-label="مبلغ التبرع لِ ${e.title} (ريال سعودي)">\n                    <span class="input-group-text h-sm-34px p-1 lh-1 fs-sm-12px" aria-hidden="true">ر.س</span>    \n                    <input type="hidden" name="CartItems[${t}].InitiativeType" id="${e.type}" value="${e.type}">                  \n                </div>\n            </div>\n            <label class="fs-14px remaining-error-msg text-danger w-100 d-none my-1" role="alert"><img class="w-16px me-1" src="/ehsan-ui/images/icons/info-circle-red-icon.svg" />عذراً، أعلى مبلغ يمكن التبرع به هو \n          <span class="maxAmountText">${e.maxAmount}</span> ر.س\n          </label>\n            <label class="fs-14px pe-5 text-danger w-100 d-none my-1 server-err" role="alert"></label>\n            <label class="fs-14px pe-5 text-danger w-100 d-none field-required my-1" role="alert">الحقل مطلوب</label>\n            <input type="hidden" name="CartItems[${t}].CaseId" value="${e.caseId}">\n            <input type="hidden" name="CartItems[${t}].InitiativeType" id="${e.type}" value="${e.type}">\n            <input type="hidden" name="CartItems[${t}].Title" value="${e.title}">\n        </div>\n        </div>\n      `
        }
        return 38 == e.initiativeType ? (e.maxDonation > e.minDonation ? e.maxAmount = [e.minDonation, e.maxDonation] : e.maxAmount = [e.minDonation, Number.MAX_VALUE], `<div class="align-items-center border d-flex itemcartwrapper mb-30px p-3 rounded-5 justify-content-between" data-cart-id="${e.caseId}" data-cart-typeid="${e.contributionType}" data-cart-title="${e.title}">\n                    <a class="d-block h-130px overflow-hidden rounded-4 w-200px w-sm-100px h-sm-90px position-relative" href="${e.caseUrl}">\n      \n      <img class="h-100 w-100" src="${e.image||a}" onerror="this.src='/assets/images/Default_card.svg';this.onerror='';" alt="" />\n       <div class="progress position-absolute w-100 bottom-0 rounded-0 d-none">\n                    <div class="progress-bar" role="progressbar" style="width:${e.progress}%; min-width:6%;" aria-valuenow="${e.progress}" aria-valuemin="0" aria-valuemax="100">${e.progress}%</div>\n                </div>\n                </a>\n      <div class="ms-3 case-wrapper col">\n                <div class="d-flex justify-content-between">\n                <h5 class="bg-neutral-s border fs-12px my-2 px-2 py-1 rounded-3 w-max-content" aria-hidden="true">${u}</h5>\n                <button class="btn btn-link cart-remove hover-delete p-0" data-accountnumber="${e.accountNumber||0}" data-initiativetypeid="${e.initiativeType}" \n              data-id="${e.caseId}" data-pricePerUnit="${e.pricePerUnit}" data-cart-id="${e.caseId}" \n              data-cart-remove-item="true" aria-label="إزالة ${e.title} من سلة تبرعاتك">\n              <img class="remove-icon" src="/ehsan-ui/images/icons/delete-icon.svg" />\n              </button>\n              </div>\n                <div class="d-flex flex-md-row justify-content-between mb-3">\n               <a class="link-dark text-decoration-none" href="${e.caseUrl}">${e.title}</a>              \n          </div>        \n\n            <div class="price-details input-group">\n              <input inputmode="numeric" pattern="d*" name="CartItems[${t}].Amount" class="item-amount cart-amount-input form-control border-end-0 h-sm-34px fs-sm-14px" maxlength="10" autocomplete="off" onkeydown="if(event.key==='.' || event.key==='-' || event.key==='+'|| event.key === 'e' || event.key === 'E'){event.preventDefault();}" placeholder="قيمة المبلغ" data-cart-id="${e.caseId}"  value="${e.amount>0?e.amount:""}" min="1" data-max="${e.maxAmount||100}" aria-label="مبلغ التبرع لِ ${e.title} (ريال سعودي)">\n              <span class="input-group-text h-sm-34px fs-sm-14px" aria-hidden="true">ر.س</span>    \n              <input type="hidden" name="CartItems[${t}].InitiativeType" id="${e.type}" value="MegaProject">                  \n          </div>\n\n          <label class="fs-14px pe-5 remaining-error-msg text-warning w-100 d-none my-1" role="alert">أعلى قيمة يمكنك التبرع بها هي <span class="maxAmountText">${e.maxAmount?e.maxAmount:"لا يوجد قيمه حد اعلي"}</span> ر.س</label>\n          <label class="fs-14px pe-5 text-danger w-100 d-none my-1 server-err" role="alert"></label>\n          <label class="fs-14px pe-5 text-danger w-100 d-none field-required my-1" role="alert">الحقل مطلوب</label>\n          <input type="hidden" name="CartItems[${t}].CaseId" value="${e.caseId}">\n          <input type="hidden" name="CartItems[${t}].InitiativeType" id="${e.type}" value="${e.type}">\n          <input type="hidden" name="CartItems[${t}].Title" value="${e.title}">\n          <input type="hidden" name="CartItems[${t}].AccountNumber" value="${e.accountNumber}">\n      </div>\n  </div>\n      `) : `\n            <div class="align-items-center border d-flex itemcartwrapper mb-30px p-3 rounded-5 justify-content-between" data-cart-id="${e.caseId}" data-cart-typeid="${e.contributionType}" data-cart-title="${e.title}">\n                <a class="d-block h-130px overflow-hidden rounded-4 w-200px w-sm-100px h-sm-90px position-relative" href="${e.caseUrl}">\n                  <img class="h-100 w-100" src="${e.image||a}" onerror="this.src='/assets/images/Default_card.svg';this.onerror='';" alt="" />\n                  <div class="progress position-absolute w-100 bottom-0 rounded-0">\n                    <div class="progress-bar" role="progressbar" style="width:${e.progress}%; min-width:6%;" aria-valuenow="${e.progress}" aria-valuemin="0" aria-valuemax="100">${e.progress}%</div>\n                </div>\n                </a>\n                <div class="ms-3 case-wrapper col">\n                <div class="d-flex justify-content-between">\n                <h5 class="bg-neutral-s border fs-12px my-2 px-2 py-1 rounded-3 w-max-content" aria-hidden="true">${u}</h5>\n                <button class="btn btn-link cart-remove hover-delete p-0" data-accountnumber="${e.accountNumber||0}" data-initiativetypeid="${e.initiativeType}" \n              data-id="${e.caseId}" data-pricePerUnit="${e.pricePerUnit}" data-cart-id="${e.caseId}" \n              data-cart-remove-item="true" aria-label="إزالة ${e.title} من سلة تبرعاتك">\n              <img class="remove-icon" src="/ehsan-ui/images/icons/delete-icon.svg" />\n              </button>\n              </div>\n                <div class="d-flex flex-md-row justify-content-between mb-3">\n               <a class="link-dark text-decoration-none" href="${e.caseUrl}">${e.title}</a>              \n          </div>\n          <div class="price-details input-group">\n              <input inputmode="numeric" pattern="d*" name="CartItems[${t}].Amount" class="item-amount cart-amount-input form-control border-end-0 h-sm-34px fs-sm-14px" maxlength="10"  autocomplete="off" onkeydown="if(event.key==='.' || event.key==='-' || event.key==='+'|| event.key === 'e' || event.key === 'E'){event.preventDefault();}" placeholder="قيمة المبلغ" data-cart-id="${e.caseId}"  value="${e.amount>0?e.amount:""}" min="1" data-max="${e.maxAmount||100}" aria-label="مبلغ التبرع لِ ${e.title} (ريال سعودي)">\n              <span class="input-group-text h-sm-34px fs-sm-14px" aria-hidden="true">ر.س</span>    \n              <input type="hidden" name="CartItems[${t}].InitiativeType" id="${e.type}" value="${e.type}">                  \n          </div>\n\n          <label class="fs-14px remaining-error-msg text-danger w-100 d-none my-1" role="alert"><img class="w-16px me-1" src="/ehsan-ui/images/icons/info-circle-red-icon.svg" />عذراً، أعلى مبلغ يمكن التبرع به هو \n          <span class="maxAmountText">${e.maxAmount}</span> ر.س\n          </label>\n\n          <label class="fs-14px pe-5 text-danger w-100 d-none my-1 server-err" role="alert"></label>\n          <label class="fs-14px pe-5 text-danger w-100 d-none field-required my-1" role="alert">الحقل مطلوب</label>\n          <input type="hidden" name="CartItems[${t}].CaseId" value="${e.caseId}">\n          <input type="hidden" name="CartItems[${t}].InitiativeType" id="${e.type}" value="${e.type}">\n          <input type="hidden" name="CartItems[${t}].Title" value="${e.title}">\n          <input type="hidden" name="CartItems[${t}].AccountNumber" value="${e.accountNumber}">\n      </div>\n  </div>\n      `
    }
    async updateTotalAmount(e) {
        if (e.length > 0) {
            let t = 0;
            e.forEach((e => {
                t += Number(e.amount)
            })), this.cartTotal.innerHTML = t, this.cart_total_hidden.value = t
        }
    }
    async createCartPage() {
        let e;
        e = this.loggedIn ? JSON.parse(await this.getDataFromCache()) : this.getCart();
        let t = this.emptyCart,
            a = this.cartItemsContainerWrapper;
        if (e.length < 1 ? null == t || t.classList.remove("d-none") : null == t || t.classList.add("d-none"), e.length > 0) {
            a.classList.remove("d-none"), this.cartItemsContainer.innerHTML = "", e.forEach(((e, t) => {
                let a = this.cartItemCard(e, t);
                this.cartItemsContainer.innerHTML += a
            })), await this.updateTotalAmount(e);
            for (let t = 0; t < this.cartCount.length; t++) this.cartCount[t].classList.remove("d-none"), this.cartCount[t].textContent = e.length;
            this.handleServerError()
        } else null == a || a.classList.add("d-none"), this.updateCartCount()
    }
    async removeAllCartItems() {
        if (this.loggedIn) {
            if (!(await fetch(this.deleteAllFromDataURL, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })).ok) throw new Error("حدث خطأ في العملية")
        }
        this.updateCart([]), this.createCartPage(), this.updateCartCount()
    }
    async updateCartItemsOnCartPage() {
        const e = document.querySelector("#cart_items_container");
        e && e.addEventListener("input", (e => {
            var t;
            if (!e.target.classList.contains("cart-amount-input")) return !1;
            const a = e.target,
                n = a.closest(".case-wrapper").querySelector(".server-err");
            if (n && n.remove(), a.classList.contains("cart-amount-input")) {
                console.log(a.value);
                let e = a.value.replace(/[^0-9\u0660-\u0669]/g, "");
                a.value = s(e);
                const n = a.dataset.cartId,
                    r = parseInt(a.value, 10) || 0,
                    i = parseInt(a.dataset.max, 10);
                if (r > i)
                    if (a.value = i, this.updateCartItemAmount(n, i), "true" == a.dataset.subsidy) {
                        a.closest(".case-wrapper").querySelector(".remaining-error-msg").classList.remove("d-none");
                        a.closest(".case-wrapper").querySelector(".calcQuantity").value = Math.floor(Number(i) / Number(a.dataset.unit))
                    } else a.closest(".price-details").nextElementSibling.classList.remove("d-none");
                else {
                    if ("true" == a.dataset.subsidy) {
                        a.closest(".case-wrapper").querySelector(".calcQuantity").value = Math.floor(Number(r) / Number(a.dataset.unit))
                    }
                    this.updateCartItemAmount(n, r), null == (t = a.closest(".price-details").nextElementSibling) || t.classList.add("d-none"), a.closest(".price-details").querySelector(".cart-amount-input").classList.remove("border-danger"), a.closest(".case-wrapper").querySelector(".field-required").classList.add("d-none")
                }
            }
        }))
    }
    showRemainingErrorMsg(e) {
        e.closest(".price-details").querySelector(".cart-amount-input").nextElementSibling.classList.remove("d-none")
    }
    hideRemainingErrorMsg(e) {
        e.closest(".price-details").querySelector(".cart-amount-input").nextElementSibling.classList.add("d-none")
    }
    async updateCartItemAmount(e, t) {
        let a;
        a = this.loggedIn ? JSON.parse(await this.getDataFromCache()) : this.getCart();
        const n = a.map((a => (a.caseId === e && (a.amount = t, this.loggedIn && fetch(this.addToDataURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(a)
        }).then((e => e.text())).then((e => {})).catch((e => {
            console.log("حدث خطأ في العملية")
        }))), a)));
        this.updateTotalAmount(n), this.updateCart(n)
    }
    manageOrphansOnCart(e) {
        e.addEventListener("change", (e => {
            let t = e.target,
                a = t.value,
                n = t.closest(".case-wrapper").querySelector(".cart-amount-input"),
                r = t.closest(".case-wrapper").querySelector(".final-value"),
                s = t.closest(".case-wrapper").querySelector(".orphans-value");
            if (n) {
                let e = n.dataset.cartId,
                    t = a * n.dataset.monthcost;
                this.updateCartItemAmount(e, t), n.value = t, r.value = t, s.textContent = t
            }
        }))
    }
    async addAllFromLocalToCach() {
        let e = this.getCart();
        if (0 == e.length) return !1;
        const t = await fetch(this.addAllURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(e)
            }),
            a = await t.json();
        if (a.isSuccess) return this.loadCartState(), this.updateCartCount(), a;
        document.querySelector(".add-all-msg").textContent = a.description, this.addToCartAndShowToasts("add-all-msg", "can-add-elec", "can-not-add-elec", "add-all-msg")
    }
}, document.addEventListener("DOMContentLoaded", (() => {
    window.formValidator = new i("arabic")
}));
[...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map((e => new a(e))), document.querySelectorAll(".donate-amount-input, .main-amount, .main-amount-qd, .number-only").forEach((e => {
    e.addEventListener("input", (t => {
        var a;
        let n = parseInt(null == (a = e.dataset.max) ? void 0 : a.replace(/,/g, ""), 10),
            r = t.target.value.replace(/[^0-9\u0660-\u0669]/g, "");
        n && parseInt(r, 10) > n && (r = n.toString()), e.value = s(r)
    }))
})), document.addEventListener("DOMContentLoaded", (function() {
    ! function() {
        const e = document.querySelectorAll(".donate-amount-input");
        let t = document.querySelectorAll(".monthsOptions");
        e.forEach((e => {
            const t = e.getAttribute("data-id"),
                a = document.querySelector(`#donate-now-button-${t}`);
            if (a) {
                let n = a.getAttribute("data-type");
                e.addEventListener("input", (function() {
                    const r = e.value;
                    a.href = r ? "Electricity" == n ? `/tyassarat/elecbilldetails/${t}?amount=${r}` : `/${n}/details/${t}?amount=${r}` : `/${n}/details/${t}`
                }))
            }
        })), t.forEach(((e, t) => {
            e.addEventListener("change", (function() {
                let t = e.closest(".choose-period");
                if (t) {
                    let a = t.querySelector(".orphans-donate-btn"),
                        n = e.dataset.id;
                    t.querySelector(".cart-amount").value = e.value, a.href = `/orphans/details/${n}?amount=${e.value}`
                }
            }))
        }))
    }(), document.addEventListener("click", (function(t) {
        if (t.target.closest(".share-opportunity")) {
            t.stopPropagation(), t.preventDefault();
            var a = t.target.closest(".share-opportunity").dataset,
                n = "/All/Share?caseid=" + a.caseid + "&initiativetype=" + a.casetype + "&casename=" + a.casetitle + "&campaigncreatorid=" + a.campaigncreatorid;
            if (a.caseid) {
                var r = new XMLHttpRequest;
                r.open("GET", n, !0), r.onload = function() {
                    if (200 === r.status) {
                        var t = r.responseText,
                            n = `أجر لك وأجر لي %0aساهم معي في التبرع لـ (${a.casetitle}) عبر %23منصة_إحسان:`;
                        document.getElementById("facebookShareLink").setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u=" + t + "&quote=" + n), document.getElementById("twitterShareLink").setAttribute("href", "https://twitter.com/intent/tweet?url= " + t + "&text=" + n + "&hashtags="), document.getElementById("whatsappShareLink").setAttribute("href", "https://wa.me/?text=" + n + "%0a" + t), document.getElementById("share_link_text").value = t;
                        var s = document.getElementById("share-modal");
                        e.getOrCreateInstance(s).show()
                    }
                }, r.onerror = function() {
                    console.error("Error fetching data from server")
                }, r.send()
            }
        }
    })), document.querySelectorAll(".copy-link").forEach((e => {
        e.addEventListener("click", (function(t) {
            t.preventDefault();
            var a = e.closest(".modal-body").querySelector("#share_link_text");
            a.select(), a.setSelectionRange(0, 99999), navigator.clipboard.writeText(a.value).then((() => {
                console.log("Copied to clipboard")
            })).catch((e => {
                console.error("Failed to copy text: ", e)
            }))
        }))
    }))
})), document.addEventListener("DOMContentLoaded", (e => {
    const t = document.getElementById("homeCarousel");
    if (t) {
        const e = new n(t, {
            interval: 3e3,
            pause: !1
        });
        e.cycle(), document.querySelector("button.toggle-player").addEventListener("click", (function(t) {
            const a = t.currentTarget;
            a.classList.toggle("toggle-player_play"), a.classList.toggle("toggle-player_pause"), a.classList.contains("toggle-player_pause") ? (e.pause(), a.setAttribute("aria-pressed", "true"), a.querySelector(".pause-img").classList.add("d-none"), a.querySelector(".play-img").classList.remove("d-none")) : (e.cycle(), a.setAttribute("aria-pressed", "false"), a.querySelector(".pause-img").classList.remove("d-none"), a.querySelector(".play-img").classList.add("d-none"))
        }))
    }
})), document.querySelectorAll("select.tom-select").forEach((e => {
    (e => {
        m.maxItems = 1, m = c(e, m), new r(e, m)
    })(e)
}));
const h = document.getElementById("openFilter"),
    v = document.getElementById("closeFilter");

function y(e) {
    const t = e.target;
    t.value = t.value.replace(/[^a-zA-Z0-9\u0600-\u06FF ]/g, "")
}
null == h || h.addEventListener("click", (() => {
    document.getElementById("filterSection").classList.remove("d-none")
})), null == v || v.addEventListener("click", (() => {
    document.getElementById("filterSection").classList.add("d-none")
}));
document.querySelectorAll(".remove-special-char").forEach((function(e) {
    e.addEventListener("input", y)
})), document.addEventListener("click", (function(e) {
    var t = document.querySelector(".navbar"),
        a = t.querySelector(".navbar-toggler"),
        n = t.querySelector(".navbar-collapse");
    !t.contains(e.target) && n.classList.contains("show") && a.click()
})), document.querySelectorAll(".only-number").forEach((e => {
    e.addEventListener("onkeydown", (e => {
        "." === e.key && e.preventDefault()
    }))
}));
var g = window.location.href;
document.querySelectorAll("#navbarMenu .dropdown-menu .dropdown-item").forEach((function(e) {
    var t = e.href;
    ((g.includes("housing") || g.includes("mosques") || g.includes("orphans")) && t.includes("projects") || g.includes("elecbills") && t.includes("/tyassarat/judicialbills") || g.includes(t)) && (e.closest(".nav-item").classList.add("active"), e.classList.add("bg-primary-1"))
}));
const b = document.getElementById("loginAnimationDev");
window.addEventListener("load", (() => {
    b && (b.style.width = "50%")
})), null == b || b.addEventListener("transitionend", (() => {
    b.style.setProperty("opacity", "0", "important")
}));
//# sourceMappingURL=app.js.map