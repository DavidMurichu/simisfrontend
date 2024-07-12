import { toast } from 'react-toastify';
import ApiService from './apiservice'; // Assuming ApiService is exported as default

const FetchData = async (url, setState) => {
    try {
        const response = await ApiService.get(url);
        if (response.data) {
            if (response.data.error) {
                toast.error(`Error: ${response.data.error}`);
                console.log(`Error fetching data from ${url}: ${response.data}`);
            } else if (Array.isArray(response.data)) {
                console.log('data', response.data)
                setState(response.data);
            }
        }
    } catch (error) {
        toast.error(`Failed to fetch data from ${url}`);
        console.log(`Error fetching data from ${url}:`, error);
    }
};

export default FetchData;
