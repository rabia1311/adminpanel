const Category=require("../Models/Category");
const createCategory = async (req, res) => {
    try {
        const image = req.file.filename;
        const newCategory=new Category({
            ...req.body,
            image,
        });
        const savedCategory = await newCategory.save();
        res.status(201).json({
            success: true,
            message: "Category added successfully.",
            data: savedCategory,
        })