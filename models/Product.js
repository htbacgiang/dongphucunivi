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
    match: [/^#([0-9A-F]{6}|[0-9A-F]{3}|[0-9A-F]{8})$/i, "Invalid hex color code"],
  },
  image: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (url) => /^\/[^/\s]+\.[a-zA-Z]{2,4}$/.test(url),
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
      match: [/^[A-Za-z0-9_-]+$/, "Product code must contain only letters, numbers, underscores, or hyphens"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
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
        validator: (url) => /^\/[^/\s]+\.[a-zA-Z]{2,4}$/.test(url),
        message: "Invalid image path",
      },
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    unit: {
      type: String,
      required: true,
      trim: true,
      default: "Kg",
      enum: {
        values: ["Kg", "gam", "túi", "chai"],
        message: "Unit must be one of: Kg, gam, túi, chai",
      },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    material: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure case-insensitive uniqueness for maSanPham and slug
productSchema.pre("save", function (next) {
  this.maSanPham = this.maSanPham.toLowerCase();
  this.slug = this.slug.toLowerCase();
  next();
});

// Indexes
productSchema.index({ id: 1 }, { unique: true });
productSchema.index({ maSanPham: 1 }, { unique: true });
productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ isNew: 1 });
productSchema.index({ isFeatured: 1 });

let Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;