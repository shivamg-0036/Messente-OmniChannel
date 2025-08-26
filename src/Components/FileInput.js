function FileInput({ fileName, onFileChange }) {
    return (
        <div className="form-group col-md-12" style={{ marginLeft: "-1rem" }}>
            <div className="controls">
                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        onChange={onFileChange}
                    />
                    <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                        style={{fontSize:"0.8rem"}}
                    >
                        {fileName || "Choose file"}
                    </label>
                </div>
            </div>
        </div>
    );
}


export default FileInput;
