import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent, allowedRoles) => {
    return (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [isAuthorized, setIsAuthorized] = useState(false);

        useEffect(() => {
            const authToken = localStorage.getItem("authToken");
            const userRole = localStorage.getItem("userRole");

            if (!authToken) {
                router.push("/Login");
            } else if (!allowedRoles.includes(userRole)) {
                router.push("/");
            } else {
                setIsAuthorized(true);
            }

            setLoading(false);
        }, [router, allowedRoles]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return isAuthorized ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;