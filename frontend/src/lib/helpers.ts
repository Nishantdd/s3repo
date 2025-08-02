export const parseSizeInBytes = (sizeStr: string): number => {
    const parts = sizeStr.split(' ');
    if (parts.length !== 2) return 0;

    const value = parseFloat(parts[0]);
    const unit = parts[1].toUpperCase();

    switch (unit) {
        case 'GB':
            return value * 1024 * 1024 * 1024;
        case 'MB':
            return value * 1024 * 1024;
        case 'KB':
            return value * 1024;
        case 'B':
            return value;
        default:
            return 0;
    }
};

export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function formatDate(isoString: string, locale: string | undefined = undefined): string {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Intl.DateTimeFormat(locale, options).format(date);
}

export function getFileType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext) return 'Unknown file type';
    else return ext.toUpperCase();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fileTypeMap: { [key: string]: string } = {
    // Image formats
    jpg: 'JPG/JPEG - Compressed Image Format',
    jpeg: 'JPG/JPEG - Compressed Image Format',
    png: 'PNG - Uncompressed Image Format',
    gif: 'GIF - Graphics Interchange Format',
    bmp: 'BMP - Bitmap Image File',
    svg: 'SVG - Scalable Vector Graphics',
    webp: 'WEBP - WebP Image Format',
    tiff: 'TIFF - Tagged Image File Format',
    ico: 'ICO - Icon File Format',

    // Document formats
    pdf: 'PDF - Portable Document Format',
    doc: 'DOC - Microsoft Word Document (Legacy)',
    docx: 'DOCX - Microsoft Word Open XML Document',
    xls: 'XLS - Microsoft Excel Spreadsheet (Legacy)',
    xlsx: 'XLSX - Microsoft Excel Open XML Spreadsheet',
    ppt: 'PPT - Microsoft PowerPoint Presentation (Legacy)',
    pptx: 'PPTX - Microsoft PowerPoint Open XML Presentation',
    txt: 'TXT - Plain Text File',
    rtf: 'RTF - Rich Text Format',
    md: 'MD - Markdown File',

    // Web formats
    html: 'HTML - HyperText Markup Language',
    htm: 'HTM - HyperText Markup Language',
    css: 'CSS - Cascading Style Sheets',
    js: 'JS - JavaScript File',
    json: 'JSON - JavaScript Object Notation',
    xml: 'XML - eXtensible Markup Language',

    // Audio formats
    mp3: 'MP3 - MPEG-1 Audio Layer 3',
    wav: 'WAV - Waveform Audio File Format',
    ogg: 'OGG - Ogg Vorbis Audio File',
    m4a: 'M4A - MPEG-4 Audio File',
    flac: 'FLAC - Free Lossless Audio Codec',

    // Video formats
    mp4: 'MP4 - MPEG-4 Video File',
    avi: 'AVI - Audio Video Interleave',
    mov: 'MOV - Apple QuickTime Movie',
    wmv: 'WMV - Windows Media Video',
    flv: 'FLV - Flash Video',
    mkv: 'MKV - Matroska Video File',

    // Compressed formats
    zip: 'ZIP - Zipped File Archive',
    rar: 'RAR - Roshal Archive Compressed File',
    '7z': '7Z - 7-Zip Compressed File',
    tar: 'TAR - Tape Archive File',
    gz: 'GZ - Gnu Zip Compressed Archive',

    // Executable formats
    exe: 'EXE - Windows Executable Program',
    dmg: 'DMG - Apple Disk Image',
    apk: 'APK - Android Package Kit',

    // Font formats
    ttf: 'TTF - TrueType Font File',
    otf: 'OTF - OpenType Font File',
    woff: 'WOFF - Web Open Font Format',

    // Code formats
    c: 'C - C Source Code File',
    cpp: 'CPP - C++ Source Code File',
    java: 'JAVA - Java Source Code File',
    py: 'PY - Python Script',
    ts: 'TS - TypeScript File',
    tsx: 'TSX - TypeScript React File',
    jsx: 'JSX - JavaScript React File'
};
