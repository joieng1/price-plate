import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const jwt = require('jsonwebtoken');
const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            
            const loading_time = 1500;
            const protectPage = async () => {
                const token = localStorage.getItem("jwtToken");
                const userID = localStorage.getItem("userID");

                if (!token || !userID) {
                    setTimeout(() => {
                        router.push('/login');
                    }, loading_time);
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
                            setTimeout(() => {
                                router.push('/login');
                            }, loading_time);
                        }

                    } catch (error) {
                        console.error("Failed to validate token:", error);
                        setTimeout(() => {
                            router.push('/login');
                        }, loading_time);
                    }
                }

                setLoading(false);
            };
            protectPage();
        }, [router]);

        if (loading){
            return null
        }
        
        if (!isAuthenticated) {
            return (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '50vh', 
                    textAlign: 'center',
                    flexDirection: 'column',
                    fontSize: 36,
                }}>
                    <h1>Page Unavailable</h1>
                    <p>Redirecting ...</p>
                </div>
            )
        }

        return <WrappedComponent {...props} />;
    };
};
  
export default withAuth;