/** Kiểm tra tính hợp lệ của một địa chỉ gmail */
export const checkValidGmail = (gmail : string) => {
  // eslint-disable-next-line no-useless-escape
  const gmailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/
  return gmailRegex.test(gmail)
}
