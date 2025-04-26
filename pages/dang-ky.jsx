import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { getCsrfToken, getSession } from "next-auth/react";
import Router from "next/router";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Image from "next/image";

// Schema validation với Yup
const signupValidation = Yup.object({
  username: Yup.string()
    .required("Vui lòng nhập tên người dùng.")
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự."),
  email: Yup.string()
    .required("Vui lòng nhập địa chỉ email.")
    .email("Vui lòng nhập địa chỉ email chính xác."),
  phone: Yup.string()
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})\b$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
  confirm_password: Yup.string()
    .required("Vui lòng xác nhận mật khẩu.")
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp."),
  agree: Yup.boolean()
    .required("Bạn phải đồng ý với Điều khoản & Chính sách bảo mật.")
    .oneOf([true], "Bạn phải đồng ý với Điều khoản & Chính sách bảo mật."),
});

export default function Signup({ csrfToken, meta }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://greenlahome.vn";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const signUpHandler = async (values, setSubmitting) => {
    try {
      setStatus("Đang đăng ký...");
      console.log("Submitting signup:", values); // Debug
      const { data } = await axios.post(`${baseUrl}/api/auth/signup`, {
        name: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
        conf_password: values.confirm_password,
        agree: values.agree,
      });
      console.log("Signup response:", data); // Debug
      setSuccess(data.message);
      setError("");
      setStatus("Đăng ký thành công!");
      toast.success("Đăng ký thành công!");
      setSubmitting(false);
      setTimeout(() => {
        Router.push("/dang-nhap");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setStatus("");
      setSuccess("");
      setError(error.response?.data?.message || "Đã xảy ra lỗi.");
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi.");
      setSubmitting(false);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Đăng ký tài khoản - GreenLa Home",
    "description": "Đăng ký tài khoản tại GreenLa Home để trải nghiệm dịch vụ nội thất cao cấp và nhận ưu đãi độc quyền.",
    "url": "https://greenlahome.vn/dang-ky",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://greenlahome.vn/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Đăng ký",
          "item": "https://greenlahome.vn/dang-ky"
        }
      ]
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <section className="min-h-screen flex items-center justify-center relative">
        {/* Background Image with Next.js Image */}
        <Image
          src="/banner3.jpg"
          alt="Nội thất GreenLa Home - Đăng ký tài khoản"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-70" />

        <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md relative z-10 opacity-90">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Đăng ký</h1>

          <Formik
            initialValues={{
              username: "",
              email: "",
              phone: "",
              password: "",
              confirm_password: "",
              agree: false,
            }}
            validationSchema={signupValidation}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form values:", values); // Debug
              if (!values.agree) {
                toast.error("Bạn phải đồng ý với Điều khoản & Chính sách bảo mật.");
                setSubmitting(false);
                return;
              }
              signUpHandler(values, setSubmitting);
            }}
          >
            {({ values, setFieldValue, handleChange, errors, touched, isSubmitting }) => (
              <Form className="space-y-6" aria-label="Form đăng ký tài khoản">
                <input type="hidden" name="csrfToken" defaultValue={csrfToken} />

                {/* Username */}
                <div className="relative">
                  <label htmlFor="username" className="block text-white text-sm mb-2">
                    Họ và tên <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800 gap-4">
                    <span className="pl-3 text-orange-500">
                      <FaUser aria-hidden="true" />
                    </span>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Tên người dùng"
                      required
                      aria-describedby={errors.username && touched.username ? "username-error" : null}
                    />
                  </div>
                  {errors.username && touched.username && (
                    <p id="username-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <label htmlFor="email" className="block text-white text-sm mb-2">
                    Địa chỉ Email <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800 gap-4">
                    <span className="pl-3 text-orange-500">
                      <FaEnvelope aria-hidden="true" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Địa chỉ email"
                      required
                      aria-describedby={errors.email && touched.email ? "email-error" : null}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="relative">
                  <label htmlFor="phone" className="block text-white text-sm mb-2">
                    Số điện thoại <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800 gap-4">
                    <span className="pl-3 text-orange-500">
                      <FaPhoneAlt aria-hidden="true" />
                    </span>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Số điện thoại"
                      required
                      aria-describedby={errors.phone && touched.phone ? "phone-error" : null}
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <label htmlFor="password" className="block text-white text-sm mb-2">
                    Mật khẩu <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800 gap-4">
                    <span className="pl-3 text-orange-500">
                      <FaLock aria-hidden="true" />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Mật khẩu"
                      required
                      aria-describedby={errors.password && touched.password ? "password-error" : null}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="pr-3 text-gray-400 hover:text-white"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label htmlFor="confirm_password" className="block text-white text-sm mb-2">
                    Xác nhận mật khẩu <span className="text-orange-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800 gap-4">
                    <span className="pl-3 text-orange-500">
                      <FaLock aria-hidden="true" />
                    </span>
                    <input
                      id="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Xác nhận mật khẩu"
                      required
                      aria-describedby={errors.confirm_password && touched.confirm_password ? "confirm-password-error" : null}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="pr-3 text-gray-400 hover:text-white"
                      aria-label={showConfirmPassword ? "Ẩn xác nhận mật khẩu" : "Hiện xác nhận mật khẩu"}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirm_password && touched.confirm_password && (
                    <p id="confirm-password-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.confirm_password}
                    </p>
                  )}
                </div>

                {/* Agree to Terms */}
                <div className="relative">
                  <div className="flex items-center">
                    <input
                      id="agree"
                      type="checkbox"
                      name="agree"
                      checked={values.agree}
                      onChange={(e) => setFieldValue("agree", e.target.checked)}
                      className="h-4 w-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
                      aria-describedby={errors.agree && touched.agree ? "agree-error" : null}
                    />
                    <label htmlFor="agree" className="ml-2 text-white text-sm">
                      Tôi đồng ý với{" "}
                      <Link href="/terms" className="text-orange-500 hover:underline">
                        Điều khoản
                      </Link>{" "}
                      &{" "}
                      <Link href="/privacy" className="text-orange-500 hover:underline">
                        Chính sách bảo mật
                      </Link>
                      .
                    </label>
                  </div>
                  {errors.agree && touched.agree && (
                    <p id="agree-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.agree}
                    </p>
                  )}
                </div>

                {/* Status Message */}
                {(status || success || error) && (
                  <div aria-live="polite" className="text-center">
                    {status && (
                      <p
                        className={`${
                          status.includes("thành công") ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {status}
                      </p>
                    )}
                    {success && <p className="text-green-500">{success}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Đăng ký tài khoản"
                >
                  Đăng ký
                </button>

                {/* Link to Login */}
                <div className="text-center">
                  <span className="pr-2 text-white">Đã có tài khoản?</span>
                  <Link
                    href="/dang-nhap"
                    className="text-blue-600 text-base hover:text-orange-500 transition-colors"
                  >
                    Đăng nhập
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  console.log("Signup session:", session); // Debug

  if (session) {
    console.log("Redirecting to dashboard");
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);

  const meta = {
    title: "Đăng ký tài khoản - GreenLa Home | Nội thất cao cấp",
    description: "Đăng ký tài khoản tại GreenLa Home để trải nghiệm dịch vụ nội thất cao cấp và nhận ưu đãi độc quyền.",
    keywords: "đăng ký, GreenLa Home, nội thất, tạo tài khoản, ưu đãi nội thất, thiết kế nội thất",
    author: "GreenLa Home",
    robots: "noindex, follow", // Signup page should not be indexed
    canonical: "https://greenlahome.vn/dang-ky",
    og: {
      title: "Đăng ký tài khoản - GreenLa Home | Nội thất cao cấp",
      description: "Đăng ký tài khoản tại GreenLa Home để trải nghiệm dịch vụ nội thất cao cấp và nhận ưu đãi độc quyền.",
      type: "website",
      image: "https://greenlahome.vn/images/banner3.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn/dang-ky",
      siteName: "GreenLa Home",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Đăng ký tài khoản - GreenLa Home | Nội thất cao cấp",
      description: "Đăng ký tài khoản tại GreenLa Home để nhận ưu đãi độc quyền và dịch vụ nội thất cao cấp.",
      image: "https://greenlahome.vn/images/banner3.jpg",
      site: "@GreenLaHome", // Replace with actual Twitter handle if available
    },
  };

  return {
    props: {
      csrfToken: csrfToken || null,
      meta,
    },
  };
}