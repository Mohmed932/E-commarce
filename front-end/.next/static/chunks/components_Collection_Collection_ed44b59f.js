(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/Collection/Collection.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>NewArrivalsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const categories = [
    "رجالي",
    "نسائي",
    "أطفال"
];
const products = [
    {
        name: "بنطال جينز رجالي ضيق",
        price: "$49.99",
        image: "https://townteam.com/cdn/shop/files/TST25SSPT15004TM1-Beige-2_1880x.jpg",
        category: "رجالي",
        colors: [
            "#f0e0ee",
            "#000000"
        ]
    },
    {
        name: "فستان صيفي نسائي",
        price: "$39.99",
        image: "https://townteam.com/cdn/shop/files/TSH25WPRO35002TB1-OFFWHIT-2_1880x.jpg",
        category: "نسائي",
        colors: [
            "#f0e0ee",
            "#fff5e5"
        ]
    },
    {
        name: "تيشيرت أطفال بطبعة",
        price: "$19.99",
        image: "https://townteam.com/cdn/shop/files/TST25SSNP15028TB1-Orange-6_1880x.jpg",
        category: "أطفال",
        colors: [
            "#f0e0ee",
            "#ff9900"
        ]
    },
    {
        name: "قميص رجالي كاجوال",
        price: "$34.99",
        image: "https://townteam.com/cdn/shop/files/TSH25SPRO20525TM1-Black_1880x.jpg",
        category: "رجالي",
        colors: [
            "#f0e0ee",
            "#333333"
        ]
    },
    {
        name: "ليجن يوغا نسائي",
        price: "$29.99",
        image: "https://townteam.com/cdn/shop/files/SSH25SXIR31146TB1-Blue-2_1880x.jpg",
        category: "نسائي",
        colors: [
            "#f0e0ee",
            "#3366cc"
        ]
    },
    {
        name: "جاكيت جينز أطفال",
        price: "$39.99",
        image: "https://townteam.com/cdn/shop/files/TSH25SPRS32741TB1-Green-3_1880x.jpg",
        category: "أطفال",
        colors: [
            "#f0e0ee",
            "#00cc66"
        ]
    }
];
function NewArrivalsPage() {
    _s();
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const filteredProducts = selectedCategory ? products.filter((product)=>product.category === selectedCategory) : products;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 sm:p-8 bg-[#f1f1f2] min-h-screen w-3/5 max-lg:w-full",
            dir: "rtl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl sm:text-3xl font-bold mb-4",
                    children: "وصل حديثًا"
                }, void 0, false, {
                    fileName: "[project]/components/Collection/Collection.js",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2 sm:gap-4 mb-6",
                    children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            className: `rounded-full border-2 text-sm sm:text-base ${selectedCategory === category ? "bg-orange-500 text-white border-orange-500" : "bg-white text-black border-gray-300"}`,
                            onClick: ()=>setSelectedCategory(selectedCategory === category ? null : category),
                            children: category
                        }, category, false, {
                            fileName: "[project]/components/Collection/Collection.js",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Collection/Collection.js",
                    lineNumber: 69,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6",
                    children: filteredProducts.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 text-right",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl overflow-hidden shadow-md bg-white relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: product.image,
                                        alt: product.name,
                                        width: 300,
                                        height: 300,
                                        className: "object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Collection/Collection.js",
                                        lineNumber: 93,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Collection/Collection.js",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm font-medium text-black truncate",
                                    children: product.name
                                }, void 0, false, {
                                    fileName: "[project]/components/Collection/Collection.js",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-600",
                                    children: product.price
                                }, void 0, false, {
                                    fileName: "[project]/components/Collection/Collection.js",
                                    lineNumber: 102,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/components/Collection/Collection.js",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/Collection/Collection.js",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Collection/Collection.js",
            lineNumber: 65,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Collection/Collection.js",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(NewArrivalsPage, "RgHDLEuJ1Ja2GayX64Y/niiK+6s=");
_c = NewArrivalsPage;
var _c;
__turbopack_context__.k.register(_c, "NewArrivalsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=components_Collection_Collection_ed44b59f.js.map