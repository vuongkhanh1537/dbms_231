import axios from "axios"

const Publisher = async () => {
    let res = await axios.get("http://localhost:8800/publishers");
    if (res) {
        return res;
    }
}

export default Publisher;