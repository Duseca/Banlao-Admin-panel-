import React, { useState } from 'react'
import Header from '../layouts/partials/header'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Content() {
  const [editorHtml, setEditorHtml] = useState('');

  const handleEditorChange = (value) => {
    setEditorHtml(value);
  };

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions
    }
  }

  return (
    <div>
      <Header header={"Manage content"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-3">
          <div className="flex flex-wrap gap-4 justify-start bg-white px-4 py-2">
            {/* <div className='space-x-3'> */}
            <button className="rounded-md w-full sm:w-auto text-sm bg-gray-150 text-white px-6 py-2  font-medium capitalize">Privacy Policy</button>
            <button className="rounded-md w-full sm:w-auto border text-sm text-gray-150 px-6 py-2  font-medium capitalize">Terms and Conditions</button>
            {/* </div> */}
            <div className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4">
              {/* <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full px-4 py-2 outline-none pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
              </div> */}
              {/* <Filterdropdown /> */}
            </div>
          </div>
          <div className='space-y-2 my-3'>
            {/* <h4 className='text-3xl font-bold'>About Us</h4> */}
            <div className=' bg-white'>
              <ReactQuill
                theme="snow" // other themes are available - 'bubble' and 'core'
                value={editorHtml}
                onChange={handleEditorChange}
                modules={modules}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
