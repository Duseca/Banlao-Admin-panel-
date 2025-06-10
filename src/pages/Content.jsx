import React, { useEffect, useRef, useState } from 'react';
import Header from '../layouts/partials/header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import supabase from '../config/supabaseClient';

export default function Content() {
  const [editorHtml, setEditorHtml] = useState('');
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [privacy, setPrivacy] = useState('');
  const [terms, setTerms] = useState('');
  const quillRef = useRef();

  const handleEditorChange = (value) => {
    setEditorHtml(value);
  };

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setPrivacy(data.privacy);
        setTerms(data.terms);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateContent = async (tab) => {
    try {
      setLoading(true);
      // const editorText = quillRef.current?.getEditor().getText() || '';
      const editorText = editorHtml || '';
      const updateData =
        tab === 1 ? { privacy: editorText } : { terms: editorText };

      const { data, error } = await supabase
        .from('content')
        .upsert({ id: 1, ...updateData }, { onConflict: ['id'] })
        .select()
        .single();

      if (error) throw error;

      // Update local state immediately
      if (tab === 1) {
        setPrivacy(editorText);
      } else {
        setTerms(editorText);
      }

      toast.success(
        tab === 1 ? 'Privacy Policy updated' : 'Terms and Conditions updated'
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (tab === 1) {
      setEditorHtml(privacy);
    } else {
      setEditorHtml(terms);
    }
  }, [tab, privacy, terms]);

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <div>
      <Header header={'Manage content'} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          <div className='flex flex-wrap gap-4 justify-start bg-white px-4 py-2'>
            <button
              className={`rounded-md w-full sm:w-auto text-sm ${
                tab === 1 ? 'bg-gray-150 text-white' : 'text-gray-150'
              } px-6 py-2 font-medium capitalize`}
              onClick={() => {
                setTab(1);
                setEditorHtml(privacy);
              }}
            >
              Privacy Policy
            </button>
            <button
              className={`rounded-md w-full sm:w-auto text-sm ${
                tab === 2 ? 'bg-gray-150 text-white' : 'text-gray-150'
              } px-6 py-2 font-medium capitalize`}
              onClick={() => {
                setTab(2);
                setEditorHtml(terms);
              }}
            >
              Terms and Conditions
            </button>
          </div>
          <div className='space-y-2 my-3'>
            <div className=' bg-white'>
              <ReactQuill
                theme='snow' // other themes are available - 'bubble' and 'core'
                value={editorHtml}
                onChange={handleEditorChange}
                modules={modules}
              />
            </div>
            <button
              className='rounded-md w-full sm:w-auto text-sm text-white bg-gray-150 px-6 py-2 font-medium capitalize hover:shadow-lg hover:transform hover:scale-105 hover:text-shadow-lg transition duration-300 ease-in-out'
              onClick={() => updateContent(tab)}
            >
              {loading ? `...Updating` : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
