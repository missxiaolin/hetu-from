/**
 * 根据 type 获取 tag
 * @param {*} tag
 */
export function getAntDesignTag(tag) {
    const tags = {
        Button: 'Button',
        Tag: 'Tag'
    }
    return tags[tag]
}
