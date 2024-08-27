export const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);

export const transformToQuery = (param: string) => param.toLowerCase().split(' ').join('-');

export const transformFromQuery = (param: string) => param.split('-').map(capitalize).join(' ');
