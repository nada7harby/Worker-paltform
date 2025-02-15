var e = Object.defineProperty,
    i = (i, t, s) => (((i, t, s) => {
        t in i ? e(i, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: s
        }) : i[t] = s
    })(i, "symbol" != typeof t ? t + "" : t, s), s);
const t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    s = /^-?[0-9]\d*$/,
    l = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
    r = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    o = e => "string" != typeof e || "" === e;
var a = (e => (e.Required = "required", e.Email = "email", e.MinLength = "minLength", e.MaxLength = "maxLength", e.Password = "password", e.Number = "number", e.Integer = "integer", e.MaxNumber = "maxNumber", e.MinNumber = "minNumber", e.StrongPassword = "strongPassword", e.CustomRegexp = "customRegexp", e.MinFilesCount = "minFilesCount", e.MaxFilesCount = "maxFilesCount", e.Files = "files", e))(a || {}),
    n = (e => (e.Required = "required", e))(n || {}),
    d = (e => (e.Label = "label", e.LabelArrow = "labelArrow", e))(d || {});
const c = [{
        key: a.Required,
        dict: {
            en: "The field is required"
        }
    }, {
        key: a.Email,
        dict: {
            en: "Email has invalid format"
        }
    }, {
        key: a.MaxLength,
        dict: {
            en: "The field must contain a maximum of :value characters"
        }
    }, {
        key: a.MinLength,
        dict: {
            en: "The field must contain a minimum of :value characters"
        }
    }, {
        key: a.Password,
        dict: {
            en: "Password must contain minimum eight characters, at least one letter and one number"
        }
    }, {
        key: a.StrongPassword,
        dict: {
            en: "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }
    }, {
        key: a.Number,
        dict: {
            en: "Value should be a number"
        }
    }, {
        key: a.MaxNumber,
        dict: {
            en: "Number should be less or equal than :value"
        }
    }, {
        key: a.MinNumber,
        dict: {
            en: "Number should be more or equal than :value"
        }
    }, {
        key: a.MinFilesCount,
        dict: {
            en: "Files count should be more or equal than :value"
        }
    }, {
        key: a.MaxFilesCount,
        dict: {
            en: "Files count should be less or equal than :value"
        }
    }, {
        key: a.Files,
        dict: {
            en: "Uploaded files have one or several invalid properties (extension/size/type etc)."
        }
    }],
    h = e => "object" == typeof e && null !== e && "then" in e && "function" == typeof e.then,
    u = e => Array.isArray(e) ? e.filter((e => e.length > 0)) : "string" == typeof e && e.trim() ? [...e.split(" ").filter((e => e.length > 0))] : [],
    f = e => e instanceof Element || e instanceof HTMLDocument,
    b = {
        errorFieldStyle: {
            color: "#b81111",
            border: "1px solid #B81111"
        },
        errorFieldCssClass: "just-validate-error-field",
        successFieldCssClass: "just-validate-success-field",
        errorLabelStyle: {
            color: "#b81111"
        },
        errorLabelCssClass: "just-validate-error-label",
        successLabelCssClass: "just-validate-success-label",
        focusInvalidField: !0,
        lockForm: !0,
        testingMode: !1,
        validateBeforeSubmitting: !1,
        submitFormAutomatically: !1
    };
class g {
    constructor(e, t, s) {
        i(this, "form", null), i(this, "fields", {}), i(this, "groupFields", {}), i(this, "errors", {}), i(this, "isValid", !1), i(this, "isSubmitted", !1), i(this, "globalConfig", b), i(this, "errorLabels", {}), i(this, "successLabels", {}), i(this, "eventListeners", []), i(this, "dictLocale", c), i(this, "currentLocale", "en"), i(this, "customStyleTags", {}), i(this, "onSuccessCallback"), i(this, "onFailCallback"), i(this, "onValidateCallback"), i(this, "tooltips", []), i(this, "lastScrollPosition"), i(this, "isScrollTick"), i(this, "fieldIds", new Map), i(this, "getKeyByFieldSelector", (e => this.fieldIds.get(e))), i(this, "getFieldSelectorByKey", (e => {
            for (const [i, t] of this.fieldIds)
                if (e === t) return i
        })), i(this, "getCompatibleFields", (() => {
            const e = {};
            return Object.keys(this.fields).forEach((i => {
                let t = i;
                const s = this.getFieldSelectorByKey(i);
                "string" == typeof s && (t = s), e[t] = { ...this.fields[i]
                }
            })), e
        })), i(this, "setKeyByFieldSelector", (e => {
            if (this.fieldIds.has(e)) return this.fieldIds.get(e);
            const i = String(this.fieldIds.size + 1);
            return this.fieldIds.set(e, i), i
        })), i(this, "refreshAllTooltips", (() => {
            this.tooltips.forEach((e => {
                e.refresh()
            }))
        })), i(this, "handleDocumentScroll", (() => {
            this.lastScrollPosition = window.scrollY, this.isScrollTick || (window.requestAnimationFrame((() => {
                this.refreshAllTooltips(), this.isScrollTick = !1
            })), this.isScrollTick = !0)
        })), i(this, "formSubmitHandler", (e => {
            e.preventDefault(), this.isSubmitted = !0, this.validateHandler(e)
        })), i(this, "handleFieldChange", (e => {
            let i;
            for (const t in this.fields) {
                if (this.fields[t].elem === e) {
                    i = t;
                    break
                }
            }
            i && (this.fields[i].touched = !0, this.validateField(i, !0))
        })), i(this, "handleGroupChange", (e => {
            let i;
            for (const t in this.groupFields) {
                if (this.groupFields[t].elems.find((i => i === e))) {
                    i = t;
                    break
                }
            }
            i && (this.groupFields[i].touched = !0, this.validateGroup(i, !0))
        })), i(this, "handlerChange", (e => {
            e.target && (this.handleFieldChange(e.target), this.handleGroupChange(e.target), this.renderErrors())
        })), this.initialize(e, t, s)
    }
    initialize(e, i, t) {
        if (this.form = null, this.errors = {}, this.isValid = !1, this.isSubmitted = !1, this.globalConfig = b, this.errorLabels = {}, this.successLabels = {}, this.eventListeners = [], this.customStyleTags = {}, this.tooltips = [], this.currentLocale = "en", "string" == typeof e) {
            const i = document.querySelector(e);
            if (!i) throw Error(`Form with ${e} selector not found! Please check the form selector`);
            this.setForm(i)
        } else {
            if (!(e instanceof HTMLFormElement)) throw Error("Form selector is not valid. Please specify a string selector or a DOM element.");
            this.setForm(e)
        }
        if (this.globalConfig = { ...b,
                ...i
            }, t && (this.dictLocale = [...t, ...c]), this.isTooltip()) {
            const e = document.createElement("style");
            e.textContent = ".just-validate-error-label[data-tooltip=true]{position:fixed;padding:4px 8px;background:#423f3f;color:#fff;white-space:nowrap;z-index:10;border-radius:4px;transform:translateY(-5px)}.just-validate-error-label[data-tooltip=true]:before{content:'';width:0;height:0;border-left:solid 5px transparent;border-right:solid 5px transparent;border-bottom:solid 5px #423f3f;position:absolute;z-index:3;display:block;bottom:-5px;transform:rotate(180deg);left:calc(50% - 5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]{transform:translateX(-5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]:before{right:-7px;bottom:auto;left:auto;top:calc(50% - 2px);transform:rotate(90deg)}.just-validate-error-label[data-tooltip=true][data-direction=right]{transform:translateX(5px)}.just-validate-error-label[data-tooltip=true][data-direction=right]:before{right:auto;bottom:auto;left:-7px;top:calc(50% - 2px);transform:rotate(-90deg)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]{transform:translateY(5px)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]:before{right:auto;bottom:auto;left:calc(50% - 5px);top:-5px;transform:rotate(0)}", this.customStyleTags[d.Label] = document.head.appendChild(e), this.addListener("scroll", document, this.handleDocumentScroll)
        }
    }
    getLocalisedString(e, i, t) {
        var s;
        const l = null != t ? t : e;
        let r = null == (s = this.dictLocale.find((e => e.key === l))) ? void 0 : s.dict[this.currentLocale];
        if (r || t && (r = t), r && void 0 !== i) switch (e) {
            case a.MaxLength:
            case a.MinLength:
            case a.MaxNumber:
            case a.MinNumber:
            case a.MinFilesCount:
            case a.MaxFilesCount:
                r = r.replace(":value", String(i))
        }
        return r || t || "Value is incorrect"
    }
    getFieldErrorMessage(e, i) {
        const t = "function" == typeof e.errorMessage ? e.errorMessage(this.getElemValue(i), this.fields) : e.errorMessage;
        return this.getLocalisedString(e.rule, e.value, t)
    }
    getFieldSuccessMessage(e, i) {
        const t = "function" == typeof e ? e(this.getElemValue(i), this.fields) : e;
        return this.getLocalisedString(void 0, void 0, t)
    }
    getGroupErrorMessage(e) {
        return this.getLocalisedString(e.rule, void 0, e.errorMessage)
    }
    getGroupSuccessMessage(e) {
        if (e.successMessage) return this.getLocalisedString(void 0, void 0, e.successMessage)
    }
    setFieldInvalid(e, i) {
        this.fields[e].isValid = !1, this.fields[e].errorMessage = this.getFieldErrorMessage(i, this.fields[e].elem)
    }
    setFieldValid(e, i) {
        this.fields[e].isValid = !0, void 0 !== i && (this.fields[e].successMessage = this.getFieldSuccessMessage(i, this.fields[e].elem))
    }
    setGroupInvalid(e, i) {
        this.groupFields[e].isValid = !1, this.groupFields[e].errorMessage = this.getGroupErrorMessage(i)
    }
    setGroupValid(e, i) {
        this.groupFields[e].isValid = !0, this.groupFields[e].successMessage = this.getGroupSuccessMessage(i)
    }
    getElemValue(e) {
        switch (e.type) {
            case "checkbox":
                return e.checked;
            case "file":
                return e.files;
            default:
                return e.value
        }
    }
    validateGroupRule(e, i, t) {
        if (t.rule === n.Required) i.every((e => !e.checked)) ? this.setGroupInvalid(e, t) : this.setGroupValid(e, t)
    }
    validateFieldRule(e, i, n, d = !1) {
        const c = n.value,
            u = this.getElemValue(i);
        if (n.plugin) {
            n.plugin(u, this.getCompatibleFields()) || this.setFieldInvalid(e, n)
        } else {
            switch (n.rule) {
                case a.Required:
                    (e => {
                        let i = e;
                        return "string" == typeof e && (i = e.trim()), !i
                    })(u) && this.setFieldInvalid(e, n);
                    break;
                case a.Email:
                    if (o(u)) break;
                    f = u, t.test(f) || this.setFieldInvalid(e, n);
                    break;
                case a.MaxLength:
                    if (void 0 === c) {
                        console.error(`Value for ${n.rule} rule for [${e}] field is not defined. The field will be always invalid.`), this.setFieldInvalid(e, n);
                        break
                    }
                    if ("number" != typeof c) {
                        console.error(`Value for ${n.rule} rule for [${e}] should be a number. The field will be always invalid.`), this.setFieldInvalid(e, n);
                        break
                    }
                    if (o(u)) break;
                    ((e, i) => e.length > i)(u, c) && this.setFieldInvalid(e, n);
                    break;
                case a.MinLength:
                    if (void 0 === c) {
                        console.error(`Value for ${n.rule} rule for [${e}] field is not defined. The field will be always invalid.`), this.setFieldInvalid(e, n);
                        break
                    }
                    if ("number" != typeof c) {
                        console.error(`Value for ${n.rule} rule for [${e}] should be a number. The field will be always invalid.`), this.setFieldInvalid(e, n);
                        break
                    }
                    if (o(u)) break;
                    ((e, i) => e.length < i)(u, c) && this.setFieldInvalid(e, n);
                    break;
                case a.Password:
                    if (o(u)) break;
                    (e => l.test(e))(u) || this.setFieldInvalid(e, n);
                    break;
                case a.StrongPassword:
                    if (o(u)) break;
                    (e => r.test(e))(u) || this.setFieldInvalid(e, n);
                    break;
                case a.Number:
                    if (o(u)) break;
                    (e => "string" == typeof e && !isNaN(+e) && !isNaN(parseFloat(e)))(u) || this.setFieldInvalid(e, n);
                    break;
                case a.Integer:
                    if (o(u)) break;
                    (e => s.test(e))(u) || this.setFieldInvalid(e, n);
                    break;
                case a.MaxNumber:
                    {
                        if (void 0 === c) {
                            console.error(`Value for ${n.rule} rule for [${e}] field is not defined. The field will be always invalid.`), this.setFieldInvalid(e, n);
                            break
                        }
                        if ("number" != typeof c) {
                            console.error(`Value for ${n.rule} rule for [${e}] field should be a number. The field will be always invalid.`), this.setFieldInvalid(e, n);
                            break
                        }
                        if (o(u)) break;
                        const i = +u;
                        (Number.isNaN(i) || ((e, i) => e > i)(i, c)) && this.setFieldInvalid(e, n);
                        break
                    }
                case a.MinNumber:
                    {
                        if (void 0 === c) {
                            console.error(`Value for ${n.rule} rule for [${e}] field is not defined. The field will be always invalid.`), this.setFieldInvalid(e, n);
                            break
                        }
                        if ("number" != typeof c) {
                            console.error(`Value for ${n.rule} rule for [${e}] field should be a number. The field will be always invalid.`), this.setFieldInvalid(e, n);
                            break
                        }
                        if (o(u)) break;
                        const i = +u;
                        (Number.isNaN(i) || ((e, i) => e < i)(i, c)) && this.setFieldInvalid(e, n);
                        break
                    }
                case a.CustomRegexp:
                    {
                        if (void 0 === c) return console.error(`Value for ${n.rule} rule for [${e}] field is not defined. This field will be always invalid.`), void this.setFieldInvalid(e, n);
                        let i;
                        try {
                            i = new RegExp(c)
                        } catch (b) {
                            console.error(`Value for ${n.rule} rule for [${e}] should be a valid regexp. This field will be always invalid.`), this.setFieldInvalid(e, n);
                            break
                        }
                        const t = String(u);
                        "" === t || i.test(t) || this.setFieldInvalid(e, n);
                        break
                    }
                case a.MinFilesCount:
                    if (void 0 === c) {
                        console.error(`Value for ${n.rule} rule for [${e}] field is not defined. This field will be always invalid.`), this.setFieldInvalid(e, n);
                        break
                    }
                    if ("number" != typeof c) {
                        console.error(`Value for ${n.rule} rule for [${e}] field should be a number. The field will be always invalid.`), this.setFieldInvalid(e, n);
                        break
                    }
                    if (Number.isFinite(null == u ? void 0 : u.length) && u.length < c) {
                        this.setFieldInvalid(e, n);
                        break
                    }
                    break;
                case a.MaxFilesCount:
                    if (void 0 === c) {
                        console.error(`Value for ${n.rule} rule for [${e}] field is not defined. This field will be always invalid.`), this.setFieldInvalid(e, n);
                        break
                    }
                    if ("number" != typeof c) {
                        console.error(`Value for ${n.rule} rule for [${e}] field should be a number. The field will be always invalid.`), this.setFieldInvalid(e, n);
                        break
                    }
                    if (Number.isFinite(null == u ? void 0 : u.length) && u.length > c) {
                        this.setFieldInvalid(e, n);
                        break
                    }
                    break;
                case a.Files:
                    {
                        if (void 0 === c) return console.error(`Value for ${n.rule} rule for [${e}] field is not defined. This field will be always invalid.`), void this.setFieldInvalid(e, n);
                        if ("object" != typeof c) return console.error(`Value for ${n.rule} rule for [${e}] field should be an object. This field will be always invalid.`), void this.setFieldInvalid(e, n);
                        const i = c.files;
                        if ("object" != typeof i) return console.error(`Value for ${n.rule} rule for [${e}] field should be an object with files array. This field will be always invalid.`), void this.setFieldInvalid(e, n);
                        const t = (e, i) => {
                            const t = Number.isFinite(i.minSize) && e.size < i.minSize,
                                s = Number.isFinite(i.maxSize) && e.size > i.maxSize,
                                l = Array.isArray(i.names) && !i.names.includes(e.name),
                                r = Array.isArray(i.extensions) && !i.extensions.includes(e.name.split(".")[e.name.split(".").length - 1]),
                                o = Array.isArray(i.types) && !i.types.includes(e.type);
                            return t || s || l || r || o
                        };
                        if ("object" == typeof u && null !== u)
                            for (let s = 0, l = u.length; s < l; ++s) {
                                const l = u.item(s);
                                if (!l) {
                                    this.setFieldInvalid(e, n);
                                    break
                                }
                                if (t(l, i)) {
                                    this.setFieldInvalid(e, n);
                                    break
                                }
                            }
                        break
                    }
                default:
                    {
                        if ("function" != typeof n.validator) return console.error(`Validator for custom rule for [${e}] field should be a function. This field will be always invalid.`), void this.setFieldInvalid(e, n);
                        const i = n.validator(u, this.getCompatibleFields());
                        if ("boolean" != typeof i && "function" != typeof i && console.error(`Validator return value for [${e}] field should be boolean or function. It will be cast to boolean.`), "function" == typeof i) {
                            if (!d) {
                                this.fields[e].asyncCheckPending = !1;
                                const t = i();
                                return h(t) ? t.then((i => {
                                    i || this.setFieldInvalid(e, n)
                                })).catch((() => {
                                    this.setFieldInvalid(e, n)
                                })) : (console.error(`Validator function for custom rule for [${e}] field should return a Promise. This field will be always invalid.`), void this.setFieldInvalid(e, n))
                            }
                            this.fields[e].asyncCheckPending = !0
                        }
                        i || this.setFieldInvalid(e, n)
                    }
            }
            var f
        }
    }
    isFormValid() {
        let e = !0;
        for (let i = 0, t = Object.values(this.fields).length; i < t; ++i) {
            const t = Object.values(this.fields)[i];
            if (void 0 === t.isValid) {
                e = void 0;
                break
            }
            if (!1 === t.isValid) {
                e = !1;
                break
            }
        }
        for (let i = 0, t = Object.values(this.groupFields).length; i < t; ++i) {
            const t = Object.values(this.groupFields)[i];
            if (void 0 === t.isValid) {
                e = void 0;
                break
            }
            if (!1 === t.isValid) {
                e = !1;
                break
            }
        }
        return e
    }
    validateField(e, i = !1) {
        var t;
        const s = this.fields[e];
        s.isValid = !0;
        const l = [];
        return [...s.rules].reverse().forEach((t => {
            const r = this.validateFieldRule(e, s.elem, t, i);
            h(r) && l.push(r)
        })), s.isValid && this.setFieldValid(e, null == (t = s.config) ? void 0 : t.successMessage), Promise.allSettled(l).finally((() => {
            var e;
            i && (null == (e = this.onValidateCallback) || e.call(this, {
                isValid: this.isFormValid(),
                isSubmitted: this.isSubmitted,
                fields: this.getCompatibleFields(),
                groups: { ...this.groupFields
                }
            }))
        }))
    }
    revalidateField(e) {
        if ("string" != typeof e && !f(e)) throw Error("Field selector is not valid. Please specify a string selector or a valid DOM element.");
        const i = this.getKeyByFieldSelector(e);
        return i && this.fields[i] ? new Promise((e => {
            this.validateField(i, !0).finally((() => {
                this.clearFieldStyle(i), this.clearFieldLabel(i), this.renderFieldError(i, !0), e(!!this.fields[i].isValid)
            }))
        })) : (console.error("Field not found. Check the field selector."), Promise.reject())
    }
    revalidateGroup(e) {
        if ("string" != typeof e && !f(e)) throw Error("Group selector is not valid. Please specify a string selector or a valid DOM element.");
        const i = this.getKeyByFieldSelector(e);
        return i && this.groupFields[i] ? new Promise((e => {
            this.validateGroup(i).finally((() => {
                this.clearFieldLabel(i), this.renderGroupError(i, !0), e(!!this.groupFields[i].isValid)
            }))
        })) : (console.error("Group not found. Check the group selector."), Promise.reject())
    }
    validateGroup(e, i = !1) {
        const t = this.groupFields[e],
            s = [];
        return [...t.rules].reverse().forEach((i => {
            const l = this.validateGroupRule(e, t.elems, i);
            h(l) && s.push(l)
        })), Promise.allSettled(s).finally((() => {
            var e;
            i && (null == (e = this.onValidateCallback) || e.call(this, {
                isValid: this.isFormValid(),
                isSubmitted: this.isSubmitted,
                fields: this.getCompatibleFields(),
                groups: { ...this.groupFields
                }
            }))
        }))
    }
    focusInvalidField() {
        for (const e in this.fields) {
            const i = this.fields[e];
            if (!i.isValid) {
                setTimeout((() => i.elem.focus()), 0);
                break
            }
        }
    }
    afterSubmitValidation(e = !1) {
        this.renderErrors(e), this.globalConfig.focusInvalidField && this.focusInvalidField()
    }
    validate(e = !1) {
        return new Promise((i => {
            const t = [];
            Object.keys(this.fields).forEach((e => {
                const i = this.validateField(e);
                h(i) && t.push(i)
            })), Object.keys(this.groupFields).forEach((e => {
                const i = this.validateGroup(e);
                h(i) && t.push(i)
            })), Promise.allSettled(t).then((() => {
                var s;
                this.afterSubmitValidation(e), null == (s = this.onValidateCallback) || s.call(this, {
                    isValid: this.isFormValid(),
                    isSubmitted: this.isSubmitted,
                    fields: this.getCompatibleFields(),
                    groups: { ...this.groupFields
                    }
                }), i(!!t.length)
            }))
        }))
    }
    revalidate() {
        return new Promise((e => {
            this.validateHandler(void 0, !0).finally((() => {
                this.globalConfig.focusInvalidField && this.focusInvalidField(), e(this.isValid)
            }))
        }))
    }
    validateHandler(e, i = !1) {
        return this.globalConfig.lockForm && this.lockForm(), this.validate(i).finally((() => {
            var i, t, s;
            this.globalConfig.lockForm && this.unlockForm(), this.isValid ? (null == (i = this.onSuccessCallback) || i.call(this, e), this.globalConfig.submitFormAutomatically && (null == (t = null == e ? void 0 : e.currentTarget) || t.submit())) : null == (s = this.onFailCallback) || s.call(this, this.getCompatibleFields(), this.groupFields)
        }))
    }
    setForm(e) {
        this.form = e, this.form.setAttribute("novalidate", "novalidate"), this.removeListener("submit", this.form, this.formSubmitHandler), this.addListener("submit", this.form, this.formSubmitHandler)
    }
    addListener(e, i, t) {
        i.addEventListener(e, t), this.eventListeners.push({
            type: e,
            elem: i,
            func: t
        })
    }
    removeListener(e, i, t) {
        i.removeEventListener(e, t), this.eventListeners = this.eventListeners.filter((t => t.type !== e || t.elem !== i))
    }
    addField(e, i, t) {
        if ("string" != typeof e && !f(e)) throw Error("Field selector is not valid. Please specify a string selector or a valid DOM element.");
        let s;
        if (s = "string" == typeof e ? this.form.querySelector(e) : e, !s) throw Error("Field doesn't exist in the DOM! Please check the field selector.");
        if (!Array.isArray(i) || !i.length) throw Error("Rules argument should be an array and should contain at least 1 element.");
        i.forEach((e => {
            if (!("rule" in e || "validator" in e || "plugin" in e)) throw Error("Rules argument must contain at least one rule or validator property.");
            if (!(e.validator || e.plugin || e.rule && Object.values(a).includes(e.rule))) throw Error(`Rule should be one of these types: ${Object.values(a).join(", ")}. Provided value: ${e.rule}`)
        }));
        const l = this.setKeyByFieldSelector(e);
        return this.fields[l] = {
            elem: s,
            rules: i,
            isValid: void 0,
            touched: !1,
            config: t
        }, this.setListeners(s), (this.isSubmitted || this.globalConfig.validateBeforeSubmitting) && this.validateField(l), this
    }
    removeField(e) {
        if ("string" != typeof e && !f(e)) throw Error("Field selector is not valid. Please specify a string selector or a valid DOM element.");
        const i = this.getKeyByFieldSelector(e);
        if (!i || !this.fields[i]) return console.error("Field not found. Check the field selector."), this;
        const t = this.getListenerType(this.fields[i].elem.type);
        return this.removeListener(t, this.fields[i].elem, this.handlerChange), this.clearErrors(), delete this.fields[i], this
    }
    removeGroup(e) {
        if ("string" != typeof e) throw Error("Group selector is not valid. Please specify a string selector.");
        const i = this.getKeyByFieldSelector(e);
        return i && this.groupFields[i] ? (this.groupFields[i].elems.forEach((e => {
            const i = this.getListenerType(e.type);
            this.removeListener(i, e, this.handlerChange)
        })), this.clearErrors(), delete this.groupFields[i], this) : (console.error("Group not found. Check the group selector."), this)
    }
    addRequiredGroup(e, i, t, s) {
        if ("string" != typeof e && !f(e)) throw Error("Group selector is not valid. Please specify a string selector or a valid DOM element.");
        let l;
        if (l = "string" == typeof e ? this.form.querySelector(e) : e, !l) throw Error("Group selector not found! Please check the group selector.");
        const r = l.querySelectorAll("input"),
            o = Array.from(r).filter((e => {
                const i = ((e, i) => {
                    const t = [...i].reverse();
                    for (let s = 0, l = t.length; s < l; ++s) {
                        const i = t[s];
                        for (const t in e) {
                            const s = e[t];
                            if (s.groupElem === i) return [t, s]
                        }
                    }
                    return null
                })(this.groupFields, (e => {
                    let i = e;
                    const t = [];
                    for (; i;) t.unshift(i), i = i.parentNode;
                    return t
                })(e));
                return !i || i[1].elems.find((i => i !== e))
            })),
            a = this.setKeyByFieldSelector(e);
        return this.groupFields[a] = {
            rules: [{
                rule: n.Required,
                errorMessage: i,
                successMessage: s
            }],
            groupElem: l,
            elems: o,
            touched: !1,
            isValid: void 0,
            config: t
        }, r.forEach((e => {
            this.setListeners(e)
        })), this
    }
    getListenerType(e) {
        switch (e) {
            case "checkbox":
            case "select-one":
            case "file":
            case "radio":
                return "change";
            default:
                return "input"
        }
    }
    setListeners(e) {
        const i = this.getListenerType(e.type);
        this.removeListener(i, e, this.handlerChange), this.addListener(i, e, this.handlerChange)
    }
    clearFieldLabel(e) {
        var i, t;
        null == (i = this.errorLabels[e]) || i.remove(), null == (t = this.successLabels[e]) || t.remove()
    }
    clearFieldStyle(e) {
        var i, t, s, l;
        const r = this.fields[e],
            o = (null == (i = r.config) ? void 0 : i.errorFieldStyle) || this.globalConfig.errorFieldStyle;
        Object.keys(o).forEach((e => {
            r.elem.style[e] = ""
        }));
        const a = (null == (t = r.config) ? void 0 : t.successFieldStyle) || this.globalConfig.successFieldStyle || {};
        Object.keys(a).forEach((e => {
            r.elem.style[e] = ""
        })), r.elem.classList.remove(...u((null == (s = r.config) ? void 0 : s.errorFieldCssClass) || this.globalConfig.errorFieldCssClass), ...u((null == (l = r.config) ? void 0 : l.successFieldCssClass) || this.globalConfig.successFieldCssClass))
    }
    clearErrors() {
        var e, i;
        Object.keys(this.errorLabels).forEach((e => this.errorLabels[e].remove())), Object.keys(this.successLabels).forEach((e => this.successLabels[e].remove()));
        for (const t in this.fields) this.clearFieldStyle(t);
        for (const t in this.groupFields) {
            const s = this.groupFields[t],
                l = (null == (e = s.config) ? void 0 : e.errorFieldStyle) || this.globalConfig.errorFieldStyle;
            Object.keys(l).forEach((e => {
                s.elems.forEach((i => {
                    var t;
                    i.style[e] = "", i.classList.remove(...u((null == (t = s.config) ? void 0 : t.errorFieldCssClass) || this.globalConfig.errorFieldCssClass))
                }))
            }));
            const r = (null == (i = s.config) ? void 0 : i.successFieldStyle) || this.globalConfig.successFieldStyle || {};
            Object.keys(r).forEach((e => {
                s.elems.forEach((i => {
                    var t;
                    i.style[e] = "", i.classList.remove(...u((null == (t = s.config) ? void 0 : t.successFieldCssClass) || this.globalConfig.successFieldCssClass))
                }))
            }))
        }
        this.tooltips = []
    }
    isTooltip() {
        return !!this.globalConfig.tooltip
    }
    lockForm() {
        const e = this.form.querySelectorAll("input, textarea, button, select");
        for (let i = 0, t = e.length; i < t; ++i) e[i].setAttribute("data-just-validate-fallback-disabled", e[i].disabled ? "true" : "false"), e[i].setAttribute("disabled", "disabled"), e[i].style.pointerEvents = "none", e[i].style.webkitFilter = "grayscale(100%)", e[i].style.filter = "grayscale(100%)"
    }
    unlockForm() {
        const e = this.form.querySelectorAll("input, textarea, button, select");
        for (let i = 0, t = e.length; i < t; ++i) "true" !== e[i].getAttribute("data-just-validate-fallback-disabled") && e[i].removeAttribute("disabled"), e[i].style.pointerEvents = "", e[i].style.webkitFilter = "", e[i].style.filter = ""
    }
    renderTooltip(e, i, t) {
        var s;
        const {
            top: l,
            left: r,
            width: o,
            height: a
        } = e.getBoundingClientRect(), n = i.getBoundingClientRect(), d = t || (null == (s = this.globalConfig.tooltip) ? void 0 : s.position);
        switch (d) {
            case "left":
                i.style.top = l + a / 2 - n.height / 2 + "px", i.style.left = r - n.width - 5 + "px";
                break;
            case "top":
                i.style.top = l - n.height - 5 + "px", i.style.left = r + o / 2 - n.width / 2 + "px";
                break;
            case "right":
                i.style.top = l + a / 2 - n.height / 2 + "px", i.style.left = `${r+o+5}px`;
                break;
            case "bottom":
                i.style.top = `${l+a+5}px`, i.style.left = r + o / 2 - n.width / 2 + "px"
        }
        i.dataset.direction = d;
        return {
            refresh: () => {
                this.renderTooltip(e, i, t)
            }
        }
    }
    createErrorLabelElem(e, i, t) {
        const s = document.createElement("div");
        s.innerHTML = i;
        const l = this.isTooltip() ? null == t ? void 0 : t.errorLabelStyle : (null == t ? void 0 : t.errorLabelStyle) || this.globalConfig.errorLabelStyle;
        return Object.assign(s.style, l), s.classList.add(...u((null == t ? void 0 : t.errorLabelCssClass) || this.globalConfig.errorLabelCssClass), "just-validate-error-label"), this.isTooltip() && (s.dataset.tooltip = "true"), this.globalConfig.testingMode && (s.dataset.testId = `error-label-${e}`), this.errorLabels[e] = s, s
    }
    createSuccessLabelElem(e, i, t) {
        if (void 0 === i) return null;
        const s = document.createElement("div");
        s.innerHTML = i;
        const l = (null == t ? void 0 : t.successLabelStyle) || this.globalConfig.successLabelStyle;
        return Object.assign(s.style, l), s.classList.add(...u((null == t ? void 0 : t.successLabelCssClass) || this.globalConfig.successLabelCssClass), "just-validate-success-label"), this.globalConfig.testingMode && (s.dataset.testId = `success-label-${e}`), this.successLabels[e] = s, s
    }
    renderErrorsContainer(e, i) {
        const t = i || this.globalConfig.errorsContainer;
        if ("string" == typeof t) {
            const i = this.form.querySelector(t);
            if (i) return i.appendChild(e), !0;
            console.error(`Error container with ${t} selector not found. Errors will be rendered as usual`)
        }
        return t instanceof Element ? (t.appendChild(e), !0) : (void 0 !== t && console.error("Error container not found. It should be a string or existing Element. Errors will be rendered as usual"), !1)
    }
    renderGroupLabel(e, i, t, s) {
        if (!s) {
            if (this.renderErrorsContainer(i, t)) return
        }
        e.appendChild(i)
    }
    renderFieldLabel(e, i, t, s) {
        var l, r, o, a, n, d, c;
        if (!s) {
            if (this.renderErrorsContainer(i, t)) return
        }
        if ("checkbox" === e.type || "radio" === e.type) {
            const t = document.querySelector(`label[for="${e.getAttribute("id")}"]`);
            "label" === (null == (r = null == (l = e.parentElement) ? void 0 : l.tagName) ? void 0 : r.toLowerCase()) ? null == (a = null == (o = e.parentElement) ? void 0 : o.parentElement) || a.appendChild(i): t ? null == (n = t.parentElement) || n.appendChild(i) : null == (d = e.parentElement) || d.appendChild(i)
        } else null == (c = e.parentElement) || c.appendChild(i)
    }
    showLabels(e, i) {
        Object.keys(e).forEach(((t, s) => {
            const l = e[t],
                r = this.getKeyByFieldSelector(t);
            if (!r || !this.fields[r]) return void console.error("Field not found. Check the field selector.");
            const o = this.fields[r];
            o.isValid = !i, this.clearFieldStyle(r), this.clearFieldLabel(r), this.renderFieldError(r, !1, l), 0 === s && this.globalConfig.focusInvalidField && setTimeout((() => o.elem.focus()), 0)
        }))
    }
    showErrors(e) {
        if ("object" != typeof e) throw Error("[showErrors]: Errors should be an object with key: value format");
        this.showLabels(e, !0)
    }
    showSuccessLabels(e) {
        if ("object" != typeof e) throw Error("[showSuccessLabels]: Labels should be an object with key: value format");
        this.showLabels(e, !1)
    }
    renderFieldError(e, i = !1, t) {
        var s, l, r, o, a, n;
        const d = this.fields[e];
        if (!1 === d.isValid && (this.isValid = !1), void 0 === d.isValid || !i && !this.isSubmitted && !d.touched && void 0 === t) return;
        if (d.isValid) {
            if (!d.asyncCheckPending) {
                const i = this.createSuccessLabelElem(e, void 0 !== t ? t : d.successMessage, d.config);
                i && this.renderFieldLabel(d.elem, i, null == (s = d.config) ? void 0 : s.errorsContainer, !0), d.elem.classList.add(...u((null == (l = d.config) ? void 0 : l.successFieldCssClass) || this.globalConfig.successFieldCssClass))
            }
            return
        }
        d.elem.classList.add(...u((null == (r = d.config) ? void 0 : r.errorFieldCssClass) || this.globalConfig.errorFieldCssClass));
        const c = this.createErrorLabelElem(e, void 0 !== t ? t : d.errorMessage, d.config);
        this.renderFieldLabel(d.elem, c, null == (o = d.config) ? void 0 : o.errorsContainer), this.isTooltip() && this.tooltips.push(this.renderTooltip(d.elem, c, null == (n = null == (a = d.config) ? void 0 : a.tooltip) ? void 0 : n.position))
    }
    renderGroupError(e, i = !0) {
        var t, s, l, r;
        const o = this.groupFields[e];
        if (!1 === o.isValid && (this.isValid = !1), void 0 === o.isValid || !i && !this.isSubmitted && !o.touched) return;
        if (o.isValid) {
            o.elems.forEach((e => {
                var i, t;
                Object.assign(e.style, (null == (i = o.config) ? void 0 : i.successFieldStyle) || this.globalConfig.successFieldStyle), e.classList.add(...u((null == (t = o.config) ? void 0 : t.successFieldCssClass) || this.globalConfig.successFieldCssClass))
            }));
            const i = this.createSuccessLabelElem(e, o.successMessage, o.config);
            return void(i && this.renderGroupLabel(o.groupElem, i, null == (t = o.config) ? void 0 : t.errorsContainer, !0))
        }
        this.isValid = !1, o.elems.forEach((e => {
            var i, t;
            Object.assign(e.style, (null == (i = o.config) ? void 0 : i.errorFieldStyle) || this.globalConfig.errorFieldStyle), e.classList.add(...u((null == (t = o.config) ? void 0 : t.errorFieldCssClass) || this.globalConfig.errorFieldCssClass))
        }));
        const a = this.createErrorLabelElem(e, o.errorMessage, o.config);
        this.renderGroupLabel(o.groupElem, a, null == (s = o.config) ? void 0 : s.errorsContainer), this.isTooltip() && this.tooltips.push(this.renderTooltip(o.groupElem, a, null == (r = null == (l = o.config) ? void 0 : l.tooltip) ? void 0 : r.position))
    }
    renderErrors(e = !1) {
        if (this.isSubmitted || e || this.globalConfig.validateBeforeSubmitting) {
            this.clearErrors(), this.isValid = !0;
            for (const e in this.groupFields) this.renderGroupError(e);
            for (const e in this.fields) this.renderFieldError(e)
        }
    }
    destroy() {
        this.eventListeners.forEach((e => {
            this.removeListener(e.type, e.elem, e.func)
        })), Object.keys(this.customStyleTags).forEach((e => {
            this.customStyleTags[e].remove()
        })), this.clearErrors(), this.globalConfig.lockForm && this.unlockForm()
    }
    refresh() {
        this.destroy(), this.form ? (this.initialize(this.form, this.globalConfig), Object.keys(this.fields).forEach((e => {
            const i = this.getFieldSelectorByKey(e);
            i && this.addField(i, [...this.fields[e].rules], this.fields[e].config)
        }))) : console.error("Cannot initialize the library! Form is not defined")
    }
    setCurrentLocale(e) {
        "string" == typeof e || void 0 === e ? (this.currentLocale = e, this.isSubmitted && this.validate()) : console.error("Current locale should be a string")
    }
    onSuccess(e) {
        return this.onSuccessCallback = e, this
    }
    onFail(e) {
        return this.onFailCallback = e, this
    }
    onValidate(e) {
        return this.onValidateCallback = e, this
    }
}
export {
    g as J
};
//# sourceMappingURL=justvalidation.js.map