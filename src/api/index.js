//包含应用中所有请求函数的模块
//每个函数的返回值都是promise
import ajax from './ajax'


// export function reqLogin() {
//     ajax('/login',{username,password},'POST')
// }
export const reqLogin = (username, password) => ajax('/user/login', {username, password}, 'POST')


// 获取用户列表
export const reqUsers = () => ajax('/user/list', {});

// 新增用户
export const reqAddUser = ({username,password,desc,img,staff}) => ajax('/user/add', {username,password,desc,img,staff}, 'POST');

// 更新用户
export const reqUpdateUser = ({username,password,desc,_id,img,staff}) => ajax('/user/update', {username,password,desc,_id,img,staff}, 'POST');

// 查询用户
export const reqSearchUser = (userName) => ajax('/user/search', {userName}, 'POST');

// 删除用户
export const reqDeleteUser = (userId) => ajax('/user/delete', {userId}, 'POST');


// 获取政策列表
export const reqPolicys = () => ajax('/policy/list', {});

// 新增政策
export const reqAddPolicy = ({name,type,ts,te,department,state,desc,_id,price}) => ajax('/policy/add', {name,type,ts,te,department,state,desc,_id,price}, 'POST');

// 更新政策
export const reqUpdatePolicy = ({name,type,ts,te,department,state,desc,_id,price}) => ajax('/policy/update', {name,type,ts,te,department,state,desc,_id,price}, 'POST');

// 查询政策
export const reqSearchPolicy = ({type,name}) => ajax('/policy/search', {type,name}, 'POST');

// 删除政策
export const reqDeletePolicy = (_id) => ajax('/policy/delete', {_id}, 'POST');


// 获取项目列表
export const reqProjects = () => ajax('/project/list', {});

// 新增项目
export const reqAddProject = ({name, desc, person, personLink, state, ts,te, imgs,detail}) => ajax('/project/add', {name, desc, person, personLink, state, ts,te, imgs,detail}, 'POST');

// 更新项目
export const reqUpdateProject = ({name, desc, person, personLink, state, ts,te, imgs,_id}) => ajax('/project/update', {name, desc, person, personLink, state, ts,te, imgs,_id}, 'POST');

// 查询项目
export const reqSearchProject = (state) => ajax('/project/search', {state}, 'POST');

// 删除项目
export const reqDeleteProject = (_id) => ajax('/project/delete', {_id}, 'POST');


// 获取笔记列表
export const reqNotes = () => ajax('/note/list', {});

// 新增笔记
export const reqAddNote = ({title,time,desc}) => ajax('/note/add', {title,time,desc}, 'POST');

// 更新笔记
export const reqUpdateNote = ({title,time,desc,_id}) => ajax('/note/update', {title,time,desc,_id}, 'POST');

// 查询笔记
export const reqSearchNote = (title) => ajax('/note/search', {title}, 'POST');

// 删除笔记
export const reqDeleteNote = (_id) => ajax('/note/delete', {_id}, 'POST');


export const reqDeleteImg = (name) => ajax('/user/img/delete', {name}, 'post')



//
// // 获取一级或某个二级分类列表
// export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})
// // 添加分类
// export const reqAddCategory = ({parentId, categoryName}) => ajax('/manage/category/add', {
//     parentId,
//     categoryName
// }, 'POST')
// // 更新品类名称
// export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {
//     categoryId,
//     categoryName
// }, 'POST')
//
// export const reqProducts = (pageNum, pageSize) => ajax('/manage/policy/list', {pageNum, pageSize})
//
// export const reqAddOrUpdateProduct = ({categoryId, pCategoryId, name, desc, price, detail, imgs, _id}) => ajax('/manage/policy/' + (_id ? 'update' : 'add'), {
//     categoryId,
//     pCategoryId,
//     name,
//     desc,
//     price,
//     detail,
//     imgs,
//     _id
// }, 'POST')
//
// export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) =>
//     ajax('/manage/policy/search', {
//         pageNum,
//         pageSize,
//         [searchType]: searchName,
//     })
//export const reqDeleteImg = (name) => ajax('/img/delete', {name}, 'post')
//
// export const reqBooks = () => ajax('/goods', {})
//
