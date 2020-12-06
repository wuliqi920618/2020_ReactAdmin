import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from 'prop-types'
import './index.less'
export default class Index extends Component {
    static propTypes = {
        text: PropTypes.string
    };
    state = {
        editorState: EditorState.createEmpty(),
    };
    getText = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    };
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    componentDidMount = () => {
        const {text} = this.props;
        if (text && text !== 'null') {
            const contentBlock = htmlToDraft(text);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({editorState});
        }
    };

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName=""
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
                {/*<textarea*/}
                {/*disabled*/}
                {/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
                {/*/>*/}
            </div>
        );
    }
}
