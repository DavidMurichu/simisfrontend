



export const Delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async (url, setState) => {
    try {
        
        const response = await ApiService.get(url);
        if (response.data) {
            if (response.data.error) {
                toast.error(`Error: ${response.data.error}`);
                console.error(`Error fetching data from ${url}: ${response.data.error}`);
            } else if (Array.isArray(response.data)) {
                setState(response.data);
            }
        }
    } catch (error) {
        toast.error(`Failed to fetch data from ${url}`);
        console.error(`Error fetching data from ${url}:`, error);
    }
};

