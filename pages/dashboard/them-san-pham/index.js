import React, { useReducer, useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../../components/layout/AdminLayout';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Editor from '../../../components/univisport/Editor';
import { debounce } from 'lodash';

// Vietnamese to ASCII for slug generation
const vietnameseToAscii = (str) => {
  const vietnameseMap = {
    ' salespeople, as well as for other occupations such as real estate brokers, insurance agents, and securities dealers. It includes sales engineers, wholesale and manufacturing sales representatives, and retail salespeople.': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
    'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
    'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
    'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
    'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
    'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
    'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
    'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
    'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
    'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
    'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
    'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
    'đ': 'd',
    'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
    'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
    'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
    'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
    'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
    'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
    'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
    'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
    'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
    'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
    'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
    'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
    'Đ': 'D',
  };
  return str.replace(/./g, (char) => vietnameseMap[char] || char);
};

// Generate slug from title
const generateSlug = (title) =>
  vietnameseToAscii(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Transform Cloudinary URL to relative path
const toRelativePath = (url) => {
  const parts = url.split('/');
  const versionIndex = parts.findIndex((part) => part.startsWith('v') && !isNaN(part.slice(1)));
  if (versionIndex !== -1 && parts[versionIndex - 1] === 'upload') {
    const baseIndex = parts.findIndex((p) => p === 'image');
    return '/' + parts.slice(baseIndex).join('/');
  }
  return url.startsWith('/') ? url : `/${url.split('/').pop()}`;
};

// Transform relative path to full Cloudinary URL
const toCloudinaryUrl = (relativePath) => {
  if (!relativePath) return '';
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `https://res.cloudinary.com/dcgtt1jza/${cleanPath}`;
};

// Initial state
const initialState = {
  id: null,
  maSanPham: '',
  name: '',
  image: '',
  slug: '',
  content: '',
  description: '',
  category: '',
  categoryNameVN: '',
  material: '',
  price: 0,
  originalPrice: 0,
  isNew: false,
  isFeatured: false,
  rating: 0,
  reviewCount: 0,
  colors: [],
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_PRODUCT':
      return { ...action.payload };
    case 'SET_COLORS':
      return { ...state, colors: action.colors };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Categories
const categories = [
  { categoryNameVN: 'Đồng phục Gym', category: 'dong-phuc-gym' },
  { categoryNameVN: 'Đồng phục Pickleball', category: 'dong-phuc-pickleball' },
  { categoryNameVN: 'Đồng phục Yoga – Pilates', category: 'dong-phuc-yoga-pilates' },
  { categoryNameVN: 'Đồng phục Chạy bộ', category: 'dong-phuc-chay-bo' },
  { categoryNameVN: 'Đồng phục Lễ tân', category: 'dong-phuc-le-tan' },
  { categoryNameVN: 'Đồng phục MMA', category: 'dong-phuc-mma' },
  { categoryNameVN: 'Đồng phục áo Polo', category: 'dong-phuc-ao-polo' },
  { categoryNameVN: 'Đồng phục áo thun', category: 'dong-phuc-ao-thun' },
  { categoryNameVN: 'Đồng phục công sở', category: 'dong-phuc-cong-so' },
  { categoryNameVN: 'Đồng phục Team building', category: 'dong-phuc-team-building' },
  { categoryNameVN: 'Đồng phục Sự kiện', category: 'dong-phuc-su-kien' },
];

export default function CreateProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [cloudinaryImages, setCloudinaryImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newProductId, setNewProductId] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Sync colors with all images
  useEffect(() => {
    dispatch({
      type: 'SET_COLORS',
      colors: images.map((img, idx) => ({
        name: img.name || `Màu ${idx + 1}`,
        hex: img.color || '#000000',
        image: toRelativePath(img.src || img.preview),
      })),
    });
  }, [images]);

  // Clean up blob URLs
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview?.startsWith('blob:')) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  // Real-time slug validation
  const debouncedCheckSlug = useCallback(
    debounce(async (slug, productId) => {
      try {
        const response = await axios.post('/api/products', { action: 'checkSlug', slug, id: productId });
        if (response.data.status !== 'success') {
          setErrors((prev) => [...prev, 'Slug đã tồn tại, vui lòng chọn slug khác']);
          toast.error('Slug đã tồn tại');
        } else {
          setErrors((prev) => prev.filter((err) => err !== 'Slug đã tồn tại, vui lòng chọn slug khác'));
        }
      } catch (error) {
        setErrors((prev) => [...prev, 'Không thể kiểm tra slug']);
        toast.error('Không thể kiểm tra slug');
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (formData.slug && (!id || formData.slug !== originalSlug)) {
      debouncedCheckSlug(formData.slug, id);
    }
    return () => debouncedCheckSlug.cancel();
  }, [formData.slug, id, originalSlug, debouncedCheckSlug]);

  // Fetch product for editing
  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/api/products?id=${id}`);
      const product = response.data.product || {};
      const selCat = categories.find((c) => c.category === product.category) || {};

      const mainImage = product.image || '';
      const colorImages = (product.colors || []).map((c, idx) => ({
        src: c.image || '',
        preview: toCloudinaryUrl(c.image) || '',
        color: c.hex || '#000000',
        name: c.name || `Màu ${idx + 1}`,
      }));

      const allImages = mainImage
        ? [
            { src: mainImage, preview: toCloudinaryUrl(mainImage), color: '#000000', name: 'Màu 1' },
            ...colorImages.map((img, idx) => ({ ...img, name: `Màu ${idx + 2}` })),
          ]
        : colorImages;

      dispatch({
        type: 'SET_PRODUCT',
        payload: {
          id: product.id || null,
          maSanPham: product.maSanPham || '',
          name: product.name || '',
          image: mainImage,
          slug: product.slug || '',
          content: product.content || '',
          description: product.description || '',
          category: product.category || '',
          categoryNameVN: selCat.categoryNameVN || product.categoryNameVN || '',
          price: product.price || 0,
          originalPrice: product.originalPrice || 0,
          isNew: product.isNew || false,
          isFeatured: product.isFeatured || false,
          material: product.material || '',
          rating: product.rating || 0,
          reviewCount: product.reviewCount || 0,
          colors: allImages.map((img, idx) => ({
            name: img.name || `Màu ${idx + 1}`,
            hex: img.color || '#000000',
            image: toRelativePath(img.src),
          })),
        },
      });

      setImages(allImages);
      setIsSlugEdited(true);
      setOriginalSlug(product.slug || '');
    } catch (err) {
      console.error('Error fetching product:', err);
      setErrors((prev) => [...prev, 'Không thể tải sản phẩm']);
      toast.error('Không thể tải sản phẩm');
    }
  }, [id]);

  // Fetch Cloudinary images
  const fetchCloudinaryImages = useCallback(async () => {
    try {
      const res = await axios.get('/api/image');
      setCloudinaryImages(res.data.images.map((img) => img.src));
    } catch (err) {
      setErrors((prev) => [...prev, 'Không thể tải danh sách ảnh']);
      toast.error('Không thể tải danh sách ảnh');
    }
  }, []);

  useEffect(() => {
    if (id) fetchProduct();
    fetchCloudinaryImages();
  }, [id, fetchProduct, fetchCloudinaryImages]);

  // Handle name change
  const handleNameChange = (e) => {
    const name = e.target.value;
    dispatch({ type: 'UPDATE_FIELD', field: 'name', value: name });
    if (!isSlugEdited) {
      dispatch({ type: 'UPDATE_FIELD', field: 'slug', value: generateSlug(name) });
    }
  };

  // Handle slug change
  const handleSlugChange = (e) => {
    setIsSlugEdited(true);
    dispatch({ type: 'UPDATE_FIELD', field: 'slug', value: e.target.value });
  };

  // Handle maSanPham change
  const handleMaSanPhamChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', field: 'maSanPham', value: e.target.value });
  };

  // Handle description change
  const handleDescriptionChange = (e) => {
    dispatch({ type: 'UPDATE_FIELD', field: 'description', value: e.target.value });
  };

  // Handle content change
  const handleContentChange = (content) => {
    const sanitizedContent = typeof content === 'string' ? content : '';
    dispatch({ type: 'UPDATE_FIELD', field: 'content', value: sanitizedContent });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat.category === e.target.value);
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'category',
      value: e.target.value,
    });
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'categoryNameVN',
      value: selectedCategory ? selectedCategory.categoryNameVN : '',
    });
  };

  // Handle image drop and upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple: true,
    maxSize: 5 * 1024 * 1024,
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setErrors((prev) => [...prev, 'Chỉ hỗ trợ file JPEG, JPG, PNG, WEBP dưới 5MB']);
        toast.error('Chỉ hỗ trợ file JPEG, JPG, PNG, WEBP dưới 5MB');
        return;
      }
      setErrors((prev) => prev.filter((err) => err !== 'Chỉ hỗ trợ file JPEG, JPG, PNG, WEBP dưới 5MB'));

      const newImages = acceptedFiles.map((file, idx) => ({
        src: '',
        preview: URL.createObjectURL(file),
        color: '#000000',
        name: `Màu ${images.length + idx + 1}`,
        file,
      }));
      setImages([...images, ...newImages]);

      setUploading(true);
      try {
        const uploadFormData = new FormData();
        acceptedFiles.forEach((file) => uploadFormData.append('image', file));
        const response = await axios.post('/api/image?multiple=true', uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const uploadedUrls = response.data.src;

        let urlIndex = 0;
        setImages((prev) =>
          prev.map((img) => {
            if (img.file) {
              const newSrc = uploadedUrls[urlIndex++];
              return { ...img, src: newSrc, preview: newSrc, file: null };
            }
            return img;
          })
        );
      } catch (error) {
        console.error('Error uploading images:', error.response?.data || error.message);
        setErrors((prev) => [...prev, 'Không thể upload ảnh']);
        toast.error('Không thể upload ảnh');
        setImages((prev) => prev.filter((img) => !img.file));
      } finally {
        setUploading(false);
      }
    },
  });

  // Handle Cloudinary image selection
  const handleSelectImage = (src) => {
    if (!images.some((img) => img.src === src)) {
      setImages([...images, { src, preview: src, color: '#000000', name: `Màu ${images.length + 1}` }]);
    }
    setIsModalOpen(false);
  };

  // Check slug availability
  const checkSlug = async (slug, productId = null) => {
    try {
      const response = await axios.post('/api/products', { action: 'checkSlug', slug, id: productId });
      return response.data.status === 'success';
    } catch (error) {
      console.error('Error checking slug:', error.response?.data || error.message);
      setErrors((prev) => [...prev, 'Không thể kiểm tra slug']);
      toast.error('Không thể kiểm tra slug');
      return false;
    }
  };

  // Reset form
  const resetForm = () => {
    dispatch({ type: 'RESET' });
    images.forEach((img) => {
      if (img.preview?.startsWith('blob:')) URL.revokeObjectURL(img.preview);
    });
    setImages([]);
    setIsSlugEdited(false);
    setOriginalSlug('');
    setErrors([]);
    setNewProductId(null);
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const img = images[index];
    if (img.preview?.startsWith('blob:')) {
      URL.revokeObjectURL(img.preview);
    }
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle color name change
  const handleColorNameChange = (index, value) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, name: value } : img))
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    try {
      // Client-side validation
      if (!formData.name) {
        setErrors((prev) => [...prev, 'Tên sản phẩm là bắt buộc']);
        toast.error('Tên sản phẩm là bắt buộc');
        setIsSubmitting(false);
        return;
      }
      if (!formData.maSanPham) {
        setErrors((prev) => [...prev, 'Mã sản phẩm là bắt buộc']);
        toast.error('Mã sản phẩm là bắt buộc');
        setIsSubmitting(false);
        return;
      }
      if (!/^[A-Za-z0-9_-]+$/.test(formData.maSanPham)) {
        setErrors((prev) => [...prev, 'Mã sản phẩm chỉ được chứa chữ cái, số, dấu gạch dưới hoặc gạch ngang']);
        toast.error('Mã sản phẩm chỉ được chứa chữ cái, số, dấu gạch dưới hoặc gạch ngang');
        setIsSubmitting(false);
        return;
      }
      if (!formData.slug) {
        setErrors((prev) => [...prev, 'Slug là bắt buộc']);
        toast.error('Slug là bắt buộc');
        setIsSubmitting(false);
        return;
      }
      if (!formData.category) {
        setErrors((prev) => [...prev, 'Danh mục là bắt buộc']);
        toast.error('Danh mục là bắt buộc');
        setIsSubmitting(false);
        return;
      }
      if (!formData.categoryNameVN) {
        setErrors((prev) => [...prev, 'Tên danh mục là bắt buộc']);
        toast.error('Tên danh mục là bắt buộc');
        setIsSubmitting(false);
        return;
      }
      if (!formData.description) {
        setErrors((prev) => [...prev, 'Mô tả là bắt buộc']);
        toast.error('Mô tả là bắt buộc');
        setIsSubmitting(false);
        return;
      }
      if (!images.length) {
        setErrors((prev) => [...prev, 'Vui lòng tải lên ít nhất một ảnh sản phẩm']);
        toast.error('Vui lòng tải lên ít nhất một ảnh sản phẩm');
        setIsSubmitting(false);
        return;
      }
      if (formData.price < 0 || formData.originalPrice < 0) {
        setErrors((prev) => [...prev, 'Giá không được âm']);
        toast.error('Giá không được âm');
        setIsSubmitting(false);
        return;
      }
      if (formData.rating < 0 || formData.rating > 5) {
        setErrors((prev) => [...prev, 'Đánh giá phải từ 0 đến 5']);
        toast.error('Đánh giá phải từ 0 đến 5');
        setIsSubmitting(false);
        return;
      }
      if (formData.reviewCount < 0) {
        setErrors((prev) => [...prev, 'Số lượng đánh giá không được âm']);
        toast.error('Số lượng đánh giá không được âm');
        setIsSubmitting(false);
        return;
      }

      // Ensure all images are uploaded
      const uploadedUrls = images.map((img) => img.src).filter(Boolean);
      if (uploadedUrls.length !== images.length) {
        setErrors((prev) => [...prev, 'Vui lòng chờ tất cả ảnh được tải lên']);
        toast.error('Vui lòng chờ tất cả ảnh được tải lên');
        setIsSubmitting(false);
        return;
      }

      // Construct product data
      const mainImage = images[0]; // First image is the main image
      const productData = {
        name: formData.name,
        maSanPham: formData.maSanPham,
        image: toRelativePath(mainImage.src),
        slug: formData.slug,
        content: formData.content,
        description: formData.description,
        category: formData.category,
        categoryNameVN: formData.categoryNameVN,
        price: formData.price,
        originalPrice: formData.originalPrice,
        isNew: formData.isNew,
        material: formData.material,
        isFeatured: formData.isFeatured,
        rating: formData.rating,
        reviewCount: formData.reviewCount,
        colors: images.map((img, idx) => ({
          name: img.name || `Màu ${idx + 1}`,
          hex: img.color || '#000000',
          image: toRelativePath(img.src),
        })),
      };

      if (id) {
        productData.id = formData.id;
      }

      console.log('Sending productData:', productData);

      // Validate slug
      let isSlugValid = true;
      if (!id || formData.slug !== originalSlug) {
        isSlugValid = await checkSlug(formData.slug, id);
        if (!isSlugValid) {
          setErrors((prev) => [...prev, 'Slug đã tồn tại, vui lòng chọn slug khác']);
          toast.error('Slug đã tồn tại, vui lòng chọn slug khác');
          setIsSubmitting(false);
          return;
        }
      }

      // Submit to backend
      if (id) {
        await axios.put(`/api/products?id=${id}`, productData);
        toast.success('Sản phẩm đã được cập nhật thành công!', {
          position: 'top-right',
          autoClose: 3000,
        });
        router.push('/dashboard/san-pham');
      } else {
        const response = await axios.post('/api/products', productData);
        if (response.data.status === 'success') {
          setNewProductId(response.data.product.id);
          toast.success(`Sản phẩm đã được thêm thành công! Mã sản phẩm (ID): ${response.data.product.id}, Mã sản phẩm: ${response.data.product.maSanPham}`, {
            position: 'top-right',
            autoClose: 3000,
          });
          resetForm();
        } else {
          throw new Error(response.data.err || 'Không thể tạo sản phẩm');
        }
      }
    } catch (error) {
      console.error('API error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.err || 'Không thể lưu sản phẩm.';
      if (errorMessage.includes('maSanPham')) {
        setErrors((prev) => [...prev, 'Mã sản phẩm đã tồn tại, vui lòng chọn mã khác']);
        toast.error('Mã sản phẩm đã tồn tại');
      } else if (errorMessage.includes('slug')) {
        setErrors((prev) => [...prev, 'Slug đã tồn tại, vui lòng chọn slug khác']);
        toast.error('Slug đã tồn tại');
      } else {
        setErrors((prev) => [...prev, errorMessage]);
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout title={id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}>
      <div className="p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
          {id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
        </h2>

        {errors.length > 0 && (
          <div className="mb-4">
            {errors.map((error, idx) => (
              <div key={idx} className="text-red-500">
                {error}
              </div>
            ))}
          </div>
        )}

        {newProductId && !id && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded">
            Sản phẩm đã được tạo với mã sản phẩm (ID): <strong>{newProductId}</strong>, mã sản phẩm: <strong>{formData.maSanPham}</strong>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-full">
          {id && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Mã sản phẩm (ID)</label>
              <input
                type="text"
                value={formData.id || ''}
                readOnly
                className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-slate-600 text-black dark:text-white cursor-not-allowed"
                aria-label="Mã sản phẩm (ID)"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Mã sản phẩm</label>
            <input
              type="text"
              value={formData.maSanPham}
              onChange={handleMaSanPhamChange}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
              required
              placeholder="Ví dụ: SP001"
              aria-label="Mã sản phẩm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Tên sản phẩm</label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
              required
              aria-label="Tên sản phẩm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={handleSlugChange}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
              required
              aria-label="Slug sản phẩm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Mô tả</label>
            <textarea
              value={formData.description}
              onChange={handleDescriptionChange}
              className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
              rows={3}
              placeholder="Nhập mô tả sản phẩm"
              required
              aria-label="Mô tả sản phẩm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Hình ảnh</label>
            <div className="flex gap-2 mb-2">
              <div className="flex-1">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-slate-600' : 'border-gray-300 dark:border-slate-600'
                    }`}
                  role="button"
                  aria-label="Tải lên hoặc thả hình ảnh"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      document.querySelector('input[type="file"]').click();
                    }
                  }}
                >
                  <input {...getInputProps()} />
                  <p className="text-lg font-semibold text-black dark:text-white">
                    Thả tập tin vào đây hoặc nhấp để tải lên (hỗ trợ nhiều ảnh).
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    (Chỉ hỗ trợ JPEG, JPG, PNG, WEBP dưới 5MB mỗi file.)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-[#105d97] text-white px-4 py-2 rounded hover:bg-[#245a83]"
              >
                Chọn ảnh đã upload
              </button>
            </div>
            {uploading && <div className="text-blue-500 mb-2">Đang tải ảnh...</div>}
            <div className="mt-5 flex flex-wrap gap-5 overflow-x-auto">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-24 h-32 border rounded bg-gray-50 dark:bg-slate-700"
                >
                  <img
                    src={img.preview}
                    alt={`Ảnh ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-0 w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full shadow-xl border-2 border-white dark:border-gray-800 -translate-y-1/2 translate-x-3/4 hover:bg-red-700 transition-all"
                    aria-label={`Xóa ảnh ${index + 1}`}
                  >
                    <span className="sr-only">Xóa</span>
                    <span className="text-xl font-bold">×</span>
                  </button>
                  <input
                    type="color"
                    value={img.color || '#000000'}
                    onChange={(e) => {
                      setImages((prev) =>
                        prev.map((p, i) => (i === index ? { ...p, color: e.target.value } : p))
                      );
                    }}
                    className="absolute bottom-8 left-1 w-8 h-8 border rounded-full"
                    aria-label={`Chọn màu cho ảnh ${index + 1}`}
                  />
                  <input
                    type="text"
                    value={img.name || `Màu ${index + 1}`}
                    onChange={(e) => handleColorNameChange(index, e.target.value)}
                    className="absolute bottom-1 left-1 w-20 text-sm bg-white dark:bg-slate-700 text-black dark:text-white border rounded"
                    aria-label={`Tên màu cho ảnh ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Chọn danh mục</label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
                required
                aria-label="Danh mục sản phẩm"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category}>
                    {cat.categoryNameVN}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Chất liệu</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'material', value: e.target.value })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
                placeholder="Chất liệu (ví dụ: Cotton, Polyester)"
                aria-label="Chất liệu"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Giá bán</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'price', value: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
                min="0"
                placeholder="Giá bán"
                required
                aria-label="Giá bán"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Giá gốc</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'originalPrice', value: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
                min="0"
                placeholder="Giá gốc"
                aria-label="Giá gốc"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Sản phẩm mới</label>
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'isNew', value: e.target.checked })}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                aria-label="Sản phẩm mới"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Sản phẩm nổi bật</label>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'isFeatured', value: e.target.checked })}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                aria-label="Sản phẩm nổi bật"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Đánh giá (0-5)</label>
              <input
                type="number"
                value={formData.rating}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'rating', value: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
                min="0"
                max="5"
                step="0.1"
                aria-label="Đánh giá"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm font-medium mb-1 text-black dark:text-white">Số lượng đánh giá</label>
              <input
                type="number"
                value={formData.reviewCount}
                onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'reviewCount', value: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-700 text-black dark:text-white"
                min="0"
                aria-label="Số lượng đánh giá"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black dark:text-white">Nội dung</label>
            <Editor
              content={formData.content || ''}
              onChange={handleContentChange}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="bg-gray-300 dark:bg-slate-600 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-slate-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={uploading || isSubmitting}
              className={`bg-[#105d97] text-white px-4 py-2 rounded hover:bg-blue-600 ${uploading || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {uploading ? 'Đang upload...' : isSubmitting ? 'Đang xử lý...' : id ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg w-full max-w-4xl">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Chọn ảnh đã tải lên</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                {cloudinaryImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Cloudinary image ${index + 1}`}
                    className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80"
                    onClick={() => handleSelectImage(src)}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 dark:bg-slate-600 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-slate-500"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </AdminLayout>
  );
}