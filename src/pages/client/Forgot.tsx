
import { Link } from 'react-router-dom'

const Forgot = () => {
  return (
    <div className='form-auth'>
    {/* 02 Main page */}
    <section className="page-section login-page">
        <div className="full-width-screen">
            <div className="container-fluid p-0">
                <div className="content-detail p-0">
                    {/* Forgot form */}
                    <form className="forgot-form" method="post">
                        <div className="blobs_1"></div>
                        <div className="blobs_2"></div>
                        <div className="blobs_5"></div>
                        <div className="blobs_6"></div>
                        <div className="blobs_7"></div>
                        <div className="imgcontainer">
                            <img src="https://efood-admin.6amtech.com/storage/app/public/restaurant/2023-03-08-64096f9b691d3.png" alt="logo" className="avatar" />
                        </div>
                        <div className="input-control">
                            <p>Nhập email của bạn, chúng tôi sẽ gửi một liên kết để thiết lập lại mật khẩu.</p>
                            <input type="email" placeholder="Enter your email" name="email" required />
                            <div className="login-btns">
                                <button type="submit">Gửi</button>
                            </div>
                            <div className="login-with-btns">
                                <span className="already-acc">Quay về<Link to="/signin" className="login-btn">Đăng nhập</Link></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Forgot