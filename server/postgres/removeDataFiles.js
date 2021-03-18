const del = require('del');

// directory path
const dir = 'dataFiles';

// delete directory recursively
(async () => {
    try {
        await del(dir);

        console.log(`${dir} deleted!`);
    } catch (err) {
        console.error(`Error while deleting ${dir}.`);
    }
})();