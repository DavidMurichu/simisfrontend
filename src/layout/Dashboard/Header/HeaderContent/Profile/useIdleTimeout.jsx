import { useEffect, useRef } from 'react';
import { logout } from 'services/account';

const useIdleTimeout = (onIdle, timeout = 1800000) => {
    const idleTimeoutRef = useRef(null);
    useEffect(() => {
        const resetTimeout = () => {
            if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
            }
            idleTimeoutRef.current = setTimeout(onIdle, timeout);
        };
        const handleActivity = () => {
            resetTimeout();
        };
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown',handleActivity);
        resetTimeout();
        return () => {
            if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
            }
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [onIdle, timeout]);

    return null;
};

export default useIdleTimeout;
