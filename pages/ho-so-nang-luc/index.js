import Head from 'next/head';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import styles from '../../styles/Profile.module.css';
import DefaultLayout from '../../components/layout/DefaultLayout';

// Configure the pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export default function Profile({ meta }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
    setUseFallback(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('Failed to load PDF with react-pdf:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    setUseFallback(true);
  };

  return (
    <DefaultLayout >
    <div className={styles.container} >
        <div className="mt-[60px] sm:mt-[91px]">

        </div>
      <main className={styles.main}>
        <div className={styles.pdfContainer}>
          {error && <p className={styles.error}>{error}</p>}
          {!useFallback ? (
            <Document
              file="/ho-so-nang-luc.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              {numPages &&
                Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className={styles.pdfPage}
                    scale={1.0} /* Adjust scale if needed */
                    width={window.innerWidth} /* Match viewport width */
                  />
                ))}
            </Document>
          ) : (
            <iframe
              src="/ho-so-nang-luc.pdf#toolbar=0&view=FitH"
              width="100%"
              height="100%"
              title="Hồ sơ năng lực Univi Sport"
              className={styles.pdfIframe}
              style={{ border: 'none' }} /* Remove iframe border */
            />
          )}
        </div>
        {/* Optionally hide the download link */}
        {/* <p>
          <a href="/ho-so-nang-luc.pdf" download className={styles.downloadLink}>
            Tải hồ sơ năng lực (PDF)
          </a>
        </p> */}
      </main>
    </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Hồ sơ năng lực Univi Sport - Quần áo thể thao chất lượng cao",
    content:
      "Univi Sport – Thương hiệu quần áo thể thao với công nghệ Uni Dry, chất liệu vải chuyên dụng cho gym, yoga, chạy bộ và golf. An toàn cho da, thoải mái khi vận động.",
    keywords:
      "hồ sơ năng lực Univi Sport, quần áo thể thao, công nghệ Uni Dry, vải thể thao, trang phục gym, quần áo yoga, chạy bộ, vải an toàn cho da",
    robots: "index, follow",
    author: "Univi Sport",
    canonical: "https://univisport.vn/profile",
    og: {
      title: "Univi Sport – Quần áo thể thao chuyên dụng",
      description:
        "Khám phá hồ sơ năng lực Univi Sport: quần áo thể thao với công nghệ Uni Dry, chất liệu cao cấp, an toàn cho da, phù hợp cho gym, yoga, chạy bộ.",
      type: "website",
      image: "https://univisport.vn/images/univi-sport-profile.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://univisport.vn/profile",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hồ sơ năng lực Univi Sport - Quần áo thể thao chất lượng cao",
      description:
        "Univi Sport – Thương hiệu quần áo thể thao với công nghệ Uni Dry, chất liệu vải chuyên dụng cho gym, yoga, chạy bộ và golf.",
      image: "https://univisport.vn/images/univi-sport-profile.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}