import { Product } from "../../models/product.js";

export const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(400).json({ error: "كلمة البحث مطلوبة" });
        }

        const products = await Product.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "حدث خطأ أثناء البحث", details: err.message });
    }
} 

