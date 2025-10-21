const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getFirstTenProducts = () => {

    return fetch(apiUrl + "/products/firstTenProducts", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        }
    });
}

export default { 
    getFirstTenProducts,
};
