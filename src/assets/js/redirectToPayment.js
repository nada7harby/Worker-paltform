import {
    M as e
} from "./bootstrap.js";
class t {
    constructor() {
        this.redirectToPaymentElement = document.getElementById("redirectToPayment"), this.redirectToPaymentModal = new e(this.redirectToPaymentElement), this.srNotificationArea = document.getElementById("srNotificationArea"), this.redirectToPaymentError = document.getElementById("redirectToPayment_error"), this.redirectToPaymentLoading = document.getElementById("redirectToPayment_loading");
        const t = document.getElementById("closeRedirectModal");
        t && t.addEventListener("click", (() => {
            this.redirectToPaymentModal.hide()
        }))
    }
    redirectToPayment(e) {
        this.redirectToPaymentLoading.classList.remove("d-none"), e ? (this.redirectToPaymentModal.show(), this.srNotificationArea.innerHTML = "جاري الانتقال إلى صفحة الدفع") : (this.redirectToPaymentModal.hide(), this.srNotificationArea.innerHTML = "حدث خطأ أثناء معالجة الطلب")
    }
    handleResponse(e) {
        e ? (this.redirectToPaymentLoading.classList.add("d-none"), this.redirectToPaymentError.classList.remove("d-none"), this.redirectToPaymentElement.setAttribute("aria-describedby", "redirectToPayment_error")) : (this.redirectToPaymentLoading.classList.remove("d-none"), this.redirectToPaymentError.classList.add("d-none"))
    }
}
export {
    t as P
};
//# sourceMappingURL=redirectToPayment.js.map