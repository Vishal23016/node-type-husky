let allSchemas = {};

import main from './main';
import todo from './todo';


let obj = {
    mainModel: main,
    todoModel:todo
}

for (let key in obj) {
    allSchemas[key] = obj[key]
}

export default allSchemas;