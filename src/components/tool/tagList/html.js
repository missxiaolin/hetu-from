/**
 * 根据 type 获取 tag
 * @param {*} tag
 */
 export function getHtmlTag (tag) {
    const tags = {
      div: 'div',
      span: 'span',
      a: 'a',
      p: 'p'
    }
    return tags[tag]
  }
  