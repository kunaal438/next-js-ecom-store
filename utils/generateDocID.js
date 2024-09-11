import { nanoid } from "@reduxjs/toolkit";

const generateDocID = (str) => {
    console.log(str);
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9]+/g, '-');
    str = str.replace(/^-+|-+$/g, '');

    return str + nanoid(10);
}

export default generateDocID;