import React, { useRef } from 'react';
import JoditEditor from "jodit-react";

export const Input = ({setContent}) => {
	const editor = useRef(null)

	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
	
	return (
        <JoditEditor
            ref={editor}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // update the content for performance reasons
            onChange={newContent => {}}
        />
    );
}
 