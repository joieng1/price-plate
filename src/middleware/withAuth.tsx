import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const jwt = require('jsonwebtoken');
const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const router = useRouter();

        useEffect(() => {
            
            const protectPage = async () => {
                const token = localStorage.getItem("jwtToken");
                const userID = localStorage.getItem("userID");

                if (!token || !userID) {
                    router.push('/login');
                } 

                else {
                    try {
                        const response = await fetch('/api/protected', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({userID})
                        });

                        const jsonData = await response.json()
                        if (jsonData.message == "Page Authorized") {
                            setIsAuthenticated(true);
                        } 

                        else {
                            localStorage.clear()
                            router.push('/login');
                        }

                    } catch (error) {
                        console.error("Failed to validate token:", error);
                        router.push('/login');
                    }
                }
            };
            protectPage();
        }, [router]);

        if (!isAuthenticated) {
            return ( 
                <div>
                    Page Unavailable
                </div>
            )
        }

        return <WrappedComponent {...props} />;
    };
};
  
export default withAuth;