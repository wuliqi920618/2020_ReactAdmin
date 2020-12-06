//发送ajax请求

import axios from 'axios'
import {message} from "antd";

export default function ajax(url, data = {}, type = "GET") {
    let promise;
    return new Promise((resolve, reject) => {

        if (type == 'GET') {
            promise = axios.get(url, {params: data})
        } else {
            promise = axios.post(url, data)
        }
        promise.then(response => {
            if(response.data.data.length==0){
                message.info('查询无数据')
            }
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错了：' + error.message)
        })
    })

}
