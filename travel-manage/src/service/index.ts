import axios from "axios";

export const npmDependencies = () =>
    axios
        .get("./npm.json")
        .then(res => res.data)
        .catch(err => console.log(err));
