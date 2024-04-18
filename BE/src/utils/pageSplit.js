const pageSplit = async (page, pageSize, model, filterModel, populated) => {
    const totalItems = await model.countDocuments(filterModel)
    const totalPages = Math.ceil(totalItems / Number(pageSize || 4))
    const skip = page ? (Number(page) - 1) * Number(pageSize || 4) : 0
    if (!populated) {
        const result = await model.find(filterModel).skip(skip).limit(Number(pageSize || 4))
        const data = {
            totalPages,
            totalItems,
            data: result,
            page: Number(page) || 1
        }
        return data
    }
    else {
        const result = await model.find(filterModel).skip(skip).limit(Number(pageSize || 4)).populate(populated)
        const data = {
            totalPages,
            totalItems,
            data: result,
            page: Number(page) || 1
        }
        return data
    }

}
export default pageSplit