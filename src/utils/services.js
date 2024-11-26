export const returnValue = (e, setTodoValue) => {
    const {name, value} = e.target;
    setTodoValue((prev) => ({
        ...prev,
        [name]: value
    }))
}

export const findTodo = (tid, todo) => {
    const filteredItem = todo?.find((item) => item?.id === tid)
    return filteredItem
}