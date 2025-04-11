export const loginUser = async (email: string, password: string) => {
    const res = await fetch('http://192.168.137.1:3000/api/v1/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message || 'Login failed');
    }

    return json;
};