import RKTsir from '../../assets/Membersasset/RKTsir.png';
import rectangle1 from '../../assets/Membersasset/Rectangle 1.png';
import instagramIcon from '../../assets/Membersasset/instagram.png';
import linkedinIcon from '../../assets/Membersasset/linkedin.png';
import gmailIcon from '../../assets/Membersasset/gmail.png';


const Static = () => {
    return (
        <div className="members-header-section">
            <div className="faculty-card">
                <img src={RKTsir} alt="Dr. Rohit Tiwari" className="faculty-photo-img" />
                <div className="faculty-info">
                    <h2>Our Faculty Advisor<br />Dr. Rohit Tiwari</h2>
                    <div className="hover-reveal">
                        <p>Assistant Professor at Madan<br />Mohan Malaviya University of Technology</p>
                        <div className="faculty-icons">
                            <img src={gmailIcon} alt="Gmail" className="faculty-icon-img" />
                            <img src={linkedinIcon} alt="LinkedIn" className="faculty-icon-img" />
                            <img src={instagramIcon} alt="Instagram" className="faculty-icon-img" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="vertical-line"></div>
            <div className="welcome-card">
                <h2>Welcome to the heart of the<br />Coders & Developers Club — our members.</h2>
                <img src={rectangle1} className='groupphoto' />
                <div className="hover-reveal">
                    <p className="welcome-desc">
                        This page is a celebration of the passionate minds that fuel our community. From budding developers to seasoned programmers, every member contributes their unique skills, ideas and energy to drive innovation and learning.<br /><br />
                        Here, you'll find individuals who collaborate, code and create — not just projects, but meaningful connections.
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Static;