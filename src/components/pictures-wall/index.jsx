import React, {Component} from 'react';
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types'
import {reqDeleteImg} from '../../api/index'
import {BASE_IMG_PATH, UPLOAD_IMG_NAME} from '../../utils/constant'

export default class PicturesWall extends Component {
    static propTypes = {
        imgs: PropTypes.array
    };

    constructor(props) {
        super(props);
        let fileList = [];
        const imgs = this.props.imgs;
        if (imgs && imgs.length > 0) {
            fileList = imgs.map(((img, index) => ({
                uid: -index,
                name: img,
                status: 'done', // loading: 上传中, done: 上传完成, remove: 删除
                url: BASE_IMG_PATH + img,
            })))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: fileList,
        };
    }

    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    };
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };
    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview, // 需要显示的大图的 url
            previewVisible: true,
        })

    };

    handleChange = async ({file, fileList}) => {
        // 如果上传图片完成
        if (file.status === 'done') {
            const result = file.response;
            if (result.status === 0) {
                message.success('上传成功了');
                const {name, url} = result.data;
                file = fileList[fileList.length - 1];
                file.name = name;
                file.url = url
            } else {
                message.error('上传失败了')
            }
        } else if (file.status === 'removed') { // 删除图片
            const result = await reqDeleteImg(file.name);
            if (result.status === 0) {
                message.success('删除图片成功')
            } else {
                message.error('删除图片失败')
            }
        }
// 更新 fileList 状态
        this.setState({fileList})
    };

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div style={{marginTop: 8}}>Upload</div>
            </div>
        );

        return (
            <>
                <Upload
                    action="/user/img/upload"
                    accept="image/*"
                    name={UPLOAD_IMG_NAME}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </>
        );
    }
}
