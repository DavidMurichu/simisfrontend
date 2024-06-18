// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <Navigation style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}  />
        <NavCard style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}  />
      </SimpleBar>
    </>
  );
}
