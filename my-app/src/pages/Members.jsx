import './Members.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RKTsir from '../assets/Membersasset/RKTsir.png';
import rectangle1 from '../assets/Membersasset/Rectangle 1.png';
import instagramIcon from '../assets/Membersasset/instagram.png';
import linkedinIcon from '../assets/Membersasset/linkedin.png';
import gmailIcon from '../assets/Membersasset/gmail.png';
import githubIcon from '../assets/Membersasset/github.png';


import aditya from '../assets/Membersasset/aditya.png';
import aditi from '../assets/Membersasset/aditi.png';
import akshat from '../assets/Membersasset/akshat (1).png';
import anjali from '../assets/Membersasset/anjali1 (1).png';
import ayush from '../assets/Membersasset/ayush (1).png';
import kavya from '../assets/Membersasset/kavya.png';
import krishnaBansal from '../assets/Membersasset/krishna bansal.png';
import krishnaGupta from '../assets/Membersasset/krishna gupta (1).png';
import kshitij from '../assets/Membersasset/kshitij (1).png';
import naman from '../assets/Membersasset/naman (1).png';
import pratishtha from '../assets/Membersasset/pratishtha.png';
import priyanshu from '../assets/Membersasset/priyanshu.png';
import rajan from '../assets/Membersasset/rajan.png';
import samayanand from '../assets/Membersasset/samayanand1.png';
import sanskriti from '../assets/Membersasset/sanskriti.png';
import shaswat from '../assets/Membersasset/shaswat.png';
import image48 from '../assets/Membersasset/image 48.png';

const members = [
  { name: 'Aditya singh Kshatri', role: 'Executive member', img: aditya },
  { name: 'Aditi Rai', role: 'Executive member', img: aditi }, 
  { name: 'Akshat Vishnoi', role: 'Executive member', img: akshat },
  { name: 'Anjali Chaudhary', role: 'Executive member', img: anjali },
  { name: 'Ayush Kr.Gautam', role: 'Executive member', img: ayush },
  { name: 'Kavya Singh', role: 'Executive member', img: kavya },
  { name: 'Krishna Bansal', role: 'Executive member', img: krishnaBansal },
  { name: 'Krishna Gupta', role: 'Executive member', img: krishnaGupta },
  { name: 'Kshitij Kr.Srivastava', role: 'Executive member', img: kshitij },
  { name: 'Naman Singh', role: 'Executive member', img: naman },
  { name: 'Pratishtha Jaiswal', role: 'Executive member', img: pratishtha },
  { name: 'Priyanshu Kushwaha', role: 'Executive member', img: priyanshu },
  { name: 'Rajan Singh', role: 'Executive member', img: rajan },
  { name: 'Samayanand Pandey', role: 'Executive member', img: samayanand },
  { name: 'Sanskriti Singh', role: 'Executive member', img: sanskriti },
  { name: 'Shaswat Chaubey', role: 'Executive member', img: shaswat },
];

const sortedMembers = [...members].sort((a, b) => a.name.localeCompare(b.name));

const iconLinks = [
  { icon: gmailIcon, alt: 'Gmail', link: 'mailto:someone@example.com' },
  { icon: linkedinIcon, alt: 'LinkedIn', link: 'https://linkedin.com' },
  { icon: githubIcon, alt: 'GitHub', link: 'https://github.com' },
];


const Members = () => {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    const smallName = name.toLowerCase().replace(/ /g, '-');
    navigate(`/members/${smallName}`);
  };
  return (
    <div className="members-root">
      <nav className="members-navbar">
       
      </nav>
      <div className="members-header-section">
        <div className="faculty-card">
          <img src={RKTsir} alt="Dr. Rohit Tiwari" className="faculty-photo-img" />
          <div className="faculty-info">
            <h2>Our Faculty Advisor<br/>Dr. Rohit Tiwari</h2>
            <div className="hover-reveal">
              <p>Assistant Professor at Madan<br/>Mohan Malaviya University of Technology</p>
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
          <h2>Welcome to the heart of the<br/>Coders & Developers Club — our members.</h2>
          <img src={rectangle1} className='groupphoto'/>
          <div className="hover-reveal">
            <p className="welcome-desc">
              This page is a celebration of the passionate minds that fuel our community. From budding developers to seasoned programmers, every member contributes their unique skills, ideas and energy to drive innovation and learning.<br/><br/>
              Here, you'll find individuals who collaborate, code and create — not just projects, but meaningful connections.
            </p>
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="batch-section">
        <div className="batch-tabs-row">
          <span className="batch-label">Batch_</span>
          <div className="batch-tabs">
            <span className="batch-tab active">2024 - 28</span>
            <span className="batch-tab">2023 - 27</span>
            <span className="batch-tab last">2022 - 26</span>
          </div>
        </div>
        <div className="members-grid">
          {sortedMembers.map((member, idx) => (
            <div className="member-card" key={idx} onClick={()=>handleCardClick(member.name)} style={{ cursor: 'pointer' }}>
              <img src={member.img} alt={member.name} className="member-photo-img" />
              <div className="member-name">{member.name}</div>
              <div className="member-role">{member.role}</div>
              <div className="card-social">
                {iconLinks.map((icon, i) => (
                  <a href={icon.link} target="_blank" rel="noopener noreferrer" key={i} className="card-social__item">
                    <img src={icon.icon} alt={icon.alt} className="faculty-icon-img" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Members;
