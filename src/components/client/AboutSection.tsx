// type Props = {}

const AboutSection = () => {
  return (
    <div>
      <section id="about-7" className="about-section division">
        <div className="container">
          <div className="abox-4-wrapper ico-80">
            <div className="row">
              <div className="col-md-4 col-lg-4">
                <div className="abox-4 text-center mb-20 coffee-color">
                  <div className="abox-4-ico">
                    <img
                      src="/ImagesCLient/meat.png"
                      alt=""
                      style={{ width: "80px", display: "inline-block" }}
                    />
                  </div>
                  <h5 className="h5-lg">30+ Đồ ăn kèm</h5>
                  <p>
                    Khám phá các món ăn từ khắp nơi trên thế giới, từ hương vị
                    truyền thống đến những món ăn phá cách đầy sáng tạo.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="abox-4 text-center mb-20 coffee-color">
                  <div className="abox-4-ico">
                    <img
                      src="/ImagesCLient/cabbage.png"
                      alt=""
                      style={{ width: "80px", display: "inline-block" }}
                    />
                  </div>
                  <h5 className="h5-lg">Chất lượng đồ ăn</h5>
                  <p>
                    Nguyên liệu tươi ngon cho đến quy trình chế biến tỉ mỉ, mỗi
                    món ăn đều mang đến cho bạn một trải nghiệm thực sự ngon
                    lành và hấp dẫn.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="abox-4 text-center mb-20 coffee-color">
                  <div className="abox-4-ico">
                    <img
                      src="/ImagesCLient/touch.png"
                      alt=""
                      style={{ width: "80px", display: "inline-block" }}
                    />
                  </div>
                  <h5 className="h5-lg">tích hợp công nghệ</h5>
                  <p>
                    Hệ thống đặt món thông qua ứng dụng di động, thiết bị giữ
                    nhiệt thông minh để bảo quản đồ ăn ở nhiệt độ lý tưởng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
