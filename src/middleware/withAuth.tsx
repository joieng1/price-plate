import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            } 
            else {
                setIsAuthenticated(true);
            }
        }, 
        []);

        if (!isAuthenticated) {
            return null; 
        }

        return <WrappedComponent {...props} />;
    };
};
  
export default withAuth;