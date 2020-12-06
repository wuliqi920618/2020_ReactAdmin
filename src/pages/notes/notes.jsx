import React, {Component} from 'react';
import {Collapse, Button, Card, Input, Modal, Form, DatePicker, message, Empty} from 'antd';
import {CaretRightOutlined, PlusOutlined,EditOutlined,ExclamationCircleOutlined,DeleteOutlined} from '@ant-design/icons';// 登录的路由组件
import {reqAddNote, reqNotes, reqUpdateNote, reqSearchNote, reqDeleteNote,} from '../../api'
import './notes.less'
import RichTextEditor from '../../components/rich-text-editor'
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
const {Panel} = Collapse;


export default class Notes extends Component {
    editRef = React.createRef();
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            note: {},
            showStatus: false,
            title: ''
        };
    }

    showAddModal = () => {
        this.setState({note: {}, showStatus: true},()=>{this.formRef.current.resetFields()})
    };
    showUpdateModal = (note) => {
        this.setState({note: note, showStatus: true},()=>{this.formRef.current.resetFields()})
    };
    handleCancel = () => {
        this.setState({showStatus: false},()=>{ this.formRef.current.resetFields();})
    };
    addAndUpdateNote = async () => {
        const validateResult = await this.formRef.current.validateFields();
        let desc = this.editRef.current.getText();
        let {title, time} = validateResult;
        let result;
        let params = {title, time, desc};
        if (this.isUpdate) {
            params._id = this.state.note._id;
            result = await reqUpdateNote(params)
        } else {
            result = await reqAddNote(params)
        }
        if (result.status === 0) {
            message.success(this.isUpdate ? "更新成功" : "添加成功");
        } else {
            message.error(this.isUpdate ? "更新失败" : "添加失败")
        }

        this.setState({showStatus: false},()=>{this.formRef.current.resetFields();});
        this.getNotes();

    };
    deleteNote= async (n)=>{
        let self=this;
        Modal.confirm({
            title: '确认要删除这个笔记吗?',
            icon: <ExclamationCircleOutlined/>,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const {_id} = n;
                const result = reqDeleteNote(_id);
                result.then(() => {
                    message.success('笔记已删除');
                    self.getNotes()
                }).catch((err) => {
                    message.error(err)
                });
            },
            onCancel() {
            },
        });
    };
    getNotes = async () => {
        let result;
        if (!this.state.title) {
            result = await reqNotes()
        } else {
            const title = this.state.title;
            result = await reqSearchNote(title)
        }
        if (result.status === 0) {
            this.setState({notes: result.data})
        } else {
            message.error(result.message)
        }
    };

    componentDidMount() {
        this.getNotes()
    }

    render() {
        const note = this.state.note;
        const now = new Date();
        this.isUpdate = Object.getOwnPropertyNames(note).length == 0 ? false : true
        const title = (<span>
            <Input style={{width: 200, margin: '0 16px'}}
                   onChange={(e) => this.setState({title: e.target.value})}/>
            <Button type='primary' onClick={() => this.getNotes()}>搜索</Button>
        </span>);
        const extra = (
            <Button type='primary'
                    onClick={() => {
                        this.showAddModal()
                    }}><PlusOutlined/>添加</Button>);


        let content;
        if (this.state.notes.length === 0) {
            content = (<Empty className='no-data' description={
                <span>当前没有笔记</span>

            }/>)
        } else {
            content=(   <Collapse
                bordered={false}
                expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                className="site-collapse-custom-collapse"
            >
                {this.state.notes.map((n, i) => <Panel header={n.title} key={i}
                                                       className="site-collapse-custom-panel">

                    <div className='note-collapse-content' >
                        <h5>
                            <EditOutlined onClick={() => {
                                this.showUpdateModal(n)
                            }} style={{marginRight:16}}/>
                            <DeleteOutlined onClick={() => {
                                this.deleteNote(n)
                            }}/>
                        </h5>



                        <span >记录时间：{moment(note.time).format('YYYY-MM-DD hh:mm:ss')}</span>
                        <div dangerouslySetInnerHTML={{__html: n.desc}}></div>
                    </div>



                </Panel>)}
            </Collapse>)
        }
        return (
            <Card title={title} extra={extra} className='note'>
                {content}
                <Modal
                    title={this.isUpdate === true ? '编辑笔记' : '添加笔记'}
                    visible={this.state.showStatus === true}
                    onOk={this.addAndUpdateNote}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                    maskClosable={false}
                >
                    <Form ref={this.formRef}>
                        <Form.Item
                            label="笔记主题"
                            name="title"
                            initialValue={note.title}
                            rules={[{required: true, message: '请输入笔记主题'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="记录时间："
                            name="time"
                            initialValue={moment(note.time)}
                        >
                            <DatePicker  onChange={this.onChangeTs} format={dateFormat}/>
                        </Form.Item>
                        <Form.Item
                            label="笔记内容："
                            name="desc"
                            labelCol={{span: 2}}
                            wrapperCol={{span: 20}}
                        >
                            <RichTextEditor ref={this.editRef} text={note.desc}></RichTextEditor>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>

        )
    }
}
