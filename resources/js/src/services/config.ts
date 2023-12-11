import jwtAxios from "axios";

const exios = jwtAxios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
        acept: "application/json",
    },
});

exios.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response && err.response.data.type === "token-invalid") {
            //todo logout the user
        }
        return Promise.reject(err);
    }
);

// Function to set the Authorization header with the token
const setToken = () => {
    const token = localStorage.getItem("token"); // Replace 'token' with your actual storage key
    // console.log("Mytoken:"+token);
    if (token) {
        return `Bearer ${token}`;
    } else {
        console.log("Token Not Found");

        // If the token is not available, remove the Authorization header
        delete exios.defaults.headers.common["Authorization"];
    }
};

// Interceptor to update the token before each request
exios.interceptors.request.use(
    (config) => {
        setToken(); // Set the token before each request
        console.log((config.headers.Authorization = setToken()));
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//todo: define interceptors and other configuration like baseURL, headers etc. here
export default exios;
