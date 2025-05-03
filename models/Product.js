import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hex: {
    type: String,
    required: true,
    trim: true,
    match: [/^#([0-9A-F]{6}|[0-9A-F]{3})$/i, "Invalid hex color code"],
  },
  image: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (url) => /^\/[^\s$.?#].[^\s]*$/.test(url),
      message: "Invalid image path",
    },
  },
});

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    maSanPham: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^[A-Za-z0-9_-]+$/, "Mã sản phẩm chỉ được chứa chữ cái, số, dấu gạch dưới hoặc gạch ngang"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    maxPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discount price cannot exceed regular price",
      },
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    categoryNameVN: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    colors: [colorSchema],
    image: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (url) => /^\/[^\s$.?#].[^\s]*$/.test(url),
        message: "Invalid image path",
      },
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      min: 0,
    },
    material: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ id: 1 }, { unique: true });
productSchema.index({ maSanPham: 1 }, { unique: true });
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ category: 1 });

let Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;