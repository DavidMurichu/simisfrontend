import { Outlet } from 'react-router-dom';

// ==============================|| MINIMAL LAYOUT ||============================== //

export default function MinimalLayout() {
  return (
    <>
      <Outlet style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} />
    </>
  );
}
