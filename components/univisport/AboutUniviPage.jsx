import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/AboutUnivi.module.css';

export default function AboutUniviPage() {
    return (
        <article className="container mx-auto px-4">
            <div className={`prose max-w-none ${styles.customProse}`}>
                <h2>II. Định hướng phát triển và mục tiêu chiến lược</h2>
            </div>
            <div className="my-4">
                <figure className={`max-w-3xl mx-auto flex justify-center items-center my-4 ${styles.centeredFigure}`}>
                    <Image
                        src="/images/gioi-thieu/dinh-huong-phat-trien.jpg"
                        alt="Định hướng phát triển của Univi giai đoạn 2023-2028"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
                <p>
                    Trong giai đoạn 2023 - 2028, Univi tập trung nghiên cứu và phát triển sản phẩm Đồng Phục Thể Thao, chú trọng vào chất liệu và mẫu mã phù hợp cho từng bộ môn thể thao. Đồng thời, tối ưu hóa dịch vụ tư vấn và trải nghiệm khách hàng, cùng với quản lý thông tin và mối quan hệ khách hàng.
                </p>
                <p>
                    Với mục tiêu phát triển thương hiệu qua truyền thông, marketing và mở rộng cửa hàng trưng bày, Univi tăng cường độ phủ trên toàn quốc, đặc biệt là ở các khu kinh tế trọng điểm. Nâng cao năng lực sản xuất bằng việc mở rộng quy mô và đầu tư vào công nghệ cao, giúp tăng năng suất và chất lượng sản phẩm, đồng thời giảm giá thành.
                </p>
                <p>
                    Mục tiêu lớn của Univi là duy trì quan hệ tốt với hàng trăm nghìn khách hàng và đối tác trên cả nước. Chiến lược 2025-2028 của Univi nhấn mạnh việc trở thành lựa chọn hàng đầu của khách hàng đối với mảng Đồng Phục Thể Thao, bên cạnh đó tiếp tục duy trì và mở rộng mạng lưới khách hàng trong mảng Đồng Phục Doanh Nghiệp, xây dựng thương hiệu mạnh mẽ và khẳng định vị thế trong ngành sản xuất thời trang tại Việt Nam. Mục tiêu dài hạn là trở thành công ty niêm yết trên sàn chứng khoán, đồng thời triển khai phát triển hệ sinh thái Univi.
                </p>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
                <h2>III. Tầm nhìn chiến lược</h2>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/tam-nhin-chien-luoc.jpg"
                        alt="Tầm nhìn chiến lược của Univi"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
                <p>
                    Univi định hướng trở thành biểu tượng sáng tạo hàng đầu trong lĩnh vực Đồng Phục tại Việt Nam, đặc biệt là mảng Đồng Phục Thể Thao chuyên sâu. Chúng tôi không chỉ tạo ra những bộ đồng phục – chúng tôi kiến tạo hình ảnh thương hiệu thông qua sự kết hợp tinh tế giữa:
                </p>
                <ul>
                    <li>Công nghệ sản xuất hiện đại</li>
                    <li>Thiết kế đột phá mang dấu ấn riêng</li>
                    <li>Giải pháp cá nhân hóa linh hoạt cho từng đội nhóm</li>
                </ul>
                <p>
                    Với tầm nhìn dài hạn, Univi không đơn thuần là một đơn vị sản xuất đồng phục, mà là <strong>người bạn đồng hành chiến lược</strong> – mang đến giải pháp <strong>đồng phục toàn diện</strong> cho các doanh nghiệp, tổ chức và cộng đồng yêu thể thao. Chúng tôi tin rằng: <strong>khi đồng phục thể hiện được bản sắc – nó trở thành ngôn ngữ mạnh mẽ nhất để truyền tải giá trị của tập thể, đội nhóm.</strong>
                </p>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
                <h2>IV. Năng lực sản xuất</h2>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/nang-luc-san-xuat.jpg"
                        alt="Phân xưởng sản xuất số 03 tại Hải Dương"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                    <figcaption className="text-center text-gray-600 text-base">
                        Hình ảnh tại phân xưởng sản xuất số 03 tại Hải Dương
                    </figcaption>
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
            <p>
                Xưởng may Univi là nơi kết tinh giữa công nghệ hiện đại, tay nghề tinh hoa cùng sự nghiên cứu chuyên sâu về chất liệu tạo nên sự khác biệt vượt trội trong ngành đồng phục tại Việt Nam.
            </p>
            <p>
                Với dây chuyền sản xuất tiên tiến được tối ưu hóa từng khâu, Univi không chỉ đảm bảo hiệu suất sản xuất vượt trội mà còn duy trì sự đồng nhất và hoàn hảo trong từng chi tiết sản phẩm. Đội ngũ thợ lành nghề của chúng tôi không chỉ làm việc bằng kinh nghiệm mà còn bằng đam mê sáng tạo, luôn đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu.
            </p>
            <p>
                Quy trình sản xuất khép kín của Univi không chỉ giúp đối tác tiết kiệm được các chi phí trung gian mà còn giảm thiểu rủi ro, đảm bảo mỗi sản phẩm khi rời khỏi xưởng đều là một thiết kế chuyên biệt chuẩn mực, khác biệt hoàn toàn với nhiều sản phẩm thị trường.
            </p>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>

            <h2>V. Quy trình lên mẫu đồng phục</h2>
            <ul>
                <li>
                    <strong>Lên ý tưởng thiết kế áo đồng phục:</strong> Khách hàng cung cấp yêu cầu ban đầu về phong cách, màu sắc, logo, và nội dung muốn in/thêu trên áo. Univi hỗ trợ tư vấn và đề xuất các ý tưởng thiết kế phù hợp với bộ môn thể thao hoặc văn hóa và hình ảnh doanh nghiệp khách hàng. Ghi nhận chi tiết các yêu cầu để chuyển sang giai đoạn thiết kế.
                </li>
                <li>
                    <strong>Giai đoạn thiết kế áo đồng phục:</strong> Bộ phận thiết kế tạo mẫu phác thảo (Mockup) dựa trên ý tưởng đã thống nhất. Khách hàng xem và duyệt mẫu thiết kế trước khi chuyển sang bước tiếp theo. Mỗi chỉnh sửa thiết kế sẽ được xử lý trong vòng vài giờ tùy theo tiến độ.
                </li>
                <li>
                    <strong>Lựa chọn nguyên phụ liệu:</strong> Univi cung cấp chất liệu vải, loại sợi và màu sắc để khách hàng lựa chọn. Tư vấn các loại vải phù hợp với nhu cầu sử dụng và đảm bảo nguyên liệu đáp ứng các tiêu chí thoáng mát, bền đẹp, dễ bảo quản. Univi cam kết tất cả vải sử dụng đều có kiểm định an toàn với da.
                </li>
                <li>
                    <strong>Sản xuất:</strong>
                    <ul>
                        <li>Đối với những mẫu có sẵn, Univi có thể giao hàng ngay tới tay đối tác trong vòng 3 ngày (Đã bao gồm thời gian in Logo).</li>
                        <li>Đối với đơn hàng thiết kế, thời gian gia công mẫu sẽ trong vòng 2 ngày từ ngày chốt mẫu rập.</li>
                    </ul>
                </li>
                <li>
                    <strong>Kiểm tra và đánh giá:</strong> Univi kiểm tra chất lượng sản phẩm theo tiêu chuẩn form dáng, đường may, màu sắc và logo. Khách hàng nhận áo mẫu để kiểm tra và duyệt lần cuối. Sau khi mẫu được duyệt, Univi tiến hành sản xuất toàn bộ đơn hàng.
                </li>
            </ul>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/quy-trinh-len-mau.jpg"
                        alt="Quy trình sản W xuất đồng phục tại Univi"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
            <h2>VI. Các dịch vụ cung cấp của Univi</h2>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/linh-vuc-hoat-dong.jpg"
                        alt="Các dịch vụ đồng phục của Univi"
                        width={800}
                        height={400}
                        layout="responsive"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
            <h3>1. Đồng phục thể thao</h3>
            <p>
                Univi hiện đang tập trung cung cấp giải pháp Đồng Phục Thể Thao, đặc biệt tập trung vào thị trường Việt Nam với đối tượng chủ yếu là người tập thể thao, đội nhóm tập thể thao. Nhóm khách hàng này đa phần chưa thể tiếp cận được những mẫu áo thể thao chất lượng cao giúp giảm thiểu chấn thương và tối ưu hiệu suất tập luyện. Đồng phục Univi không ngừng cố gắng nghiên cứu để mang đến cho nhóm đối tượng này sản phẩm mang chất lượng Quốc tế nhưng giá lại phù hợp với người dùng Việt Nam.
            </p>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/dong-phuc-the-thao.jpg"
                        alt="Đồng phục thể thao chất lượng cao từ Univi"
                        width={800}
                        height={600}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>

            <h3>2. Đồng phục doanh nghiệp</h3>
            <p>
                Với xuất phát điểm là đơn vị sản xuất Đồng phục doanh nghiệp, Univi hiểu rằng thị trường đồng phục cho hội nhóm, cơ quan, tổ chức, và doanh nghiệp, nhu cầu chuyên nghiệp hóa ngày càng được ưu tiên. Đồng phục doanh nghiệp trở thành yếu tố quan trọng hàng đầu trong chiến lược kinh doanh của mỗi công ty tại Việt Nam. Univi, với phương châm luôn phát triển và đổi mới, hướng đến việc mở rộng thị phần{' '}
                <Link href="/dong-phuc-cong-ty" legacyBehavior>
                    <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        đồng phục doanh nghiệp
                    </a>
                </Link>
                . Công ty cung cấp đa dạng sản phẩm từ trung cấp đến cận cao cấp, đáp ứng nhu cầu của các công ty vừa và nhỏ, doanh nghiệp, và tập đoàn lớn trên khắp cả nước.
            </p>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/dong-phuc-doanh-nghiep.jpg"
                        alt="Đồng phục doanh nghiệp chuyên nghiệp từ Univi"
                        width={800}
                        height={600}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/dong-phuc-doanh-nghiep-2.jpg"
                        alt="Các loại đồng phục khác từ Univi"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
            <h3>3. Đồng phục khác</h3>
            <p>Đồng phục khác của UNIVI bao gồm các sản phẩm đa dạng như đồng phục sự kiện, đồng phục teambuilding, áo lớp, áo nhóm và các loại trang phục đặc thù theo yêu cầu. Với sự linh hoạt trong thiết kế và chất liệu cao cấp như Cotton, Polyester, hay Piquecool, UNIVI mang đến những bộ đồng phục không chỉ bền đẹp, thoải mái mà còn thể hiện rõ bản sắc riêng của từng tập thể. Tất cả sản phẩm đều được sản xuất theo quy trình khép kín, đảm bảo chất lượng đồng nhất và an toàn cho người mặc, đáp ứng nhu cầu đa dạng của các tổ chức, trường học và cộng đồng.</p>
            </div>
            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/dong-phuc-khac.jpg"
                        alt="Các loại đồng phục khác từ Univi"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
            <h2>VII. Cam kết của Univi</h2>
            <h3>1. Thông Tin Rõ Ràng</h3>
            <p>
                Khi lựa chọn Đồng phục Univi, quý khách sẽ hoàn toàn yên tâm về sự minh bạch của chúng tôi. Tất cả thông tin liên quan như địa chỉ, số điện thoại, và tài khoản ngân hàng đều được công khai chi tiết. Nếu bạn ở gần, đừng ngần ngại ghé thăm văn phòng Đồng phục Univi để thực hiện giao dịch trực tiếp hoặc chuyên viên của Univi có thể đến tận nơi để tư vấn cho bạn bất cứ lúc nào.
            </p>
            <h3>2. Chất Lượng Sản Phẩm Đặt Lên Hàng Đầu</h3>
            <p>
                Chất lượng áo từ Đồng Phục Univi không chỉ đáp ứng yêu cầu mà còn cam kết không tính phí nếu sản phẩm không đạt chuẩn. Đây là cam kết duy nhất của chúng tôi. Chúng tôi hiểu rằng sự tin tưởng của khách hàng phụ thuộc lớn vào chất lượng sản phẩm. Điều này thúc đẩy chúng tôi liên tục chú trọng kiểm tra và lựa chọn cẩn thận chất liệu vải và sản xuất riêng có nguồn gốc rõ ràng. Các dòng vải cao cấp tại Univi có thể kể đến như: Polyamide, Polyester cao cấp (PET), Cotton 100%, Piquecool, Lacoste USA,…
            </p>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/chat-luong-san-pham.jpg"
                        alt="Chất lượng sản phẩm đồng phục từ Univi"
                        width={800}
                        height={600}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>
            <h3>3. An toàn với sức khỏe người mặc</h3>
            <p>
                Tất cả chất liệu vải mà Univi sử dụng đều được kiểm định an toàn với da.
            </p>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/chat-luong-san-pham-2.jpg"
                        alt="Chất liệu vải an toàn với sức khỏe từ Univi"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>

            <h3>4. Giá Cả Hợp Lí Nhất</h3>
            <p>
                Tất cả sản phẩm của Univi đều có mức giá hợp lý, phù hợp với mọi đối tượng khách hàng. Cam kết của chúng tôi là chất lượng luôn đi kèm với mức giá hấp dẫn chỉ từ 99.000 đ cho các sản phẩm trung cao cấp, tạo ra giá trị thực sự cho khách hàng.
            </p>
            <h3>5. Chế Độ Bảo Hành và Hậu Mãi</h3>
            <p>
                Chúng tôi không chỉ dừng lại ở chất lượng sản phẩm, mà còn cam kết cung cấp chế độ bảo hành và hậu mãi tốt nhất. Univi bảo hành chất lượng áo, logo,…, đội ngũ chăm sóc khách hàng chuyên nghiệp sẵn sàng hỗ trợ mọi vấn đề và giải đáp mọi thắc mắc của quý khách hàng.
            </p>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/che-do-hau-mai.jpg"
                        alt="Chế độ bảo hành và hậu mãi từ Univi"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>
            <div className={`prose max-w-none ${styles.customProse}`}>

            <h2>VIII. Univi vì cộng đồng</h2>
            <p>
                Quỹ UNIVI vì cộng đồng được sáng lập ngày 9/12/2023 bởi thương hiệu Đồng phục UNIVI. Mục đích của quỹ nhằm hỗ trợ và giúp đỡ trẻ mồ côi, gia đình có hoàn cảnh khó khăn trên khắp mọi miền của Tổ Quốc.
            </p>
            </div>

            <div className="my-4">
                <figure className="max-w-[800px] mx-auto">
                    <Image
                        src="/images/gioi-thieu/univi-vi-cong-dong.jpg"
                        alt="Quỹ UNIVI vì cộng đồng"
                        width={800}
                        height={400}
                        layout="responsive"
                        sizes="(max-width: 800px) 100vw, 800px"
                        className="rounded"
                    />
                </figure>
            </div>

         
            <p>
                <strong>Khám phá thêm:</strong>
            </p>
            <ul>
                <li>
                    <Link href="https://dongphuchaianh.vn/" legacyBehavior>
                        <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Trang chủ Đồng Phục UNIVI
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="https://dongphuchaianh.vn/dong-phuc-cong-ty" legacyBehavior>
                        <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            Đồng phục doanh nghiệp
                        </a>
                    </Link>
                </li>
            </ul>
        </article>
    );
}