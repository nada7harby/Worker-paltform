var e, t, a, i, s, l, r, n, o, h, d, c, u, m = e => {
        throw TypeError(e)
    },
    g = (e, t, a) => (((e, t, a) => {
        t.has(e) || m("Cannot " + a)
    })(e, t, "access private method"), a);
import {
    J as v
} from "./justvalidation.js";
class b {
    constructor(t = "") {
        var a, i, s;
        a = this, (i = e).has(a) ? m("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(a) : i.set(a, s), this.locale = t, this.validators = [], this.localeErrorMessages = g(this, e, d).call(this), this.validationMapping = g(this, e, c).call(this), this.init()
    }
    init() {
        g(this, e, t).call(this)
    }
    getValidator(e) {
        const t = "string" == typeof e ? document.querySelector(e) : e;
        if (!t) throw new Error("Form element not found");
        const a = this.validators.find((e => e.form === t));
        if (!a) throw new Error("Validator not found for the provided form");
        return a.validator
    }
    isFormValid(e) {
        return this.getValidator(e).isValid
    }
    refresh(e) {
        this.getValidator(e).refresh()
    }
    destroy(e) {
        this.getValidator(e).destroy(), this.validators = this.validators.filter((t => t.form !== e))
    }
    recreate(t) {
        const i = "string" == typeof t ? document.querySelector(t) : t;
        i && (this.destroy(i), g(this, e, a).call(this, i))
    }
    revalidate(e) {
        return this.getValidator(e).validate()
    }
    refreshAll() {
        this.validators.forEach((e => e.validator.refresh()))
    }
    destroyAll() {
        this.validators.forEach((e => e.validator.destroy())), this.validators = []
    }
    recreateAll() {
        this.destroyAll(), g(this, e, t).call(this)
    }
}
e = new WeakSet, t = function() {
    document.querySelectorAll('form[data-validate="true"]').forEach((t => g(this, e, a).call(this, t)))
}, a = function(t) {
    const a = g(this, e, u).call(this, t),
        l = new v(t, { ...a
        }),
        n = g(this, e, i).call(this, t);
    Object.keys(n).forEach((t => {
        l.addField(t, n[t], g(this, e, u).call(this, t))
    })), g(this, e, s).call(this, t, l), l.onValidate((t => {
        g(this, e, r).call(this, t)
    })), l.onSuccess((e => {
        const t = l.form;
        Boolean("true" == t.dataset.validateAjax) || Boolean(!t.action) || t.submit()
    })), this.validators.push({
        form: t,
        validator: l
    })
}, i = function(t) {
    const a = {};
    return Object.keys(this.validationMapping).forEach((i => {
        t.querySelectorAll(`[class*="${i}"], [data-${i}]`).forEach((t => {
            g(this, e, l).call(this, t);
            const s = g(this, e, h).call(this, t),
                r = this.validationMapping[i](t);
            a[s] || (a[s] = []), a[s].push(r)
        }))
    })), a
}, s = function(t, a) {
    t.querySelectorAll(".validate-group").forEach((t => {
        const i = g(this, e, n).call(this, "required", [g(this, e, o).call(this, t)]);
        a.addRequiredGroup(t, i)
    }))
}, l = function(e) {
    e.classList.contains("validate-number") && (e.setAttribute("inputmode", "numeric"), e.setAttribute("pattern", "[0-9]*")), e.dataset.validateMinlength && e.setAttribute("minlength", e.dataset.validateMinlength), e.dataset.validateMaxlength && e.setAttribute("maxlength", e.dataset.validateMaxlength), e.classList.contains("validate-required") && e.setAttribute("required", !0), e.classList.contains("validate-email") && e.setAttribute("type", "email"), (e.classList.contains("validate-password") || e.classList.contains("validate-strong-password")) && e.setAttribute("type", "password")
}, r = function(e) {
    try {
        let t = [];
        if (t = e.isSubmitted ? Object.values(e.fields) : Object.values(e.fields).filter((e => e.touched)), !t.length) return;
        for (const e of t) void 0 !== e.isValid && (e.elem ? (e.elem.ariaInvalid = !e.isValid, e.elem.ariaDescription = e.isValid ? "" : e.errorMessage) : console.warn(`Field element not found for ${e}`))
    } catch (t) {
        console.error("Error in handleFieldsValidation:", t)
    }
}, n = function(e, t) {
    const a = this.localeErrorMessages[e];
    if (!a) return e;
    let i = a[this.locale] || a.arabic;
    return t.forEach(((e, t) => {
        const a = new RegExp(`\\{${t}\\}`, "g");
        i = i.replace(a, e)
    })), i
}, o = function(e) {
    var t;
    return ((null == (t = document.querySelector(`label[for="${e.id}"]`)) ? void 0 : t.innerText) || e.ariaLabel || e.dataset.validateFieldTitle || "Field").replace(/[:*]/g, "")
}, h = function(e) {
    if (e.id) return `#${e.id}`;
    if (e.name) return `input[name="${e.name}"]`;
    return `${e.className.split(" ").map((e=>`.${e}`)).join("")}[type="${e.type}"]`
}, d = function() {
    return {
        required: {
            arabic: "الرجاء إدخال {0}.",
            english: "{0} is required"
        },
        email: {
            arabic: "الرجاء إدخال عنوان بريد إلكتروني صحيح",
            english: "Please enter a valid email address"
        },
        number: {
            arabic: "الرجاء إدخال رقم صحيح",
            english: "Please enter a valid number"
        },
        minLength: {
            arabic: "الحد الأدنى لطول {0} هو {1}",
            english: "Minimum {0} length is {1}"
        },
        maxLength: {
            arabic: "الحد الأقصى لطول {0} هو {1}",
            english: "Maximum {0} length is {1}"
        },
        minNumber: {
            arabic: "يجب أن يكون {0} أكبر من أو يساوي {1}",
            english: "{0} must be greater than {1}"
        },
        maxNumber: {
            arabic: "يجب أن يكون {0} أقل من أو يساوي {1}",
            english: "{0} must be less than {1}"
        },
        password: {
            arabic: "يجب أن تتكون كلمة المرور من ثمانية أحرف على الأقل وأن تحتوي على حرف واحد ورقم واحد",
            english: "Password must be at least eight characters long and contain at least one letter and one number"
        },
        strongPassword: {
            arabic: "يجب أن تتكون كلمة المرور من ثمانية أحرف على الأقل وتحتوي على حرف كبير واحد وحرف صغير واحد ورقم واحد وحرف خاص واحد",
            english: "Password must be at least eight characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        },
        customRegexp: {
            arabic: "صيغة {0} غير صحيحة",
            english: "Invalid {0} format"
        },
        minFilesCount: {
            arabic: "يجب أن يكون عدد الملفات المرفوعة {0} كحد أدنى",
            english: "Number of uploaded files must be greater than {0}"
        },
        maxFilesCount: {
            arabic: "يجب أن يكون عدد الملفات المرفوعة أقل من {0}",
            english: "Number of uploaded files must be less than {0}"
        },
        arabicLettersOnly: {
            arabic: "يجب أن يحتوي {0} على حروف عربية فقط",
            english: "{0} must contain Arabic letters only"
        },
        englishLettersOnly: {
            arabic: "يجب أن يحتوي {0} على حروف إنجليزية فقط",
            english: "{0} must contain English letters only"
        },
        lettersOnly: {
            arabic: "يجب أن يحتوي {0} على حروف فقط",
            english: "{0} must contain letters only"
        },
        arabicLettersAndNumbers: {
            arabic: "يجب أن يحتوي {0} على حروف عربية وأرقام فقط",
            english: "{0} must contain Arabic letters and numbers only"
        },
        englishLettersAndNumbers: {
            arabic: "يجب أن يحتوي {0} على حروف إنجليزية وأرقام فقط",
            english: "{0} must contain English letters and numbers only"
        },
        invalidMobileNumber: {
            arabic: "صيغة رقم الجوال غير صحيحة",
            english: "Invalid mobile number format"
        },
        invalidNationalId: {
            arabic: "صيغة رقم الهوية الوطنية غير صحيحة",
            english: "Invalid national ID format"
        },
        invalidIqamaId: {
            arabic: "صيغة رقم الإقامة غير صحيحة",
            english: "Invalid Iqama ID format"
        },
        invalidFormat: {
            arabic: "الصيغة المدخلة غير صحيحة",
            english: "Invalid format"
        }
    }
}, c = function() {
    return {
        "validate-required": t => ({
            rule: "required",
            errorMessage: g(this, e, n).call(this, "required", [g(this, e, o).call(this, t)])
        }),
        "validate-email": t => ({
            rule: "email",
            errorMessage: g(this, e, n).call(this, "email", [g(this, e, o).call(this, t)])
        }),
        "validate-number": t => ({
            rule: "number",
            errorMessage: g(this, e, n).call(this, "number", [g(this, e, o).call(this, t)])
        }),
        "validate-integer": t => ({
            rule: "integer",
            errorMessage: g(this, e, n).call(this, "number", [g(this, e, o).call(this, t)])
        }),
        "validate-min-length": t => ({
            rule: "minLength",
            value: parseInt(t.dataset.validateMinLength, 10),
            errorMessage: g(this, e, n).call(this, "minLength", [g(this, e, o).call(this, t), t.dataset.validateMinLength])
        }),
        "validate-max-length": t => ({
            rule: "maxLength",
            value: parseInt(t.dataset.validateMaxLength, 10),
            errorMessage: g(this, e, n).call(this, "maxLength", [g(this, e, o).call(this, t), t.dataset.validateMaxLength])
        }),
        "validate-min-number": t => ({
            rule: "minNumber",
            value: parseFloat(t.dataset.validateMinNumber),
            errorMessage: g(this, e, n).call(this, "minNumber", [g(this, e, o).call(this, t), t.dataset.validateMinNumber])
        }),
        "validate-max-number": t => ({
            rule: "maxNumber",
            value: parseFloat(t.dataset.validateMaxNumber),
            errorMessage: g(this, e, n).call(this, "maxNumber", [g(this, e, o).call(this, t), t.dataset.validateMaxNumber])
        }),
        "validate-password": t => ({
            rule: "password",
            errorMessage: g(this, e, n).call(this, "password", [g(this, e, o).call(this, t)])
        }),
        "validate-strong-password": t => ({
            rule: "strongPassword",
            errorMessage: g(this, e, n).call(this, "strongPassword", [g(this, e, o).call(this, t)])
        }),
        "validate-custom-regexp": t => ({
            rule: "customRegexp",
            value: new RegExp(t.dataset.validateCustomRegexp),
            errorMessage: g(this, e, n).call(this, "customRegexp", [g(this, e, o).call(this, t)])
        }),
        "validate-minFilesCount": t => ({
            rule: "minFilesCount",
            value: parseInt(t.dataset.validateMinFilesCount, 10),
            errorMessage: g(this, e, n).call(this, "minFilesCount", [t.dataset.validateMinFilesCount])
        }),
        "validate-max-files-count": t => ({
            rule: "maxFilesCount",
            value: parseInt(t.dataset.validateMaxFilesCount, 10),
            errorMessage: g(this, e, n).call(this, "maxFilesCount", [t.dataset.validateMaxFilesCount])
        }),
        "validate-arabic-letters-only": t => ({
            rule: "customRegexp",
            value: /^[\u0621-\u064A\s]+$/,
            errorMessage: g(this, e, n).call(this, "arabicLettersOnly", [g(this, e, o).call(this, t)])
        }),
        "validate-english-letters-only": t => ({
            rule: "customRegexp",
            value: /^[A-Za-z\s]+$/,
            errorMessage: g(this, e, n).call(this, "englishLettersOnly", [g(this, e, o).call(this, t)])
        }),
        "validate-letters-only": t => ({
            rule: "customRegexp",
            value: /^[A-Za-z\u0621-\u064A\s]+$/,
            errorMessage: g(this, e, n).call(this, "lettersOnly", [g(this, e, o).call(this, t)])
        }),
        "validate-arabic-letters-numbers": t => ({
            rule: "customRegexp",
            value: /^[\u0621-\u064A0-9\s]+$/,
            errorMessage: g(this, e, n).call(this, "arabicLettersAndNumbers", [g(this, e, o).call(this, t)])
        }),
        "validate-english-letters-numbers": t => ({
            rule: "customRegexp",
            value: /^[A-Za-z0-9\s]+$/,
            errorMessage: g(this, e, n).call(this, "englishLettersAndNumbers", [g(this, e, o).call(this, t)])
        }),
        "validate-saudi-mobile": t => ({
            rule: "customRegexp",
            value: /^05\d{8}$/i,
            errorMessage: g(this, e, n).call(this, "invalidMobileNumber", [g(this, e, o).call(this, t)])
        }),
        "validate-saudi-id": t => ({
            rule: "customRegexp",
            value: /^1\d{9}$/i,
            errorMessage: g(this, e, n).call(this, "invalidNationalId", [g(this, e, o).call(this, t)])
        }),
        "validate-iqama-id": t => ({
            rule: "customRegexp",
            value: /^2\d{9}$/i,
            errorMessage: g(this, e, n).call(this, "invalidIqamaId", [g(this, e, o).call(this, t)])
        }),
        "validate-id": t => ({
            rule: "customRegexp",
            value: /^(1|2)\d{9}$/i,
            errorMessage: g(this, e, n).call(this, "invalidFormat", [g(this, e, o).call(this, t)])
        })
    }
}, u = function(e) {
    if ("string" == typeof e && (e = document.querySelector(e)), !e) return {};
    const t = {};
    return Object.keys(e.dataset).forEach((a => {
        if (a.startsWith("validateConfig")) {
            const i = a.replace("validateConfig", ""),
                s = "true" === e.dataset[a] || "false" !== e.dataset[a] && (isNaN(e.dataset[a]) ? e.dataset[a] : parseInt(e.dataset[a]));
            t[i.charAt(0).toLowerCase() + i.slice(1)] = s
        }
    })), t
};
export {
    b as F
};
//# sourceMappingURL=formValidator.js.map