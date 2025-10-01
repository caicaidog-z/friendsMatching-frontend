export const defaultPicture = "https://bu.dusays.com/2025/05/20/682be585a89f2.ico"

export const jsonParseTag = (usersList) => {
    usersList.forEach(user => {
        if (user.tags) {
            user.tags = user.tags ? JSON.parse(user.tags) : '该用户暂未设置';
        }
    })
}