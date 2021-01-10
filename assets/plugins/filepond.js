import 'filepond/dist/filepond.min.css';
import * as FilePond from 'filepond';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';


FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation
);


function arrayToFileList(files) {
    const data = new ClipboardEvent('').clipboardData || new DataTransfer();
    files.forEach(file => data.items.add(file));
    return data.files;
}

function mergeFiles(files1, files2) {
    const files = [...files1];
    files2.forEach(file => {
        if (files.find(f => f.size === file.size && f.name === file.name) === undefined) {
            files.push(file);
        }
    });
    return files;
}

function mergeFileLists(files1, files2) {
    return arrayToFileList(mergeFiles(Array.from(files1), Array.from(files2)));
}


function removeFile(fileList, file) {
    return arrayToFileList(Array.from(fileList).filter(f => f !== file));
}


class DropFilesData {
    /**
     * @param { HTMLInputElement } el 
     * @param { boolean } allowMultiple 
     */
    constructor(el, allowMultiple) {
        /**
         * @type { HTMLInputElement }
         */
        this.el = el;
        this.allowMultiple = allowMultiple

        if (this.el.files.length > 0) {
            this.filesUpdate();
        }
    }


    /**
     * Remove a file from the FileList
     */
    deleteFile(file) {
        this.el.files = removeFile(this.el.files, file);
        this.filesUpdate();
    }
    /**
     * Event triggered when new files are selected
     */
    newFiles(file) {
        if (this.allowMultiple) {
            this.el.files = mergeFileLists(this.el.files, [file]);
        }
        else {
            this.el.files = arrayToFileList([file]);
        }
        this.filesUpdate();
    }

    /**
     * Event triggered when files changes
     */
    filesUpdate() {
        this.el.dispatchEvent(new Event('change'));
    }
}


/**
 * @param { Element[] | HTMLElement[] } el 
 * @param { import('filepond').FilePondOptions } options 
 */
export const createInstance = (el, options) => {
    // @ts-ignore
    const files = new DropFilesData(el[1], options.allowMultiple || FilePond.getOptions().allowMultiple)

    const pond = FilePond.create(el[0], {
        onaddfile: (err, { file }) => {
            if (!err) files.newFiles(file)
        },
        onremovefile: (err, { file }) => {
            if (!err) files.deleteFile(file)
        },
        ...options
    })

    return pond
}


export default FilePond