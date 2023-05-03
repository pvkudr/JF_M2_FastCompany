export function searchFilter(array, searchValue) {
    return array.filter((item) => item.name.toLowerCase().includes(searchValue));
}
