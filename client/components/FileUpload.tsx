import React, { useRef } from "react";

interface FileUploadProps {
    file: any;
    setFile: Function
    accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({file, setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
    }

    return(
        <div onClick={() => ref.current.click()}>
            <input 
                type="file"
                accept={accept}
                style={{display: "none"}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;