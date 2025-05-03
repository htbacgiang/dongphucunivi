import db from "../../../utils/db";
import Products from "../../../models/Product";

export default async (req, res) => {
  try {
    await db.connectDb();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ err: 'Database connection failed' });
  }

  switch (req.method) {
    case "GET":
      if (req.query.id) {
        await getProductById(req, res);
      } else if (req.query.maxId) {
        await getMaxId(req, res);
      } else {
        await getProducts(req, res);
      }
      break;
    case "POST":
      if (req.body.action === 'checkSlug') {
        await checkSlug(req, res);
      } else {
        await createProduct(req, res);
      }
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
    default:
      res.status(405).json({ err: "Method not allowed" });
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Products.find(filter);
    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ err: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.query.id);
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    res.json({
      status: "success",
      product,
    });
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return res.status(500).json({ err: err.message });
  }
};

const getMaxId = async (req, res) => {
  try {
    const maxIdProduct = await Products.findOne().sort({ id: -1 }).select('id');
    const maxId = maxIdProduct ? maxIdProduct.id : 0;
    res.json({
      status: "success",
      maxId,
    });
  } catch (err) {
    console.error('Error fetching max ID:', err);
    return res.status(500).json({ err: err.message });
  }
};

const checkSlug = async (req, res) => {
  try {
    const { slug, id } = req.body;
    const query = { slug };
    if (id) {
      query._id = { $ne: id }; // Exclude the product with this id
    }
    const existingProduct = await Products.findOne(query);
    if (existingProduct) {
      return res.status(400).json({ err: 'Slug đã tồn tại' });
    }
    res.json({ status: 'success' });
  } catch (err) {
    console.error('Error checking slug:', err);
    return res.status(500).json({ err: err.message });
  }
};

const createProduct = async (req, res) => {
  const session = await Products.startSession();
  try {
    session.startTransaction();
    
    // Generate a new unique id
    const maxIdProduct = await Products.findOne().sort({ id: -1 }).select('id').session(session);
    const newId = (maxIdProduct ? maxIdProduct.id : 0) + 1;
    
    // Check if the id already exists (extra safety)
    const existingProductById = await Products.findOne({ id: newId }).session(session);
    if (existingProductById) {
      await session.abortTransaction();
      return res.status(400).json({ err: 'Mã sản phẩm (ID) đã tồn tại' });
    }
    
    // Check if maSanPham already exists
    const { maSanPham } = req.body;
    const existingProductByMaSanPham = await Products.findOne({ maSanPham }).session(session);
    if (existingProductByMaSanPham) {
      await session.abortTransaction();
      return res.status(400).json({ err: 'Mã sản phẩm (maSanPham) đã tồn tại' });
    }
    
    const productData = { ...req.body, id: newId };
    const product = new Products(productData);
    await product.save({ session });
    
    await session.commitTransaction();
    res.json({
      status: "success",
      product,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error('Error creating product:', err);
    if (err.code === 11000) {
      if (err.keyPattern.id) {
        return res.status(400).json({ err: 'Mã sản phẩm (ID) đã tồn tại, vui lòng thử lại' });
      }
      if (err.keyPattern.maSanPham) {
        return res.status(400).json({ err: 'Mã sản phẩm (maSanPham) đã tồn tại, vui lòng thử lại' });
      }
      if (err.keyPattern.slug) {
        return res.status(400).json({ err: 'Slug đã tồn tại, vui lòng thử lại' });
      }
    }
    return res.status(500).json({ err: err.message });
  } finally {
    session.endSession();
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, maSanPham } = req.body;
    
    // Check if the id is being changed to an existing one
    if (id) {
      const existingProductById = await Products.findOne({ id, _id: { $ne: req.query.id } });
      if (existingProductById) {
        return res.status(400).json({ err: 'Mã sản phẩm (ID) đã tồn tại' });
      }
    }
    
    // Check if maSanPham is being changed to an existing one
    if (maSanPham) {
      const existingProductByMaSanPham = await Products.findOne({ maSanPham, _id: { $ne: req.query.id } });
      if (existingProductByMaSanPham) {
        return res.status(400).json({ err: 'Mã sản phẩm (maSanPham) đã tồn tại' });
      }
    }
    
    const product = await Products.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    res.json({
      status: "success",
      product,
    });
  } catch (err) {
    console.error('Error updating product:', err);
    if (err.code === 11000) {
      if (err.keyPattern.id) {
        return res.status(400).json({ err: 'Mã sản phẩm (ID) đã tồn tại, vui lòng thử lại' });
      }
      if (err.keyPattern.maSanPham) {
        return res.status(400).json({ err: 'Mã sản phẩm (maSanPham) đã tồn tại, vui lòng thử lại' });
      }
      if (err.keyPattern.slug) {
        return res.status(400).json({ err: 'Slug đã tồn tại, vui lòng thử lại' });
      }
    }
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.query.id);
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    res.json({
      status: "success",
      message: "Product deleted",
    });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ err: err.message });
  }
};