function e() {
    const e = document.getElementById("donateNow"),
        t = document.getElementById("donateDonationCampaign"),
        n = document.getElementById("donationAmountLimit");

    function a(n) {
        const a = document.getElementById("donateAsGiftCheckbox"),
            i = document.getElementById("GifteeManagementId");
        if (t && (parseFloat(n) > 0 ? t.classList.remove("disabled") : t.classList.add("disabled")), a && !a.checked) parseFloat(n) > 0 ? e.classList.remove("disabled") : e.classList.add("disabled");
        else if (a && a.checked || i) {
            let t = function() {
                    const t = [...document.querySelectorAll(".input-gifteeName"), ...document.querySelectorAll(".input-gifteeNumber"), ...document.querySelectorAll(".unities-input")].every((e => "" !== e.value.trim()));
                    let i = !0;
                    n ? i = "true" === n.dataset.validate : a && (i = "true" === a.dataset.valid), t && i ? e.classList.remove("disabled") : e.classList.add("disabled")
                },
                n = document.querySelector("#validateMobileNumberInGift"),
                a = document.querySelector("#validateMobileNumberForSender");
            document.querySelector("#gifteeContainer").addEventListener("input", (function(e) {
                (e.target.matches(".input-gifteeName") || e.target.matches(".input-gifteeNumber")) && t()
            })), document.querySelectorAll(".gifteeBoxDetails").forEach((function(e) {
                e.querySelector(".input-gifteeNumber").addEventListener("input", (function() {
                    t()
                }))
            })), t()
        }
    }
    document.getElementById("gift-content"), document.querySelectorAll(".amountsContainer").forEach((e => {
        const t = e.querySelector(".final-amount"),
            i = e.querySelectorAll(".selected-amount");

        function o(e) {
            const o = e.currentTarget;
            i.forEach((e => {
                e.classList.remove("active", "btn-primary"), e.classList.add("btn-secondary")
            })), null == n || n.classList.add("d-none"), o.classList.add("active", "btn-primary"), o.classList.remove("btn-secondary");
            const s = o.getAttribute("data-amount");
            if (s) {
                t.value = s, t.classList.remove("border-danger");
                const e = t.closest(".input-group");
                e && e.nextElementSibling && e.nextElementSibling.classList.contains("required-message") && e.nextElementSibling.remove(), a(t.value)
            }
        }
        t && (i.forEach((e => {
            e.addEventListener("click", o)
        })), t.addEventListener("input", (function() {
            i.forEach((e => {
                e.classList.remove("active", "btn-primary"), e.classList.add("btn-secondary")
            })), a(t.value.trim())
        })))
    }))
}
export {
    e as i
};
//# sourceMappingURL=selectAmountModule.js.map