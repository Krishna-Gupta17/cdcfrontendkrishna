import "../../styles/Members.css";
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import linkedinIcon from '../../assets/Membersasset/linkedin.png'
import gmailIcon from '../../assets/Membersasset/gmail.png';
import githubIcon from '../../assets/Membersasset/github.png';

export default function MembersList({ year: defaultYear }) {
    const { year } = useParams();
    const finalYear = parseInt(year || defaultYear || 2024);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:4200/members?year=${finalYear}`)
            .then((res) => setMembers(res.data.body))
            .catch((err) => console.error('Error loading members:', err));
    }, [finalYear]);

    return (
        <div className='members-list-container'>
            <div className="horizontal-line"></div>

            {members.length >= 0 ? (
                <div className="members-grid">
                    {members.map((m, index) => (
                        <Link to={`/members/${m._id}`} key={index} className="member-card">
                            <img src={m.memberImage} alt={m.name} className="member-photo" />
                            <div className="member-info">
                                <h3 className="member-name">{m.memberName}</h3>
                                <p className="member-role">{m.memberRole}</p>
                                <div className="card-social">
                                    {m.memberEmail && (
                                        <a href={`mailto:${m.memberEmail}`} target="_blank" rel="noopener noreferrer" className="card-social__item">
                                            <img src={gmailIcon} alt="gmail" className="faculty-icon-img" />
                                        </a>
                                    )}
                                    {m.memberSocial?.linkedin && (
                                        <a href={m.memberSocial.linkedin} target="_blank" rel="noopener noreferrer" className="card-social__item">
                                            <img src={linkedinIcon} alt="linkedin" className="faculty-icon-img" />
                                        </a>
                                    )}
                                    {m.memberSocial?.github && (
                                        <a href={`https://github.com/${m.memberSocial.github}`} target="_blank" rel="noopener noreferrer" className="card-social__item">
                                            <img src={githubIcon} alt="github" className="faculty-icon-img" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="no-members">
                    <p>No members found for batch {finalYear}</p>
                </div>
            )}
        </div>
    );
}
