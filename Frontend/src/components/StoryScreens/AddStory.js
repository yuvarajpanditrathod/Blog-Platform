import React, { useRef, useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlineUpload, AiOutlineClose } from 'react-icons/ai';
import { FiArrowLeft, FiSave, FiEye } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import '../../Css/AddStory.css';

const AddStory = () => {
    const { config } = useContext(AuthContext);
    const imageEl = useRef(null);
    const editorEl = useRef(null);
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [tags, setTags] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();

    const categories = [
        'Technology', 'Science', 'Engineering', 'Research', 
        'Campus Life', 'Student Projects', 'Innovation', 'Other'
    ];

    const clearInputs = () => {
        setTitle('');
        setContent('');
        setImage('');
        setCategory('');
        setExcerpt('');
        setTags('');
        setPreviewImage('');
        if (editorEl.current) {
            editorEl.current.editor.setData('');
        }
        if (imageEl.current) {
            imageEl.current.value = "";
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage('');
        setPreviewImage('');
        if (imageEl.current) {
            imageEl.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPublishing(true);
        
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("image", image);
        formdata.append("content", content);
        formdata.append("category", category);
        formdata.append("excerpt", excerpt);
        formdata.append("tags", tags);

        try {
            const { data } = await axios.post("/story/addstory", formdata, config);
            setSuccess('Story published successfully!');
            
            setTimeout(() => {
                setSuccess('');
                navigate('/'); // Redirect to home after successful publish
            }, 3000);
            
            clearInputs();
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred while publishing');
            setTimeout(() => {
                setError('');
            }, 7000);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleSaveDraft = () => {
        // In a real app, this would save to local storage or make an API call
        const draft = { title, content, category, excerpt, tags };
        localStorage.setItem('storyDraft', JSON.stringify(draft));
        alert('Draft saved successfully!');
    };

    return (
        <div className="professional-add-story-page">
            <div className="editor-header">
                <Link to="/" className="back-button">
                    <FiArrowLeft />
                    <span>Back to Home</span>
                </Link>
                
                <div className="editor-actions">
                    <button 
                        type="button" 
                        className="draft-btn"
                        onClick={handleSaveDraft}
                        disabled={!title && !content}
                    >
                        <FiSave />
                        <span>Save Draft</span>
                    </button>
                    
                    <button 
                        type="submit" 
                        form="story-form"
                        disabled={!image || isPublishing} 
                        className={image && !isPublishing ? 'publish-btn' : 'publish-btn-disabled'}
                    >
                        {isPublishing ? (
                            <>Publishing...</>
                        ) : (
                            <>
                                <MdOutlinePublishedWithChanges />
                                <span>Publish Story</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="editor-container">
                <form onSubmit={handleSubmit} id="story-form" className="professional-story-form">
                    {error && (
                        <div className="error-message">
                            <AiOutlineClose className="close-icon" onClick={() => setError('')} />
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="success-message">
                            <span>{success}</span>
                            <Link to="/">View Story</Link>
                        </div>
                    )}

                    <div className="form-section">
                        <label htmlFor="title">Story Title</label>
                        <input
                            type="text"
                            required
                            id="title"
                            placeholder="Catchy title that represents your story"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="title-input"
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="excerpt">Short Description (Excerpt)</label>
                        <textarea
                            id="excerpt"
                            placeholder="Brief summary of your story (appears in preview cards)"
                            onChange={(e) => setExcerpt(e.target.value)}
                            value={excerpt}
                            className="excerpt-input"
                            rows="3"
                            maxLength="160"
                        />
                        <div className="char-count">{excerpt.length}/160</div>
                    </div>

                    <div className="form-row">
                        <div className="form-section">
                            <label htmlFor="category"><BiCategory /> Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="category-select"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-section">
                            <label htmlFor="tags">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                placeholder="Comma-separated tags (e.g., technology, research, innovation)"
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                                className="tags-input"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <label>Featured Image</label>
                        {previewImage ? (
                            <div className="image-preview-container">
                                <img src={previewImage} alt="Preview" className="image-preview" />
                                <button type="button" onClick={removeImage} className="remove-image-btn">
                                    <AiOutlineClose />
                                </button>
                            </div>
                        ) : (
                            <div 
                                className="image-upload-area"
                                onClick={() => imageEl.current.click()}
                            >
                                <AiOutlineUpload className="upload-icon" />
                                <div className="upload-text">
                                    <div>Click to upload a featured image</div>
                                    <span>Recommended: 1200x630 pixels</span>
                                </div>
                                <input
                                    name="image"
                                    type="file"
                                    ref={imageEl}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    hidden
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-section">
                        <label>Story Content</label>
                        <div className="editor-wrapper">
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                                ref={editorEl}
                                config={{
                                    toolbar: {
                                        items: [
                                            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 
                                            'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo'
                                        ]
                                    }
                                }}
                            />
                        </div>
                    </div>
                </form>

                <div className="story-preview">
                    <h3><FiEye /> Preview</h3>
                    <div className="preview-content">
                        {title ? (
                            <>
                                <h4>{title}</h4>
                                {excerpt && <p className="preview-excerpt">{excerpt}</p>}
                                {previewImage && (
                                    <img src={previewImage} alt="Preview" className="preview-image" />
                                )}
                                {content && (
                                    <div 
                                        className="preview-body" 
                                        dangerouslySetInnerHTML={{ __html: content.substring(0, 200) + '...' }} 
                                    />
                                )}
                            </>
                        ) : (
                            <p>Start writing to see a preview of your story</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStory;