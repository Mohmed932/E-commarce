module.exports = {

"[project]/components/activeAccount/ActiveAccount.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$auth$2f$active_account$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/redux/slices/auth/active_account.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const ActiveAccount = ()=>{
    const accountId = "6839ed9f9576d2a0f6475667";
    const activeAccountId = "4d12de6d651589081e6a23138d0040117cc10021ae2b2f24d8297564f52ad2c1";
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    useEffect(()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$redux$2f$slices$2f$auth$2f$active_account$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleActiveAccount"])({
            accountId,
            activeAccountId
        }));
    }, [
        dispatch,
        accountId,
        activeAccountId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "ActiveAccount"
    }, void 0, false, {
        fileName: "[project]/components/activeAccount/ActiveAccount.js",
        lineNumber: 14,
        columnNumber: 9
    }, this);
};
const __TURBOPACK__default__export__ = ActiveAccount;
}}),

};

//# sourceMappingURL=components_activeAccount_ActiveAccount_110d95eb.js.map