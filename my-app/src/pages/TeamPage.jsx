import "../styles/Members.css"
import { Outlet } from 'react-router-dom';
import YearSelector from '../components/memberPage/YearSelector';
import Static from "../components/memberPage/MembersStatic";

const TeamPage = () => {
  return (
    <div className="members-root">
      <nav className="members-navbar">
      </nav>
      <Static/>
      <YearSelector/>
      <Outlet />
    </div>
  )
}

export default TeamPage