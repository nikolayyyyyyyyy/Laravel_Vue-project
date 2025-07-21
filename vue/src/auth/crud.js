const createProduct = async (product) => {
    const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: product
    });

    if (!response.ok) {
        const errors = await response.json();
        throw new Error(JSON.stringify(errors.errors));
    }
}

const deleteProduct = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });

    const products = await response.json();
    console.log(products);
};

const getAllProducts = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const products = await response.json();
    return products;
};

const getAllPlans = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/plans', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
    const plans = await response.json();
    return plans;
};

export function crud() {
    return {
        createProduct,
        deleteProduct,
        getAllProducts,
        getAllPlans
    }
}