//读取本地存储信息

const getStorageInfo = () => {
    return JSON.parse(sessionStorage.getItem('userinfo') || '{}')
}
export {
    getStorageInfo
}