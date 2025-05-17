import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDescription, cilListRich, cilBraille } from '@coreui/icons'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const navItemStyle = {
    width: '206px',
    marginLeft: '8px',
    fontSize: '18px',
    fontWeight: 500,
    backgroundColor: '#0071BC',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
    marginBottom: '4px'
  }

  return (
    <CSidebar className="vh-100" style={{ backgroundColor: 'rgba(195, 219, 237, 0.7)', width: '240px' }}>
      <CSidebarBrand className="d-flex align-items-center px-3" style={{ height: '64px', backgroundColor: "#89BBDE" }}>
        <div
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginRight: '10px',
            flexShrink: 0,
            backgroundColor: '#fff',
          }}
        >
          <img
            src="/logo_uit_white.png"
            alt="Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        <span style={{ fontWeight: 630, fontSize: '18px', color: '#000' }}>Website learning</span>
      </CSidebarBrand>

      <CSidebarNav style={{ marginTop: '6px' }}>
        <CNavItem>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              ...navItemStyle,
              backgroundColor: isActive ? '#279EFF' : navItemStyle.backgroundColor,
            })}
            className="nav-link"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0, 113, 188, 0.5)'}
            onMouseLeave={e => {
              const isActive = e.currentTarget.classList.contains('active')
              e.currentTarget.style.backgroundColor = isActive ? '#279EFF' : '#0071BC'
            }}
          >
            <CIcon icon={cilDescription} style={{ width: '30px', height: '30px' }} />
            <span style={{
              fontWeight: 480,
              fontSize: '18px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'inline-block'
            }}
              title='Overview'>Overview</span>
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink
            to="/education"
            style={({ isActive }) => ({
              ...navItemStyle,
              backgroundColor: isActive ? '#279EFF' : navItemStyle.backgroundColor,
            })}
            className="nav-link"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0, 113, 188, 0.5)'}
            onMouseLeave={e => {
              const isActive = e.currentTarget.classList.contains('active')
              e.currentTarget.style.backgroundColor = isActive ? '#279EFF' : '#0071BC'
            }}
          >
            <CIcon icon={cilListRich} style={{ width: '30px', height: '30px' }} />
            <span style={{
              fontWeight: 480,
              fontSize: '18px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'inline-block'
            }}
              title='Education Management'>Education Management</span>
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink
            to="/learning"
            style={({ isActive }) => ({
              ...navItemStyle,
              backgroundColor: isActive ? '#279EFF' : navItemStyle.backgroundColor,
            })}
            className="nav-link"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0, 113, 188, 0.5)'}
            onMouseLeave={e => {
              const isActive = e.currentTarget.classList.contains('active')
              e.currentTarget.style.backgroundColor = isActive ? '#279EFF' : '#0071BC'
            }}
          >
            <CIcon icon={cilBraille} style={{ width: '30px', height: '30px' }} />
            <span style={{
              fontWeight: 480,
              fontSize: '18px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'inline-block'
            }}
              title='Personalized Learning'>Personalized Learning</span>
          </NavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  )
}

export default Sidebar
